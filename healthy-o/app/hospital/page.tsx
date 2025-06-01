'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Clock, Loader2, Crosshair } from "lucide-react";
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { TabNavigation } from "@/components/layout/TabNavigation";

interface IHospital {
  name: string;
  address: string;
  phone: string;
  category: string;  // 병원 카테고리 (예: 내과, 외과, 종합병원 등)
  position: {
    lat: number;
    lng: number;
  };
  distance?: number;
  placeUrl?: string;  // 카카오맵 장소 URL
  operatingHours?: string;  // 영업시간 (있는 경우에만)
}

export default function HospitalPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get('category');  // 선택된 진료과목 카테고리
  const [selectedHospital, setSelectedHospital] = useState<IHospital | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [mapLevel, setMapLevel] = useState<number>(5);
  const [isLoading, setIsLoading] = useState(true);
  const [hospitals, setHospitals] = useState<IHospital[]>([
    {
      name: "서울대학교병원",
      address: "서울특별시 종로구 대학로 101",
      phone: "02-2072-2114",
      category: "종합병원",
      position: { lat: 37.579617, lng: 126.998878 },
      placeUrl: "https://place.map.kakao.com/8907101",
      operatingHours: "평일 09:00-17:30"
    },
    {
      name: "연세대학교 세브란스병원",
      address: "서울특별시 서대문구 연세로 50-1",
      phone: "02-2228-0114",
      category: "종합병원",
      position: { lat: 37.562089, lng: 126.939587 },
      placeUrl: "https://place.map.kakao.com/8165748",
      operatingHours: "평일 09:00-17:30"
    },
    {
      name: "가톨릭대학교 서울성모병원",
      address: "서울특별시 서초구 반포대로 222",
      phone: "02-1588-1511",
      category: "종합병원",
      position: { lat: 37.501163, lng: 127.005515 },
      placeUrl: "https://place.map.kakao.com/8165748",
      operatingHours: "평일 09:00-17:30"
    }
  ]);

  // 임시 데이터: 실제로는 result 페이지에서 받아올 값
  const recommendedDepartment = "소화기내과";
  const recommendedSymptom = "복통";

  // 현재 위치 가져오기
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          setIsLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsLoading(false);
        }
      );
    }
  }, []);

  // 거리 계산 및 정렬, 카테고리 필터링
  useEffect(() => {
    if (userLocation) {
      let filteredHospitals = hospitals;
      
      // 선택된 카테고리가 있으면 필터링
      if (selectedCategory) {
        filteredHospitals = hospitals.filter(hospital => 
          hospital.category === selectedCategory
        );
      }

      const hospitalsWithDistance = filteredHospitals.map(hospital => ({
        ...hospital,
        distance: calculateDistance(
          userLocation.lat,
          userLocation.lng,
          hospital.position.lat,
          hospital.position.lng
        )
      }));
      
      setHospitals(hospitalsWithDistance.sort((a, b) => (a.distance || 0) - (b.distance || 0)));
    }
  }, [userLocation, selectedCategory]);

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

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
                  ⚠️ 본 정보는 참고용이며, 정확한 진단은 반드시 의료 전문가와 상담하시기 바랍니다.
                </CardDescription>
                <Badge 
                  variant="outline" 
                  className="text-sm px-3 py-1 bg-[#0B4619]/5 text-[#0B4619] border-[#0B4619]/20 font-medium"
                >
                  추천 진료과: {recommendedDepartment}
                </Badge>
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
                        center={selectedHospital ? selectedHospital.position : (userLocation || { lat: 37.5665, lng: 126.9780 })}
                        style={{ width: "100%", height: "100%" }}
                        level={mapLevel}
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
                              position={hospital.position}
                              onClick={() => {
                                setSelectedHospital(hospital);
                                setMapLevel(2);
                              }}
                            />
                            <CustomOverlayMap
                              position={hospital.position}
                              yAnchor={2.2}
                            >
                              <div className="px-2 py-1 bg-white rounded shadow-md text-xs">
                                {hospital.name}
                              </div>
                            </CustomOverlayMap>
                          </div>
                        ))}
                      </Map>
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute bottom-4 right-4 bg-white shadow-md hover:bg-gray-100"
                        onClick={() => {
                          setSelectedHospital(null);
                          setMapLevel(3);
                        }}
                      >
                        <Crosshair className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                      <p className="text-gray-500">병원을 선택해주세요.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* 병원 목록 */}
              <div className="space-y-4">
                <h3 className="font-bold text-lg text-[#0B4619]">📍 주변 병원 목록</h3>
                <div className="grid gap-6">
                  {hospitals.map((hospital, index) => (
                    <div 
                      key={index} 
                      className="p-6 rounded-lg border bg-white hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => {
                        setSelectedHospital(hospital);
                        setMapLevel(5);
                      }}
                    >
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-200">
                            <h3 className="flex items-center gap-2 text-xl font-bold tracking-wide text-[#0B4619] drop-shadow-[0_1px_1px_rgba(11,70,25,0.15)]">
                              <span className="text-[#0B4619]/90">🏥</span>
                              {hospital.name}
                            </h3>
                            <Badge 
                              variant="outline" 
                              className="text-sm px-2 py-0.5 bg-[#0B4619]/5 text-[#0B4619] border-[#0B4619]/20"
                            >
                              {hospital.category}
                            </Badge>
                            {hospital.distance && (
                              <span className="text-sm font-medium text-gray-500 shrink-0">
                                {hospital.distance.toFixed(1)}km
                              </span>
                            )}
                          </div>
                          <div className="space-y-4">
                            <div>
                              <div className="space-y-1.5">
                                <div className="flex items-center gap-2 text-sm text-gray-700">
                                  <MapPin className="w-4 h-4 text-[#0B4619]" />
                                  <span>{hospital.address}</span>
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
                            </div>
                            {hospital.placeUrl && (
                              <div className="pt-2">
                                <a 
                                  href={hospital.placeUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sm text-[#0B4619] hover:underline inline-flex items-center gap-1"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  카카오맵에서 자세히 보기
                                  <span className="text-xs">→</span>
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <div className="text-center space-y-4 mt-12">
              <div className="flex items-center justify-center gap-2 text-base text-gray-600">
                <span className="animate-bounce">👇</span>
                <span>아래에서 다른 건강 정보도 확인해보세요</span>
                <span className="animate-bounce">👇</span>
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