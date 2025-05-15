//routes/healths.js

import express from 'express';
import authMiddleware from '../middleware/auth.js';
import {
  getSafeHealthInfo,
  getDiagnosisHistory,
  getDiagnosisDetail,
} from '../controllers/healthController.js';

const router = express.Router();

// GPT 진단 요청 및 DB 저장
router.post('/safe-health-info', authMiddleware, getSafeHealthInfo);

// 진단 기록 전체 조회
router.get('/history', authMiddleware, getDiagnosisHistory);

// 진단 기록 상세 조회
router.get('/history/:id', authMiddleware, getDiagnosisDetail);

export default router;