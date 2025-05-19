import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import healthRoutes from './routes/health.js';
import mypageRoutes from './routes/mypage.js';
import hospitalRoutes from './routes/hospital.js';
import supplementsRoutes from './routes/supplements.js'; // ✅ 추가

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ API 라우터 등록
app.use('/api/auth', authRoutes);
app.use('/api/health', healthRoutes);
app.use('/api/mypage', mypageRoutes);
app.use('/api/hospital', hospitalRoutes);
app.use('/api/supplements', supplementsRoutes); // ✅ 추가

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

