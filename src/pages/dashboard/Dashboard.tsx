import { format } from 'date-fns';
import { Calendar, Target, TrendingUp } from 'lucide-react';
import { useAuth } from '@/contexts/auth';

export default function Dashboard() {
  const { user } = useAuth();
  const today = new Date();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Welcome back, {user?.firstName}! 👋
        </h1>
        <p className="text-gray-600 mt-2">
          Here's your affirmation journey overview
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Next Affirmation</p>
              <p className="text-lg font-semibold">{format(today, 'MMMM d, yyyy')}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Target className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Current Plan</p>
              <p className="text-lg font-semibold">Daily Inspiration</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-purple-50 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Streak</p>
              <p className="text-lg font-semibold">7 days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Affirmation */}
      <div className="bg-white p-8 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Today's Affirmation</h2>
        <blockquote className="text-lg text-gray-700 italic">
          "I am capable of achieving greatness, and I embrace each day with confidence and determination."
        </blockquote>
        <p className="mt-4 text-sm text-gray-600">
          Category: Personal Growth • {format(today, 'MMMM d, yyyy')}
        </p>
      </div>

      {/* Recent History */}
      <div className="bg-white p-8 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Recent Affirmations</h2>
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
              <p className="text-gray-700">
                "Every challenge I face is an opportunity for growth and learning."
              </p>
              <p className="mt-2 text-sm text-gray-600">
                Category: Success • {format(new Date(today.setDate(today.getDate() - i - 1)), 'MMMM d, yyyy')}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}