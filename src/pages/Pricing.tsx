import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Shield, CreditCard, Calendar, Check, CheckCircle2 } from 'lucide-react';
import Button from '../components/ui/Button';
import { useAuth } from '@/contexts/auth';

type PlanFrequency = 'daily' | 'weekday' | 'weekly';

interface Plan {
  id: PlanFrequency;
  name: string;
  price: number;
  description: string;
  features: string[];
  affirmations: string;
}

export default function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState<PlanFrequency>('daily');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const isPostSignup = location.state?.fromSignup;

  useEffect(() => {
    if (isPostSignup) {
      setShowSuccessMessage(true);
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isPostSignup]);

  const plans: Plan[] = [
    {
      id: 'daily',
      name: 'Daily Inspiration',
      price: 5.50,
      description: 'Perfect for those seeking daily guidance and motivation',
      affirmations: '7 affirmations per week',
      features: [
        'One affirmation every day',
        'Weekend affirmations included',
        'Priority support',
        'Access to all categories',
        'Personalized dashboard'
      ]
    },
    {
      id: 'weekday',
      name: 'Business Days',
      price: 4.00,
      description: 'Ideal for maintaining work-week motivation',
      affirmations: '5 affirmations per week',
      features: [
        'One affirmation each weekday',
        'Business-focused categories',
        'Standard support',
        'Access to all categories',
        'Weekly progress report'
      ]
    },
    {
      id: 'weekly',
      name: 'Weekly Focus',
      price: 1.50,
      description: 'Great for weekly reflection and goal-setting',
      affirmations: '1 affirmation per week',
      features: [
        'One powerful affirmation weekly',
        'Extended affirmation content',
        'Basic support',
        'Access to core categories',
        'Monthly reflection guide'
      ]
    }
  ];

  const handleGetStarted = () => {
    if (isPostSignup) {
      // After signup, go directly to preferences
      navigate('/dashboard/preferences', { 
        state: { selectedPlan } 
      });
    } else {
      // Normal flow - go to signup with plan info
      navigate('/signup', { 
        state: { selectedPlan }
      });
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {showSuccessMessage && (
          <div className="mb-8 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 transition-all duration-500">
            <div className="flex items-center">
              <CheckCircle2 className="h-5 w-5 text-green-500 dark:text-green-400 mr-3" />
              <div>
                <h3 className="text-sm font-medium text-green-800 dark:text-green-200">
                  Account Created Successfully!
                </h3>
                <p className="mt-1 text-sm text-green-700 dark:text-green-300">
                  Welcome to Affirmation Central! Please choose your transformation path to continue.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-gray-900 dark:text-white">
            Choose Your 
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {' '}Transformation Path
            </span>
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Select the perfect plan for your journey of personal growth and daily inspiration.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl ${
                selectedPlan === plan.id
                  ? 'border-2 border-purple-600 dark:border-purple-400 shadow-lg'
                  : 'border border-gray-200 dark:border-gray-700'
              } bg-white dark:bg-gray-800 p-8 transition-all duration-200 hover:shadow-md`}
            >
              {selectedPlan === plan.id && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Selected Plan
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">${plan.price}</span>
                  <span className="text-gray-600 dark:text-gray-400 ml-2">/month</span>
                </div>
                <p className="text-purple-600 dark:text-purple-400 font-medium mt-2">{plan.affirmations}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => {
                  setSelectedPlan(plan.id);
                  handleGetStarted();
                }}
                variant={selectedPlan === plan.id ? 'primary' : 'outline'}
                className="w-full"
              >
                {selectedPlan === plan.id ? 'Get Started' : 'Select Plan'}
              </Button>
            </div>
          ))}
        </div>

        {/* Security Features */}
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <Shield className="w-10 h-10 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Secure Payments</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                PCI-compliant payment processing with bank-level encryption
              </p>
            </div>
            <div className="p-6">
              <CreditCard className="w-10 h-10 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Multiple Payment Options</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Support for all major credit cards and payment platforms
              </p>
            </div>
            <div className="p-6">
              <Calendar className="w-10 h-10 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Easy Billing</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Automated monthly billing with detailed invoices
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            30-day money-back guarantee • Cancel anytime • No hidden fees
          </p>
        </div>
      </div>
    </div>
  );
}