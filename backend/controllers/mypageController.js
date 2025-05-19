// controllers/mypageController.js
import bcrypt from 'bcrypt';
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

export const updateMe = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, gender, birthDate, height, weight, currentPassword, newPassword } = req.body;

    // 업데이트할 일반 정보 구성
    const updateData = {
      ...(name && { name }),
      ...(gender && { gender }),
      ...(birthDate && { birthDate: new Date(birthDate) }),
      ...(height && { height }),
      ...(weight && { weight }),
    };

    // 비밀번호 변경 요청이 있는 경우
    if (currentPassword && newPassword) {
      const user = await prisma.user.findUnique({ where: { id: userId } });
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return error(res, 401, '현재 비밀번호가 일치하지 않습니다.');
      }

      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      updateData.password = hashedNewPassword;
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
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

    return success(res, '내 정보 수정 성공', updatedUser);
  } catch (err) {
    console.error('프로필 수정 오류:', err);
    return error(res, 500, '내 정보 수정 실패');
  }
};
