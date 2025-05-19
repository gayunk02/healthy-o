import express from 'express';
import authMiddleware from '../middleware/auth.js';
import {
  getSafeHealthInfo,
  getDiagnosisHistory,
  getDiagnosisDetail,
} from '../controllers/healthController.js';

const router = express.Router();

// ✅ 비회원도 가능 → 인증 미들웨어 제거
router.post('/safe-health-info', getSafeHealthInfo);

// 🔐 로그인한 사용자만 진단 이력 조회 가능
router.get('/history', authMiddleware, getDiagnosisHistory);

// 🔐 진단 상세 조회 (id 기반)
router.get('/history/:id', authMiddleware, getDiagnosisDetail);

export default router;
