import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/auth';
import { ThemeProvider } from './contexts/theme';

// Public pages
import Header from './components/layout/Header';
import Home from './pages/Home';
import About from './pages/About';
import Pricing from './pages/Pricing';
import Login from './pages/Login';
import Signup from './pages/Signup';

// Dashboard pages
import DashboardLayout from './components/layout/DashboardLayout';
import Dashboard from './pages/dashboard/Dashboard';
import Preferences from './pages/dashboard/Preferences';
import Billing from './pages/dashboard/Billing';
import History from './pages/dashboard/History';
import Settings from './pages/dashboard/Settings';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<><Header /><Home /></>} />
            <Route path="/about" element={<><Header /><About /></>} />
            <Route path="/pricing" element={<><Header /><Pricing /></>} />
            <Route path="/login" element={<><Header /><Login /></>} />
            <Route path="/signup" element={<><Header /><Signup /></>} />

            {/* Protected dashboard routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="preferences" element={<Preferences />} />
              <Route path="billing" element={<Billing />} />
              <Route path="history" element={<History />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;