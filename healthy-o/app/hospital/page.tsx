'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Clock, Loader2, Crosshair, AlertTriangle, ChevronDown, Building2 } from "lucide-react";
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import { useEffect, useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { TabNavigation } from "@/components/layout/TabNavigation";
import { IHospitalUI } from "@/types/ui";
import { useAuth } from "@/hooks/useAuth";

export default function HospitalPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const { isLoggedIn } = useAuth();
  const mapRef = useRef<any>(null);
  const [map, setMap] = useState<any>(null);
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number } | null>(null);

  // 비로그인 사용자 체크
  useEffect(() => {
    if (!isLoggedIn) {
      toast({
        title: "로그인이 필요한 서비스입니다.",
        description: "로그인 페이지로 이동합니다.",
        variant: "destructive",
        duration: 3000,
      });
      router.push('/login');
      return;
    }
  }, [isLoggedIn, router, toast]);

  const selectedCategory = searchParams.get('category');  // 선택된 진료과목 카테고리
  const [selectedHospital, setSelectedHospital] = useState<IHospitalUI | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [mapLevel, setMapLevel] = useState<number>(5);
  const [isLoading, setIsLoading] = useState(true);
  const [hospitals, setHospitals] = useState<IHospitalUI[]>([]);
  const [recommendedDepartment, setRecommendedDepartment] = useState<string>('');

  // 캐시된 데이터 확인
  useEffect(() => {
    const cachedHospitals = localStorage.getItem('cached_hospitals');
    const cachedDepartment = localStorage.getItem('cached_department');
    const cacheTimestamp = localStorage.getItem('hospitals_cache_timestamp');
    const cachedDiagnosisId = localStorage.getItem('cached_diagnosis_id');
    
    // 현재 진단 ID 확인 (쿠키에서)
    const currentDiagnosisId = document.cookie
      .split('; ')
      .find(row => row.startsWith('diagnosis_id='))
      ?.split('=')[1];
    
    // 새로운 진단 ID가 있으면 캐시 무효화
    if (currentDiagnosisId && cachedDiagnosisId !== currentDiagnosisId) {
      console.log('[Hospital Page] New diagnosis detected, clearing cache');
      localStorage.removeItem('cached_hospitals');
      localStorage.removeItem('cached_department');
      localStorage.removeItem('hospitals_cache_timestamp');
      localStorage.setItem('cached_diagnosis_id', currentDiagnosisId);
      return;
    }
    
    // 캐시가 30분 이내면 사용
    if (cachedHospitals && cachedDepartment && cacheTimestamp) {
      const cacheAge = Date.now() - parseInt(cacheTimestamp);
      const thirtyMinutes = 30 * 60 * 1000;
      
      if (cacheAge < thirtyMinutes) {
        console.log('[Hospital Page] Using cached data');
        setHospitals(JSON.parse(cachedHospitals));
        setRecommendedDepartment(cachedDepartment);
        setIsLoading(false);
        return;
      }
    }
  }, []);

  // 병원 데이터 불러오기
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        setIsLoading(true);

        // userLocation이 없으면 API 호출하지 않음
        if (!userLocation) {
          console.log('[Hospital Page] User location not available yet');
          return;
        }

        // 캐시된 데이터가 있으면 API 호출 건너뛰기
        const cachedHospitals = localStorage.getItem('cached_hospitals');
        const cacheTimestamp = localStorage.getItem('hospitals_cache_timestamp');
        if (cachedHospitals && cacheTimestamp) {
          const cacheAge = Date.now() - parseInt(cacheTimestamp);
          const thirtyMinutes = 30 * 60 * 1000;
          
          if (cacheAge < thirtyMinutes) {
            console.log('[Hospital Page] Using cached data, skipping API call');
            return;
          }
        }

        // 토큰 확인
        const token = localStorage.getItem('token');
        if (!token) {
          console.log('[Hospital Page] No token found, redirecting to login');
          toast({
            title: "로그인이 필요합니다",
            description: "병원 추천 서비스를 이용하려면 로그인이 필요합니다.",
            duration: 3000,
          });
          router.push('/login');
          return;
        }

        console.log('[Hospital Page] Calling hospitals API with location:', userLocation);

        const response = await fetch('/api/hospitals/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            latitude: userLocation.lat,
            longitude: userLocation.lng
          })
        });

        console.log('[Hospital Page] API response status:', response.status);

        if (!response.ok) {
          const errorData = await response.json();
          console.log('[Hospital Page] API error:', errorData);
          
          if (response.status === 404 && errorData.message.includes('진단 결과가 없습니다')) {
            toast({
              title: "건강 설문 필요",
              description: "맞춤형 병원 추천을 위해 건강 설문이 필요합니다.",
              duration: 3000,
            });
            router.push('/question');
            return;
          }
          
          if (response.status === 401) {
            toast({
              title: "로그인이 필요합니다",
              description: "다시 로그인해주세요.",
              duration: 3000,
            });
            router.push('/login');
            return;
          }
          
          throw new Error(errorData.message || '병원 정보를 불러오는데 실패했습니다.');
        }

        const data = await response.json();
        console.log('[Hospital Page] Raw hospital data:', data.data);
        console.log('[Hospital Page] First hospital distance example:', data.data[0]?.distance);
        
        if (!data.success) {
          throw new Error(data.message || '병원 데이터를 불러오는데 실패했습니다.');
        }

        // API 응답 데이터를 IHospitalUI 형식으로 변환
        const formattedHospitals: IHospitalUI[] = data.data.map((hospital: any) => {
          console.log(`[Hospital Page] Processing hospital ${hospital.hospitalName} with distance:`, hospital.distance);
          return {
            id: hospital.placeId || String(Math.random()),
            hospitalName: hospital.hospitalName,
            address: hospital.address,
            phone: hospital.phoneNumber,
            category: hospital.department,
            latitude: hospital.latitude,
            longitude: hospital.longitude,
            operatingHours: "09:00 - 18:00",
            distance: parseFloat(hospital.distance) || 0, // 문자열일 경우를 대비해 parseFloat 추가
            specialties: [hospital.department],
            placeUrl: hospital.placeUrl
          };
        });

        console.log('[Hospital Page] Formatted hospitals with distances:', 
          formattedHospitals.map(h => ({
            name: h.hospitalName,
            distance: h.distance
          }))
        );
        setHospitals(formattedHospitals);
        
        // 추천 진료과 설정 (첫 번째 병원의 department 사용)
        if (formattedHospitals.length > 0) {
          setRecommendedDepartment(formattedHospitals[0].category);
          
          // 현재 진단 ID 확인
          const currentDiagnosisId = document.cookie
            .split('; ')
            .find(row => row.startsWith('diagnosis_id='))
            ?.split('=')[1];
          
          // 데이터 캐싱
          localStorage.setItem('cached_hospitals', JSON.stringify(formattedHospitals));
          localStorage.setItem('cached_department', formattedHospitals[0].category);
          localStorage.setItem('hospitals_cache_timestamp', Date.now().toString());
          
          // 진단 ID도 함께 저장
          if (currentDiagnosisId) {
            localStorage.setItem('cached_diagnosis_id', currentDiagnosisId);
          }
        }
      } catch (error) {
        console.error('[Hospital Page] 병원 데이터 로딩 실패:', error);
        toast({
          title: "병원 정보 로딩 실패",
          description: error instanceof Error ? error.message : "병원 정보를 불러오는데 실패했습니다.",
          variant: "destructive",
          duration: 5000,
        });
      } finally {
        setIsLoading(false);
      }
    };

    // userLocation이 있을 때만 API 호출
    if (userLocation) {
      fetchHospitals();
    }
  }, [userLocation, router]);

  // 현재 위치 가져오기
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting location:", error);
          // 위치 정보를 가져올 수 없는 경우 서울 시청을 기본 위치로 설정
          setUserLocation({ lat: 37.5665, lng: 126.9780 });
        }
      );
    } else {
      // 지오로케이션을 지원하지 않는 경우 서울 시청을 기본 위치로 설정
      setUserLocation({ lat: 37.5665, lng: 126.9780 });
    }
  }, []);

  // 거리 계산 로직 제거 (API에서 받은 거리 사용)
  // 카테고리 필터링만 유지
  useEffect(() => {
    if (selectedCategory && hospitals.length > 0) {
      const filteredHospitals = hospitals.filter(hospital => 
        hospital.category === selectedCategory
      );
      setHospitals(filteredHospitals);
    }
  }, [selectedCategory]);

  return (
    <div className="w-full pt-[100px] pb-20">
      <div className="w-full max-w-[800px] mx-auto">
        <div className="bg-white rounded-xl shadow-lg">
          <div className="border-b">
            <TabNavigation />
          </div>
          <div className="px-6 py-10">
            <CardHeader className="space-y-3 text-center">
              <CardTitle className="text-3xl font-bold text-[#0B4619]">
                🏥 주변 병원 정보
              </CardTitle>
              <div className="flex flex-col items-center gap-3">
                <CardDescription className="text-base text-gray-600">
                  가장 최근 건강 검색 기록을 분석하여 맞춤형 진료과를 안내합니다.
                </CardDescription>
                <CardDescription className="text-sm text-yellow-600 font-medium">
                  <AlertTriangle className="w-4 h-4 inline-block mb-1 mr-1" />
                  본 정보는 참고용이며, 정확한 진단은 반드시 의료 전문가와 상담하시기 바랍니다.
                </CardDescription>
                {isLoading ? (
                  <Badge 
                    variant="outline" 
                    className="text-sm px-3 py-1 bg-gray-100 text-gray-500 border-gray-300 font-medium"
                  >
                    진료과 분석 중...
                  </Badge>
                ) : recommendedDepartment ? (
                  <Badge 
                    variant="outline" 
                    className="text-sm px-3 py-1 bg-[#0B4619]/5 text-[#0B4619] border-[#0B4619]/20 font-medium"
                  >
                    추천 진료과: {recommendedDepartment}
                  </Badge>
                ) : (
                  <Badge 
                    variant="outline" 
                    className="text-sm px-3 py-1 bg-yellow-50 text-yellow-700 border-yellow-300 font-medium"
                  >
                    진료과 정보 없음
                  </Badge>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-8 mt-6">
              {/* 지도 영역 */}
              <div className="space-y-6">
                <div className="w-full aspect-video rounded-lg overflow-hidden relative">
                  {isLoading ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                      <Loader2 className="h-8 w-8 animate-spin text-[#0B4619]" />
                    </div>
                  ) : selectedHospital || userLocation ? (
                    <>
                      <Map
                        center={selectedHospital 
                          ? { lat: selectedHospital.latitude, lng: selectedHospital.longitude } 
                          : (userLocation || { lat: 37.5665, lng: 126.9780 })}
                        style={{ width: "100%", height: "100%" }}
                        level={mapLevel}
                        className="relative"
                        onCreate={(map) => setMap(map)}
                      >
                        {userLocation && (
                          <>
                            <MapMarker position={userLocation} />
                            <CustomOverlayMap
                              position={userLocation}
                              yAnchor={2.2}
                            >
                              <div className="px-2 py-1 bg-white rounded shadow-md text-xs">
                                현재 위치
                              </div>
                            </CustomOverlayMap>
                          </>
                        )}
                        {hospitals.map((hospital, idx) => (
                          <div key={idx}>
                            <MapMarker
                              position={{ lat: hospital.latitude, lng: hospital.longitude }}
                              onClick={() => {
                                setSelectedHospital(hospital);
                                setMapLevel(2);
                                if (map) {
                                  map.setCenter(new window.kakao.maps.LatLng(hospital.latitude, hospital.longitude));
                                }
                              }}
                            />
                            <CustomOverlayMap
                              position={{ lat: hospital.latitude, lng: hospital.longitude }}
                              yAnchor={2.2}
                            >
                              <div className="px-2 py-1 bg-white rounded shadow-md text-xs">
                                {hospital.hospitalName}
                              </div>
                            </CustomOverlayMap>
                          </div>
                        ))}
                      </Map>
                      <div className="absolute right-4 top-4 z-10">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="icon"
                                className="bg-white shadow-md hover:bg-gray-100"
                                onClick={() => {
                                  if (userLocation && map) {
                                    map.setCenter(new window.kakao.maps.LatLng(userLocation.lat, userLocation.lng));
                                  } else {
                                    if (navigator.geolocation) {
                                      navigator.geolocation.getCurrentPosition(
                                        (position) => {
                                          const { latitude, longitude } = position.coords;
                                          const newLocation = { lat: latitude, lng: longitude };
                                          setUserLocation(newLocation);
                                          if (map) {
                                            map.setCenter(new window.kakao.maps.LatLng(latitude, longitude));
                                          }
                                        },
                                        (error) => {
                                          console.error("Error getting location:", error);
                                          toast({
                                            title: "위치 정보를 가져올 수 없습니다",
                                            description: "브라우저의 위치 정보 접근을 허용해주세요.",
                                            variant: "destructive",
                                            duration: 3000,
                                          });
                                        }
                                      );
                                    }
                                  }
                                }}
                              >
                                <MapPin className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="left">
                              <p>현재 위치로 이동</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                      <p className="text-gray-500">병원을 선택해주세요.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* 병원 목록 */}
              <div className="grid gap-4 mt-8">
                {hospitals.map((hospital, index) => (
                  <div 
                    key={index} 
                    className="p-5 rounded-lg border bg-white hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => {
                      setSelectedHospital(hospital);
                      setMapLevel(5);
                    }}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-3 pb-3 border-b border-gray-200">
                        <div className="flex items-center gap-2">
                          <h3 className="flex items-center gap-2 text-lg font-bold tracking-wide text-[#0B4619]">
                            <Building2 className="w-4 h-4 text-[#0B4619]/90" />
                            {hospital.hospitalName}
                          </h3>
                          <Badge 
                            variant="outline" 
                            className="text-sm px-2 py-0.5 bg-[#0B4619]/5 text-[#0B4619] border-[#0B4619]/20"
                          >
                            {hospital.category}
                          </Badge>
                          {hospital.distance !== undefined && (
                            <span className="text-sm font-medium text-gray-500 shrink-0">
                              {(() => {
                                const distance = parseFloat(String(hospital.distance));
                                if (isNaN(distance)) return '거리 정보 없음';
                                
                                // 1km 미만일 경우 미터 단위로 표시
                                if (distance < 1) {
                                  return `${Math.round(distance * 1000)}m`;
                                }
                                
                                // 1km 이상일 경우 소수점 한 자리까지 표시
                                return `${distance.toFixed(1)}km`;
                              })()}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <MapPin className="w-4 h-4 text-[#0B4619]" />
                          <Link
                            href={hospital.placeUrl || `https://map.kakao.com/link/search/${encodeURIComponent(hospital.hospitalName)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#0B4619] hover:underline"
                          >
                            {hospital.address}
                          </Link>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <Phone className="w-4 h-4 text-[#0B4619]" />
                          <span>{hospital.phone}</span>
                        </div>
                        {hospital.operatingHours && (
                          <div className="flex items-center gap-2 text-sm text-gray-700">
                            <Clock className="w-4 h-4 text-[#0B4619]" />
                            <span>{hospital.operatingHours}</span>
                          </div>
                        )}
                      </div>

                      <div className="mt-4 flex justify-end">
                        <Link
                          href={`https://map.kakao.com/link/map/${encodeURIComponent(hospital.hospitalName)},${hospital.latitude},${hospital.longitude}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-[#0B4619] hover:underline flex items-center gap-1"
                        >
                          <MapPin className="w-4 h-4" />
                          카카오맵에서 보기
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <div className="text-center space-y-4 mt-12">
              <div className="flex items-center justify-center gap-2 text-base text-gray-600">
                <ChevronDown className="w-5 h-5 animate-bounce" />
                <span>아래에서 다른 건강 정보도 확인해보세요</span>
                <ChevronDown className="w-5 h-5 animate-bounce" />
              </div>
              <div className="flex justify-center gap-4">
                <Button
                  onClick={() => router.push('/')}
                  variant="outline"
                  className="border-[#0B4619] text-[#0B4619] hover:bg-[#0B4619]/5"
                >
                  메인으로
                </Button>
                <Button
                  onClick={() => router.push('/supplement')}
                  className="bg-[#0B4619] hover:bg-[#0B4619]/90 text-white font-medium"
                >
                  영양제 찾기
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 