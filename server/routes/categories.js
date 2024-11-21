import express from 'express';
import { dbHelpers } from '../db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all categories
router.get('/', async (req, res, next) => {
  try {
    const categories = await dbHelpers.getCategories();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

// Get user preferences
router.get('/user/preferences', authenticateToken, async (req, res, next) => {
  try {
    const preferences = await dbHelpers.getUserPreferences(req.user.userId);
    res.json(preferences);
  } catch (error) {
    next(error);
  }
});

// Update user preferences
router.put('/user/preferences', authenticateToken, async (req, res, next) => {
  try {
    const { categoryIds } = req.body;
    
    if (!Array.isArray(categoryIds)) {
      return res.status(400).json({
        message: 'categoryIds must be an array'
      });
    }

    await dbHelpers.updateUserPreferences(req.user.userId, categoryIds);
    res.json({ message: 'Preferences updated successfully' });
  } catch (error) {
    next(error);
  }
});

export default router;