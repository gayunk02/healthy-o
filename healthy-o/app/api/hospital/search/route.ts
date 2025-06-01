import { NextResponse } from 'next/server';
import { db } from '@/db';
import { diagnosisRecords, hospitalRecommendations } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { verify } from 'jsonwebtoken';
import axios from 'axios';

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: '인증이 필요합니다.' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];
    const decoded = verify(token, process.env.JWT_SECRET || 'your-secret-key') as { userId: number };
    const userId = decoded.userId;

    const { lat, lng } = await request.json();

    // 진단 기록 최신 1건 조회
    const latestDiagnosis = await db.query.diagnosisRecords.findFirst({
      where: eq(diagnosisRecords.userId, userId),
      orderBy: desc(diagnosisRecords.createdAt),
    });

    if (!latestDiagnosis || !latestDiagnosis.departments) {
      return NextResponse.json(
        { message: '진단 기록 또는 진료과 정보가 없습니다.' },
        { status: 400 }
      );
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

    const hospitals = kakaoRes.data.documents.map((place: any) => ({
      name: place.place_name,
      address: place.road_address_name || place.address_name,
      phone: place.phone || '',
      latitude: Number(place.y),
      longitude: Number(place.x)
    }));

    await db.insert(hospitalRecommendations).values({
      userId,
      basedOnDiagnosisId: latestDiagnosis.id,
      location: `${lat},${lng}`,
      recommendedHospitals: JSON.stringify(hospitals)
    });

    return NextResponse.json({
      message: '병원 추천 성공',
      data: { hospitals }
    });
  } catch (err: any) {
    console.error('병원 추천 실패:', err.response?.data || err.message);
    return NextResponse.json(
      { message: '병원 추천 실패' },
      { status: 500 }
    );
  }
} 