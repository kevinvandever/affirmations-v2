import { fileURLToPath } from 'url';

const categories = [
  {
    name: 'Emotional Well-being',
    subcategories: [
      'Self-Love & Acceptance',
      'Confidence & Self-Esteem',
      'Gratitude & Appreciation',
      'Stress Relief & Relaxation',
      'Resilience & Inner Strength'
    ]
  },
  {
    name: 'Mental Health',
    subcategories: [
      'Anxiety Relief',
      'Overcoming Depression',
      'Mindfulness & Presence',
      'Positive Thinking',
      'Emotional Healing'
    ]
  },
  {
    name: 'Physical Health',
    subcategories: [
      'General Wellness',
      'Fitness & Exercise Motivation',
      'Healthy Eating Habits',
      'Healing & Recovery',
      'Sleep Improvement'
    ]
  },
  {
    name: 'Relationships',
    subcategories: [
      'Romantic Relationships',
      'Family Connections',
      'Friendships & Social Circles',
      'Effective Communication',
      'Attracting Love'
    ]
  },
  {
    name: 'Career & Success',
    subcategories: [
      'Career Advancement',
      'Productivity & Focus',
      'Goal Setting & Achievement',
      'Leadership Skills',
      'Financial Abundance'
    ]
  }
];

async function seedCategories(db) {
  try {
    console.log('Starting category seeding...');
    
    await db.run('BEGIN TRANSACTION');

    for (const category of categories) {
      // Insert main category
      const mainResult = await db.run(
        `INSERT INTO categories (name, description)
         VALUES (?, ?)`,
        [category.name, `Affirmations for ${category.name.toLowerCase()}`]
      );
      
      const mainCategoryId = mainResult.lastID;
      
      // Insert subcategories
      for (const subName of category.subcategories) {
        await db.run(
          `INSERT INTO categories (name, description, parent_id)
           VALUES (?, ?, ?)`,
          [
            subName,
            `Affirmations for ${subName.toLowerCase()}`,
            mainCategoryId
          ]
        );
      }
    }

    await db.run('COMMIT');
    console.log('Category seeding completed successfully');
  } catch (error) {
    await db.run('ROLLBACK');
    console.error('Error seeding categories:', error);
    throw error;
  }
}

// Run seeder if this file is executed directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  seedCategories()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
}

export { seedCategories };