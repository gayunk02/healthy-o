import { NextResponse } from 'next/server';
import { db } from '@/db';
import { hospitalRecommendations, diagnosisResults, diagnoses, users } from '@/db/schema';
import { jwtVerify } from 'jose';
import axios from 'axios';
import { desc, eq, sql } from 'drizzle-orm';

// 카카오맵 API 설정
const KAKAO_API_KEY = process.env.KAKAO_REST_API_KEY;
const KAKAO_SEARCH_URL = 'https://dapi.kakao.com/v2/local/search/keyword.json';

interface KakaoHospital {
  place_name: string;
  place_id: string;
  place_url: string;
  address_name: string;
  phone: string;
  category_name: string;
  x: string;  // longitude
  y: string;  // latitude
  distance: string;
}

export async function POST(request: Request) {
  try {
    console.log('[Hospital Search API] Starting API call');
    
    // 인증 확인
    const authHeader = request.headers.get('authorization');
    console.log('[Hospital Search API] Auth header present:', !!authHeader);
    
    if (!authHeader?.startsWith('Bearer ')) {
      console.log('[Hospital Search API] Missing or invalid auth header');
      return NextResponse.json(
        { message: '로그인이 필요한 서비스입니다.' },
        { status: 401 }
      );
    }

    // 토큰 검증
    const token = authHeader.split(' ')[1];
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    
    let userId: number;
    try {
      console.log('[Hospital Search API] Verifying JWT token');
      const { payload } = await jwtVerify(token, secret);
      console.log('[Hospital Search API] Token payload:', payload);
      
      if (!payload.id || typeof payload.id !== 'string') {
        console.error('[Hospital Search API] Invalid token payload:', payload);
        return NextResponse.json(
          { message: '유효하지 않은 인증 토큰입니다.' },
          { status: 401 }
        );
      }
      
      userId = Number(payload.id);
      console.log('[Hospital Search API] User ID from token:', userId);
      
      if (userId <= 0) {
        console.error('[Hospital Search API] Invalid user ID in token:', userId);
        return NextResponse.json(
          { message: '유효하지 않은 사용자 정보입니다.' },
          { status: 401 }
        );
      }
    } catch (error) {
      console.error('[Hospital Search API] Token verification failed:', error);
      return NextResponse.json(
        { message: '유효하지 않은 인증 토큰입니다.' },
        { status: 401 }
      );
    }

    // 요청 데이터 파싱
    let latitude: number, longitude: number;
    try {
      const body = await request.json();
      latitude = body.latitude;
      longitude = body.longitude;
      
      console.log('[Hospital Search API] Location data:', { latitude, longitude });

      if (!latitude || !longitude) {
        console.log('[Hospital Search API] Missing location data');
        return NextResponse.json(
          { message: '위치 정보가 필요합니다.' },
          { status: 400 }
        );
      }
    } catch (error) {
      console.error('[Hospital Search API] Request body parsing failed:', error);
      return NextResponse.json(
        { message: '잘못된 요청 형식입니다.' },
        { status: 400 }
      );
    }

    // 해당 사용자의 가장 최근 진단 결과 조회
    let latestDiagnosisResult;
    let diagnosisId: number;
    let recommendedDepartments: string[];
    let department: string;
    
    try {
      console.log('[Hospital Search API] Starting diagnosis lookup for userId:', userId);
      
      // 1. 먼저 사용자가 존재하는지 확인
      const userExists = await db
        .select({ id: users.id, email: users.email })
        .from(users)
        .where(eq(users.id, userId))
        .limit(1);
        
      console.log('[Hospital Search API] User exists check:', userExists);
      
      if (userExists.length === 0) {
        console.log('[Hospital Search API] User not found in users table');
        return NextResponse.json(
          { message: '사용자 정보를 찾을 수 없습니다.' },
          { status: 404 }
        );
      }
      
      // 2. 해당 사용자의 진단 기록 확인
      const userDiagnoses = await db
        .select()
        .from(diagnoses)
        .where(eq(diagnoses.userId, userId))
        .orderBy(desc(diagnoses.submittedAt));
        
      console.log('[Hospital Search API] User diagnoses count:', userDiagnoses.length);
      console.log('[Hospital Search API] User diagnoses IDs:', userDiagnoses.map(d => ({ id: d.id, submittedAt: d.submittedAt })));
      
      if (userDiagnoses.length === 0) {
        console.log('[Hospital Search API] No diagnoses found for user');
        return NextResponse.json(
          { message: '진단 기록이 없습니다. 먼저 건강 설문을 진행해주세요.' },
          { status: 404 }
        );
      }
      
      // 3. 모든 diagnosis_results 확인
      const allDiagnosisResults = await db
        .select()
        .from(diagnosisResults);
        
      console.log('[Hospital Search API] All diagnosis_results count:', allDiagnosisResults.length);
      console.log('[Hospital Search API] All diagnosis_results:', allDiagnosisResults.map(dr => ({ 
        id: dr.id, 
        diagnosisId: dr.diagnosisId, 
        createdAt: dr.createdAt 
      })));
      
      // 4. JOIN 방식으로 사용자의 diagnosis_results 조회
      const userDiagnosisResults = await db
        .select({
          diagnosisResultId: diagnosisResults.id,
          diagnosisId: diagnosisResults.diagnosisId,
          diseases: diagnosisResults.diseases,
          createdAt: diagnosisResults.createdAt,
          submittedAt: diagnoses.submittedAt,
          recommendedDepartments: diagnosisResults.recommendedDepartments
        })
        .from(diagnosisResults)
        .innerJoin(diagnoses, eq(diagnosisResults.diagnosisId, diagnoses.id))
        .where(eq(diagnoses.userId, userId))
        .orderBy(desc(diagnosisResults.createdAt));

      console.log('[Hospital Search API] User diagnosis_results (JOIN) count:', userDiagnosisResults.length);
      console.log('[Hospital Search API] User diagnosis_results (JOIN):', userDiagnosisResults);

      if (userDiagnosisResults.length === 0) {
        console.log('[Hospital Search API] No diagnosis_results found for user via JOIN');
        return NextResponse.json(
          { message: '진단 결과가 없습니다. 먼저 건강 설문을 진행해주세요.' },
          { status: 404 }
        );
      }

      // 5. 가장 최근 결과 선택
      const latestResult = userDiagnosisResults[0];
      diagnosisId = latestResult.diagnosisId;

      // recommendedDepartments 필드에서 진료과 추출
      if (!latestResult.recommendedDepartments || !Array.isArray(latestResult.recommendedDepartments) || latestResult.recommendedDepartments.length === 0) {
        console.error('[Hospital Search API] Invalid recommendedDepartments:', latestResult.recommendedDepartments);
        return NextResponse.json(
          { message: '추천 진료과 정보가 없습니다.' },
          { status: 404 }
        );
      }

      department = latestResult.recommendedDepartments[0];
      console.log('[Hospital Search API] Found department:', department);

    } catch (error) {
      console.error('[Hospital Search API] Database query failed:', error);
      if (error instanceof Error) {
        return NextResponse.json(
          { message: '진단 결과를 조회하는데 실패했습니다: ' + error.message },
          { status: 500 }
        );
      }
      return NextResponse.json(
        { message: '진단 결과를 조회하는데 실패했습니다.' },
        { status: 500 }
      );
    }

    try {
      if (!KAKAO_API_KEY) {
        throw new Error('Kakao API 키가 설정되지 않았습니다.');
      }

      // 카카오맵 API 호출
      const searchResponse = await axios.get(KAKAO_SEARCH_URL, {
        params: {
          query: `${department} 병원`,
          x: longitude,
          y: latitude,
          radius: 5000, // 5km 반경
          sort: 'distance'
        },
        headers: {
          Authorization: `KakaoAK ${KAKAO_API_KEY}`
        }
      });

      const hospitals = searchResponse.data.documents as KakaoHospital[];
      
      // 검색 결과가 없는 경우
      if (!hospitals.length) {
        return NextResponse.json(
          { message: '주변에 적합한 병원이 없습니다.' },
          { status: 404 }
        );
      }

      // 상위 3개 병원만 선택하고 상세 정보 가져오기
      const topHospitals = hospitals.slice(0, 3);
      
      // 각 병원의 상세 정보 가져오기
      const detailedHospitals = await Promise.all(
        topHospitals.map(async (hospital) => {
          return {
            ...hospital,
            operating_hours: "09:00~18:00",
            phone: hospital.phone || "전화번호 정보 없음"
          };
        })
      );

      // 병원 추천 결과를 DB에 저장
      try {
        console.log('[Hospital Search API] Saving hospital recommendations to DB');
        
        // 기존에 같은 diagnosisId로 저장된 병원 추천이 있는지 확인
        const existingRecommendation = await db
          .select()
          .from(hospitalRecommendations)
          .where(eq(hospitalRecommendations.diagnosisId, diagnosisId))
          .limit(1);

        if (existingRecommendation.length === 0) {
          // 새로운 추천 저장
          await db.insert(hospitalRecommendations).values({
            userId,
            diagnosisId,
            hospitals: detailedHospitals.map(hospital => ({
              hospitalName: hospital.place_name,
              placeId: hospital.place_id,
              placeUrl: hospital.place_url,
              address: hospital.address_name,
              phone: hospital.phone || "전화번호 정보 없음",
              category: hospital.category_name,
              latitude: parseFloat(hospital.y),
              longitude: parseFloat(hospital.x),
              department,
              operatingHours: "09:00~18:00"
            }))
          });
          console.log('[Hospital Search API] New hospital recommendations saved');
        } else {
          console.log('[Hospital Search API] Hospital recommendations already exist for this diagnosis');
        }
      } catch (saveError) {
        console.error('[Hospital Search API] Failed to save recommendations:', saveError);
      }

      return NextResponse.json({
        success: true,
        message: '병원 검색 완료',
        data: detailedHospitals.map(hospital => ({
          hospitalName: hospital.place_name,
          placeId: hospital.place_id,
          address: hospital.address_name,
          phoneNumber: hospital.phone || "전화번호 정보 없음",
          distance: hospital.distance, // 미터 단위로 전달
          kakaoMapUrl: hospital.place_url,
          latitude: parseFloat(hospital.y),
          longitude: parseFloat(hospital.x),
          placeUrl: hospital.place_url,
          department,
          operatingHours: "09:00~18:00"
        }))
      });

    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('[Hospital Search API] Kakao API Error:', error.response?.data || error.message);
        return NextResponse.json(
          { message: '병원 검색 중 오류가 발생했습니다.' },
          { status: 500 }
        );
      }
      throw error;  // 예상치 못한 에러는 상위 에러 핸들러로 전달
    }
  } catch (error) {
    console.error('[Hospital Search API] Unexpected error:', error);
    return NextResponse.json(
      { message: '예기치 않은 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 