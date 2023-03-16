import express from 'express';
import { getFeedDays, getUserDay, likePost } from '../controllers/day.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// READ
router.get('/', verifyToken, getFeedDays);
router.get('/:userId/day', verifyToken, getUserDay);

// UPDATE
router.patch('/:id/like', verifyToken, likePost);

export default router;