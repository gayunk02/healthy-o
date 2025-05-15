// middleware/auth.js
import jwt from 'jsonwebtoken';
import { error } from '../utils/response.js'; // 공통 응답 불러오기

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return error(res, 401, '인증 토큰이 없습니다.');
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return error(res, 401, '유효하지 않은 토큰입니다.');
  }
};

export default authMiddleware;
