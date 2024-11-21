import { useState } from 'react';
import { useAuth } from '@/contexts/auth';
import { useLocation } from 'react-router-dom';
import { Check, Plus, X } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

interface Subcategory {
  id: number;
  name: string;
  description: string;
}

interface Category {
  id: number;
  name: string;
  subcategories: Subcategory[];
}

interface CustomCategory {
  id: number;
  name: string;
  description?: string;
}

interface CategoryGroupProps {
  category: Category;
  selectedCategories: number[];
  onToggle: (id: number) => void;
}

const CATEGORIES: Category[] = [
  {
    id: 1,
    name: 'Emotional Well-being',
    subcategories: [
      {
        id: 101,
        name: 'Self-Love & Acceptance',
        description: 'Affirmations focused on embracing and accepting yourself'
      },
      {
        id: 102,
        name: 'Confidence & Self-Esteem',
        description: 'Build unwavering confidence and strong self-worth'
      },
      {
        id: 103,
        name: 'Gratitude & Appreciation',
        description: 'Cultivate a mindset of thankfulness and appreciation'
      },
      {
        id: 104,
        name: 'Stress Relief & Relaxation',
        description: 'Find peace and calmness in daily life'
      },
      {
        id: 105,
        name: 'Resilience & Inner Strength',
        description: 'Develop mental toughness and emotional resilience'
      }
    ]
  },
  {
    id: 2,
    name: 'Mental Health',
    subcategories: [
      {
        id: 201,
        name: 'Anxiety Relief',
        description: 'Manage and reduce anxiety through positive affirmations'
      },
      {
        id: 202,
        name: 'Overcoming Depression',
        description: 'Support emotional healing and mental well-being'
      },
      {
        id: 203,
        name: 'Mindfulness & Presence',
        description: 'Stay grounded and present in the moment'
      },
      {
        id: 204,
        name: 'Positive Thinking',
        description: 'Cultivate an optimistic mindset'
      },
      {
        id: 205,
        name: 'Emotional Healing',
        description: 'Process and heal emotional wounds'
      }
    ]
  },
  {
    id: 3,
    name: 'Physical Health',
    subcategories: [
      {
        id: 301,
        name: 'General Wellness',
        description: 'Support overall health and vitality'
      },
      {
        id: 302,
        name: 'Fitness & Exercise',
        description: 'Stay motivated in your fitness journey'
      },
      {
        id: 303,
        name: 'Healthy Eating',
        description: 'Maintain positive relationships with food'
      },
      {
        id: 304,
        name: 'Healing & Recovery',
        description: 'Support your body\'s natural healing processes'
      },
      {
        id: 305,
        name: 'Sleep & Rest',
        description: 'Improve sleep quality and restful recovery'
      }
    ]
  },
  {
    id: 4,
    name: 'Relationships',
    subcategories: [
      {
        id: 401,
        name: 'Romantic Relationships',
        description: 'Nurture loving and healthy romantic connections'
      },
      {
        id: 402,
        name: 'Family Bonds',
        description: 'Strengthen family relationships'
      },
      {
        id: 403,
        name: 'Friendships',
        description: 'Cultivate meaningful friendships'
      },
      {
        id: 404,
        name: 'Communication',
        description: 'Improve interpersonal communication'
      },
      {
        id: 405,
        name: 'Social Connections',
        description: 'Build and maintain social relationships'
      }
    ]
  },
  {
    id: 5,
    name: 'Career & Success',
    subcategories: [
      {
        id: 501,
        name: 'Professional Growth',
        description: 'Advance your career and professional development'
      },
      {
        id: 502,
        name: 'Leadership',
        description: 'Develop strong leadership qualities'
      },
      {
        id: 503,
        name: 'Productivity & Focus',
        description: 'Enhance work efficiency and concentration'
      },
      {
        id: 504,
        name: 'Financial Abundance',
        description: 'Attract prosperity and financial well-being'
      },
      {
        id: 505,
        name: 'Work-Life Balance',
        description: 'Maintain harmony between work and personal life'
      }
    ]
  },
  {
    id: 6,
    name: 'Personal Growth',
    subcategories: [
      {
        id: 601,
        name: 'Goal Achievement',
        description: 'Stay focused on your personal goals'
      },
      {
        id: 602,
        name: 'Learning & Development',
        description: 'Embrace continuous learning and growth'
      },
      {
        id: 603,
        name: 'Creativity',
        description: 'Nurture your creative expression'
      },
      {
        id: 604,
        name: 'Purpose & Direction',
        description: 'Connect with your life purpose'
      },
      {
        id: 605,
        name: 'Personal Power',
        description: 'Embrace your inner strength and capabilities'
      }
    ]
  },
  {
    id: 7,
    name: 'Spirituality & Inner Peace',
    subcategories: [
      {
        id: 701,
        name: 'Inner Peace',
        description: 'Cultivate tranquility and inner harmony'
      },
      {
        id: 702,
        name: 'Spiritual Growth',
        description: 'Deepen your spiritual connection'
      },
      {
        id: 703,
        name: 'Meditation',
        description: 'Enhance your meditation practice'
      },
      {
        id: 704,
        name: 'Universal Connection',
        description: 'Feel connected to the greater whole'
      },
      {
        id: 705,
        name: 'Divine Guidance',
        description: 'Trust in divine timing and guidance'
      }
    ]
  }
];

function CategoryGroup({ category, selectedCategories, onToggle }: CategoryGroupProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{category.name}</h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {category.subcategories.map((subcategory) => (
          <div
            key={subcategory.id}
            className={`relative p-4 rounded-lg border cursor-pointer transition-colors ${
              selectedCategories.includes(subcategory.id)
                ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-700'
                : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            onClick={() => onToggle(subcategory.id)}
          >
            <div className="flex items-start space-x-3">
              <div
                className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 ${
                  selectedCategories.includes(subcategory.id)
                    ? 'border-purple-500 bg-purple-500'
                    : 'border-gray-300 dark:border-gray-600'
                }`}
              >
                {selectedCategories.includes(subcategory.id) && (
                  <Check className="w-4 h-4 text-white" />
                )}
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">{subcategory.name}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{subcategory.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Preferences() {
  const { user } = useAuth();
  const location = useLocation();
  const selectedPlan = location.state?.selectedPlan;
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [customCategories, setCustomCategories] = useState<CustomCategory[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleToggleCategory = (id: number) => {
    setSelectedCategories(prev => 
      prev.includes(id) 
        ? prev.filter(catId => catId !== id)
        : [...prev, id]
    );
  };

  const handleAddCustomCategory = () => {
    if (!newCategory.trim()) {
      setError('Category name is required');
      return;
    }

    const newCustomCategory: CustomCategory = {
      id: Date.now(),
      name: newCategory.trim(),
      description: newDescription.trim() || undefined
    };

    setCustomCategories(prev => [...prev, newCustomCategory]);
    setNewCategory('');
    setNewDescription('');
    setError(null);
  };

  const handleRemoveCustomCategory = (id: number) => {
    setCustomCategories(prev => prev.filter(cat => cat.id !== id));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      // TODO: Implement save functionality
      setSuccessMessage('Preferences saved successfully');
    } catch (err) {
      setError('Failed to save preferences');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Choose Your Affirmation Categories
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Select the areas you'd like to focus on. We'll use these preferences to send you
          personalized affirmations that resonate with your journey.
        </p>
      </div>

      {successMessage && (
        <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
          <p className="text-sm text-green-600 dark:text-green-400">{successMessage}</p>
        </div>
      )}

      {/* Main Categories */}
      <div className="mb-12 grid grid-cols-1 gap-8">
        {CATEGORIES.map((category) => (
          <CategoryGroup
            key={category.id}
            category={category}
            selectedCategories={selectedCategories}
            onToggle={handleToggleCategory}
          />
        ))}
      </div>

      {/* Custom Categories Section */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-8 rounded-xl border border-purple-100 dark:border-purple-800">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Create Your Own Categories</h2>
          
          {/* Custom Categories List */}
          {customCategories.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Your Custom Categories</h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {customCategories.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg border border-purple-200 dark:border-purple-700 shadow-sm"
                  >
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{category.name}</p>
                      {category.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{category.description}</p>
                      )}
                    </div>
                    <button
                      onClick={() => handleRemoveCustomCategory(category.id)}
                      className="p-1 hover:bg-purple-100 dark:hover:bg-purple-900/20 rounded-full"
                    >
                      <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add Custom Category Form */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-purple-200 dark:border-purple-700">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Add New Category</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Category Name
                </label>
                <Input
                  id="categoryName"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Enter a custom category name"
                  className="max-w-md"
                />
              </div>
              <div>
                <label htmlFor="categoryDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description (Optional)
                </label>
                <Input
                  id="categoryDescription"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Enter a brief description"
                  className="max-w-md"
                />
              </div>
              {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
              <Button
                onClick={handleAddCustomCategory}
                variant="outline"
                className="flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Category
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="min-w-[120px]"
        >
          {isSaving ? 'Saving...' : 'Save Preferences'}
        </Button>
      </div>
    </div>
  );
}