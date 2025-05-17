// controllers/hospitalController.js
import axios from 'axios';
import prisma from '../prisma/client.js';
import { success, error } from '../utils/response.js';

export const searchHospital = async (req, res) => {
  const { lat, lng } = req.body;
  const userId = req.userId;

  try {
    // 🔍 진단 기록 최신 1건 조회
    const latestDiagnosis = await prisma.diagnosisRecord.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });

    if (!latestDiagnosis || !latestDiagnosis.departments) {
      return error(res, 400, '진단 기록 또는 진료과 정보가 없습니다.');
    }

    const query = latestDiagnosis.departments.split(',')[0].trim(); // ex: "내과"

    const kakaoRes = await axios.get('https://dapi.kakao.com/v2/local/search/keyword.json', {
      headers: {
        Authorization: `KakaoAK ${process.env.KAKAO_REST_API_KEY}`
      },
      params: {
        query,
        x: lng,
        y: lat,
        radius: 5000,
        size: 15
      }
    });

    const hospitals = kakaoRes.data.documents.map(place => ({
      name: place.place_name,
      address: place.road_address_name || place.address_name,
      phone: place.phone || '',
      latitude: Number(place.y),
      longitude: Number(place.x)
    }));

    await prisma.hospitalRecommendation.create({
      data: {
        userId,
        basedOnDiagnosisId: latestDiagnosis.id,
        location: `${lat},${lng}`,
        recommendedHospitals: JSON.stringify(hospitals)
      }
    });

    return success(res, '병원 추천 성공', { hospitals });
  } catch (err) {
    console.error('병원 추천 실패:', err.response?.data || err.message);
    return error(res, 500, '병원 추천 실패');
  }
};