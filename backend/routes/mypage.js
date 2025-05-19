// routes/mypage.js
import express from 'express';
import auth from '../middleware/auth.js';
import { getMe, updateMe, verifyToken } from '../controllers/mypageController.js';

const router = express.Router();

router.get('/me', auth, getMe);              // 내 정보 조회
router.patch('/me', auth, updateMe);  
router.get('/verify-token', auth, verifyToken); // 토큰 유효성 확인

export default router;
