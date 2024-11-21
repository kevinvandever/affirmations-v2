import { Bell, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';
import Button from '../ui/Button';

export default function DashboardHeader() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="text-xl font-semibold text-gray-900">
              Dashboard
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-gray-700">
              <Bell className="h-5 w-5" />
            </button>
            <Link to="/dashboard/settings" className="text-gray-500 hover:text-gray-700">
              <Settings className="h-5 w-5" />
            </Link>
            <div className="border-l border-gray-200 h-6 mx-4" />
            <div className="flex items-center space-x-3">
              <div className="text-sm">
                <p className="font-medium text-gray-700">{user?.firstName} {user?.lastName}</p>
                <p className="text-gray-500">{user?.email}</p>
              </div>
              <Button variant="outline" size="sm" onClick={logout}>
                Sign out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}