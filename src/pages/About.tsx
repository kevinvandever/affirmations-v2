import { Heart, Lightbulb, RefreshCw, Sliders, Users, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

export default function About() {
  return (
    <div className="min-h-screen pt-24 pb-12">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
            Your Journey to
            <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Daily Transformation
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every morning brings a new opportunity to reshape your mindset and embrace your potential.
          </p>
        </div>

        {/* Story Section */}
        <div className="prose prose-lg mx-auto mb-20">
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=2000&q=80"
              alt="Peaceful sunrise meditation"
              className="w-full h-80 object-cover rounded-lg mb-8"
            />
            <h2 className="text-3xl font-bold mb-6">The Power of Daily Affirmations</h2>
            <p className="mb-6">
              In today's fast-paced world, it's easy to lose sight of our inner strength and potential. 
              We created Affirmation Central because we believe that small, daily acts of positive 
              self-reinforcement can create profound changes in our lives.
            </p>
            <p className="mb-6">
              Think of affirmations as seeds of transformation. When planted consistently and nurtured 
              with intention, they grow into powerful beliefs that shape our reality. Whether you're 
              facing a challenging project at work, pursuing personal growth, or seeking inner peace, 
              the right affirmation at the right moment can be the compass that guides you forward.
            </p>
            <p className="mb-6">
              But we also understand that everyone's journey is unique. What inspires you on Monday 
              morning might be different from what you need on a quiet Sunday evening. That's why 
              we've created a platform that adapts to your rhythm of life.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
              <Sliders className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Personalized Journey</h3>
            <p className="text-gray-600">
              Choose categories that resonate with your goals and adjust them as your needs evolve.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
              <RefreshCw className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Flexible Frequency</h3>
            <p className="text-gray-600">
              Set your own pace with daily, weekday, or weekly affirmations that fit your schedule.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
              <Zap className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Dynamic Adaptation</h3>
            <p className="text-gray-600">
              Modify your affirmations daily to align with your current challenges and aspirations.
            </p>
          </div>
        </div>

        {/* Impact Stories */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Real Stories, Real Impact</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop"
                alt="Sarah's profile"
                className="w-16 h-16 rounded-full mb-4"
              />
              <p className="text-gray-600 mb-4">
                "Starting each day with a personalized affirmation has completely changed my approach to 
                challenges. I feel more confident and focused than ever before."
              </p>
              <p className="font-semibold">Sarah M. - Entrepreneur</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"
                alt="David's profile"
                className="w-16 h-16 rounded-full mb-4"
              />
              <p className="text-gray-600 mb-4">
                "The ability to adjust my affirmations based on what I'm facing has been invaluable. 
                It's like having a personal coach in my pocket."
              </p>
              <p className="font-semibold">David R. - Creative Director</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Begin Your Journey Today</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of others who have discovered the transformative power of 
            personalized daily affirmations.
          </p>
          <Link to="/pricing">
            <Button size="lg" className="px-12">
              Explore Our Plans
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}