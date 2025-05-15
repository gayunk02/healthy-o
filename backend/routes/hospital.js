// routes/hospital.js
import express from 'express';
import { searchHospital } from '../controllers/hospitalController.js';
import authMiddleware from '../middleware/auth.js';
const router = express.Router();

// 병원 검색 (최신 진단 기반)
router.post('/search', authMiddleware, searchHospital);

export default router;
