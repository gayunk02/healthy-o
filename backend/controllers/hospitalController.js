import axios from 'axios';
import prisma from '../prisma/client.js';
import { success, error } from '../utils/response.js';

export const searchHospital = async (req, res) => {
  const { lat, lng } = req.body;
  const userId = req.userId;

  console.log('[DEBUG] 병원 검색 요청 시작');
  console.log('[DEBUG] 사용자 위치:', { lat, lng });
  console.log('[DEBUG] KAKAO API KEY:', process.env.KAKAO_REST_API_KEY);

  try {
    const latestDiagnosis = await prisma.diagnosisRecord.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    if (!latestDiagnosis) return error(res, 404, '진단 기록이 없습니다.');

    const departments = latestDiagnosis.departments
      ?.split(',')
      .map((dep) => dep.trim())
      .filter(Boolean);

    if (!departments || departments.length === 0)
      return error(res, 400, '추천 진료과가 없습니다.');

    const query = departments[0];
    console.log('[DEBUG] 추천 진료과(query):', query);

    // ✅ 카카오 장소 검색 API 호출
    const kakaoRes = await axios.get('https://dapi.kakao.com/v2/local/search/keyword.json', {
      params: {
        query,
        x: lng,
        y: lat,
        radius: 5000,
        sort: 'distance',
      },
      headers: {
        Authorization: `KakaoAK ${process.env.KAKAO_REST_API_KEY}`,
      },
    });

    const hospitals = kakaoRes.data.documents.map((doc) => ({
      name: doc.place_name,
      address: doc.road_address_name || doc.address_name,
      phone: doc.phone || '',
      latitude: Number(doc.y),
      longitude: Number(doc.x),
    }));

    // 저장 (선택)
    await prisma.hospitalRecommendation.create({
      data: {
        userId,
        basedOnDiagnosisId: latestDiagnosis.id,
        location: `${lat},${lng}`,
        recommendedHospitals: JSON.stringify(hospitals),
      },
    });

    return success(res, '병원 검색 성공 (위치 기반)', {
      hospitals, // 프론트에 JSON 형태로 병원 리스트 전달
    });
  } catch (err) {
    console.error('카카오 장소 검색 오류:', err.response?.data || err.message);
    return error(res, 500, '병원 검색 실패');
  }
};
