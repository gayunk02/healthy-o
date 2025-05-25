import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import style from '@/styles/hospital.module.css';

declare global {
  interface Window {
    kakao: any;
  }
}

interface LatLng {
  lat: number;
  lng: number;
}

interface Hospital {
  name: string;
  address: string;
  department: string;
  lat: number;
  lng: number;
}

export default function HospitalPage() {
  const router = useRouter();

  const onClickMain = () => router.push('/');
  const onClickSupplement = () => router.push('/supplement');

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [recommendedDepartment, setRecommendedDepartment] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<LatLng | null>(null);
  const [map, setMap] = useState<any /* kakao.maps.Map */ | null>(null);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [filteredHospitals, setFilteredHospitals] = useState<Hospital[]>([]);
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  const [directionsLine, setDirectionsLine] = useState<any /* kakao.maps.Polyline */ | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<any /* kakao.maps.Marker */ | null>(null);
  const [activeInfoWindow, setActiveInfoWindow] = useState<any /* kakao.maps.InfoWindow */ | null>(null);

  // 로그인 체크
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsAuthenticated(false);
      alert('로그인 시 이용 가능한 기능입니다.');
      router.push('/login');
    }
  }, [router]);

  // 추천진료과 받아오기
  useEffect(() => {
    if (!isAuthenticated) return;
    fetch('/mock_recommendation.json')
      .then(res => res.json())
      .then((data: { recommended_department: string }) =>
        setRecommendedDepartment(data.recommended_department)
      )
      .catch(err => console.error('추천진료과 fetch 실패:', err));
  }, [isAuthenticated]);

  // 병원 데이터 받아오기
  useEffect(() => {
    if (!isAuthenticated) return;
    fetch('/mock_hospitals.json')
      .then(res => res.json() as Promise<Hospital[]>)
      .then(data => setHospitals(data))
      .catch(err => console.error('병원 데이터 fetch 실패:', err));
  }, [isAuthenticated]);

  // 지도 로딩 및 필터링
  useEffect(() => {
    if (
      !recommendedDepartment ||
      mapLoaded ||
      hospitals.length === 0 ||
      !isAuthenticated
    )
      return;

    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false`;
    script.onload = () => {
      window.kakao.maps.load(() => {
        navigator.geolocation.getCurrentPosition(pos => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          const userPos = new window.kakao.maps.LatLng(lat, lng);
          setUserLocation({ lat, lng });

          const mapObj = new window.kakao.maps.Map(
            document.getElementById('map') as HTMLElement,
            {
              center: userPos,
              level: 3,
              draggable: false,
              zoomable: false,
            }
          );
          setMap(mapObj);

          new window.kakao.maps.Marker({
            position: userPos,
            map: mapObj,
            title: '현재 위치',
            image: new window.kakao.maps.MarkerImage(
              'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
              new window.kakao.maps.Size(24, 35)
            ),
          });

          const nearby = hospitals.filter(h =>
            h.department === recommendedDepartment &&
            getDistance(lat, lng, h.lat, h.lng) <= 3
          );

          setFilteredHospitals(nearby);
          setMapLoaded(true);
        });
      });
    };
    document.head.appendChild(script);
  }, [recommendedDepartment, hospitals, mapLoaded, isAuthenticated]);

  // 사용자와 병원 간 거리 계산
  const getDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    const R = 6371; // km
    const toRad = (deg: number) => (deg * Math.PI) / 180;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  // 경로 그리기
  const drawRoute = (lat: number, lng: number, name: string) => {
    if (!map || !userLocation) return;
    if (directionsLine) directionsLine.setMap(null);
    if (selectedMarker) selectedMarker.setMap(null);
    if (activeInfoWindow) activeInfoWindow.close();

    const userLatLng = new window.kakao.maps.LatLng(
      userLocation.lat,
      userLocation.lng
    );
    const hospitalLatLng = new window.kakao.maps.LatLng(lat, lng);

    const marker = new window.kakao.maps.Marker({
      position: hospitalLatLng,
      map,
    });
    setSelectedMarker(marker);

    const info = new window.kakao.maps.InfoWindow({
      content: `<div style="padding:5px;font-size:14px;">${name}</div>`,
    });
    info.open(map, marker);
    setActiveInfoWindow(info);

    const path = [userLatLng, hospitalLatLng];
    const polyline = new window.kakao.maps.Polyline({
      path,
      strokeWeight: 5,
      strokeOpacity: 0.8,
      strokeStyle: 'solid',
    });
    polyline.setMap(map);
    setDirectionsLine(polyline);

    const bounds = new window.kakao.maps.LatLngBounds();
    bounds.extend(userLatLng);
    bounds.extend(hospitalLatLng);
    map.setBounds(bounds);
  };

  if (!isAuthenticated) return null;

  return (
    <div>
      <h1 className={style.title}>💉 내 위치 주변 병원 찾기 🏥</h1>
      <div className={style.divider} />

      {recommendedDepartment ? (
        <div className={style.state}>
          {`입력 정보 기반으로 '${recommendedDepartment}' 진료과가 검색되었습니다.`}
        </div>
      ) : (
        <div className={style.state}>건강 상태 분석 중입니다...</div>
      )}

      <div className={style.divider} />

      <div className={style.resultDescription}>
        <div>다음과 같은 병원들을 추천합니다! (3km 이내)</div>

        <ul className={style.hospitalList}>
          {filteredHospitals.map((h, i) => (
            <li key={i} className={style.hospitalItem}>
              <strong>✔ {h.name}</strong> – {h.address}
              <button
                onClick={() => drawRoute(h.lat, h.lng, h.name)}
                className={style.routeButton}
              >
                경로 보기
              </button>
            </li>
          ))}
        </ul>

        <div id="map" className={style.map}></div>

        <div className={style.subDescription}>
          👇🏻 아래에서 영양제 검색도 해보세요! 👇🏻
        </div>
      </div>

      <div className={style.divider} />

      <button
        className={style.supplementbtn}
        onClick={onClickSupplement}
      >
        영양제 찾기
      </button>
      <button className={style.mainbtn} onClick={onClickMain}>
        메인 페이지로 돌아가기
      </button>
    </div>
  );
}
