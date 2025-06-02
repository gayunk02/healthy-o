'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Clock, Loader2, Crosshair, AlertTriangle, ChevronDown, Building2 } from "lucide-react";
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
import { IHospitalUI } from "@/types/ui";

export default function HospitalPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get('category');  // 선택된 진료과목 카테고리
  const [selectedHospital, setSelectedHospital] = useState<IHospitalUI | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [mapLevel, setMapLevel] = useState<number>(5);
  const [isLoading, setIsLoading] = useState(true);
  const [hospitals, setHospitals] = useState<IHospitalUI[]>([]);

  // 임시 데이터: 실제로는 result 페이지에서 받아올 값
  const recommendedDepartment = "소화기내과";
  const recommendedSymptom = "복통";

  // 목업 데이터 불러오기
  useEffect(() => {
    const fetchMockData = async () => {
      try {
        const response = await fetch('/mock_hospitals.json');
        const data = await response.json();
        // 목업 데이터를 IHospitalUI 형식으로 변환
        const formattedHospitals: IHospitalUI[] = data.hospitals.map((hospital: any) => ({
          id: hospital.id,
          hospitalName: hospital.name,
          address: hospital.address,
          phone: hospital.phone,
          category: hospital.specialties[0],
          latitude: hospital.position.lat,
          longitude: hospital.position.lng,
          operatingHours: "09:00 - 18:00",
          distance: 0,
          specialties: hospital.specialties
        }));
        setHospitals(formattedHospitals);
        setIsLoading(false);
      } catch (error) {
        console.error('목업 데이터 로딩 실패:', error);
        setIsLoading(false);
      }
    };

    fetchMockData();
  }, []);

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
          hospital.latitude,
          hospital.longitude
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
                  <AlertTriangle className="w-4 h-4 inline-block mb-1 mr-1" />
                  본 정보는 참고용이며, 정확한 진단은 반드시 의료 전문가와 상담하시기 바랍니다.
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
                        center={selectedHospital 
                          ? { lat: selectedHospital.latitude, lng: selectedHospital.longitude } 
                          : (userLocation || { lat: 37.5665, lng: 126.9780 })}
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
                              position={{ lat: hospital.latitude, lng: hospital.longitude }}
                              onClick={() => {
                                setSelectedHospital(hospital);
                                setMapLevel(2);
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
                          {hospital.distance && (
                            <span className="text-sm font-medium text-gray-500 shrink-0">
                              {hospital.distance.toFixed(1)}km
                            </span>
                          )}
                        </div>
                      </div>

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