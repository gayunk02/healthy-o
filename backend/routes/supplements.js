import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { getSupplementRecommendations } from '../controllers/supplementsController.js';

const router = express.Router();

// 🔐 로그인한 사용자만 가능
router.get('/recommend', authMiddleware, getSupplementRecommendations);

export default router;

