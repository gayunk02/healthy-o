// controllers/mypageController.js
import prisma from '../prisma/client.js';
import { success, error } from '../utils/response.js';

export const getMe = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: {
        id: true,
        email: true,
        name: true,
        gender: true,
        birthDate: true,
        height: true,
        weight: true,
        createdAt: true,
      },
    });

    if (!user) {
      return error(res, 404, '사용자를 찾을 수 없습니다.');
    }

    return success(res, '내 정보 조회 성공', user);
  } catch (err) {
    return error(res, 500, '서버 오류');
  }
};

export const verifyToken = async (req, res) => {
  try {
    return success(res, '토큰이 유효합니다.');
  } catch (err) {
    return error(res, 401, '토큰 확인 실패');
  }
};
