// controllers/authController.js
import prisma from '../prisma/client.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { success, error } from '../utils/response.js'; // ✅ 공통 응답 유틸 가져오기

export const signup = async (req, res) => {
  try {
    const { email, password, name, gender, birthDate } = req.body;

    // 1. 이메일 중복 확인
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return error(res, 400, '이미 가입된 이메일입니다.');
    }

    // 2. 비밀번호 해시화
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. 유저 생성 (키/몸무게 제거)
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        gender,
        birthDate: new Date(birthDate),
      },
    });

    return success(res, '회원가입 성공', { userId: newUser.id });
  } catch (err) {
    return error(res, 500, '서버 오류');
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. 유저 찾기
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return error(res, 404, '존재하지 않는 이메일입니다.');

    // 2. 비밀번호 확인
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return error(res, 401, '비밀번호가 일치하지 않습니다.');

    // 3. JWT 발급
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    // 4. 응답
    return success(res, '로그인 성공', {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (err) {
    return error(res, 500, '서버 오류');
  }
};
