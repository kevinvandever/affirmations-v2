import axios, { AxiosError } from 'axios';

const api = axios.create({
  baseURL: '/auth',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Custom error type
export class ApiError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = 'ApiError';
  }
}

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      throw new ApiError(
        error.response.data.message || 'An error occurred',
        error.response.status
      );
    }
    throw new ApiError('Network error. Please check your connection.');
  }
);

export const auth = {
  async login(email: string, password: string) {
    try {
      const { data } = await api.post('/login', { email, password });
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Login failed. Please try again.');
    }
  },

  async signup(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    dateOfBirth?: string;
  }) {
    try {
      const { data } = await api.post('/signup', userData);
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to create account. Please try again.');
    }
  },

  logout() {
    localStorage.removeItem('token');
  },

  async getUser() {
    try {
      const { data } = await api.get('/me');
      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to get user data');
    }
  }
};

export default api;