import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import style from '@/styles/mypage.module.css'

export default function MyPage(){
    const router = useRouter();
    const [isAuth, setIsAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const token = localStorage.getItem("token");
        
        if(!token) {
            alert("로그인이 필요한 서비스입니다.");
            router.replace("/login");
        } else{
            setIsAuth(true);
            setLoading(false);
        }
    }, []);

    if(loading || !isAuth) return null;

    

    const mockResultHistory = [
        { date: "2025-05-14", items: ["코로나19", "감기", "알레르기"]},
        { date: "2025-05-03", items: ["비염", "알레르기"]},
    ];
    
    const mockHospitalHistory = [
        { date: "2025-05-14", items: ["광주내과의원", "하나내과의원"]},
        { date: "2025-05-03", items: ["전남대병원", "조선대병원"]},
        
    ]

    const mockSupplementHistory = [
        {date:"2025-05-14", items: ["비타민D", "오메가3"]},
        {date: "2025-05-03", items: ["비타민D", "마그네슘"]},
    ];

    return(
        <div className={style.wrapper}>

<>
            <h1 className={style.heading}>
                사용자 정보
            </h1>

            <div className={style.historyWrapper}>
                사용자 정보입니다.
            </div>

</>
            <div className={style.divider}></div>

<>
            <h1 className={style.heading}>
                문진표 정보
            </h1>

            <div className={style.historyWrapper}>
                문진표 정보입니다.
            </div>
</>
            <div className={style.divider}></div>

<>
                <h1 className={style.heading}>
                    이용 기록 조회
                </h1>

                <div className={style.historyWrapper}>
                    <h2>검색 기록</h2>
                    <ul>
                        {mockResultHistory.map((record, index) => (
                            <div key = {index}>
                                🗓️{record.date} ||  ✅ 검색 기록: 
                                <strong>{record.items.join(", ")}</strong>
                                <br></br>
                                <br></br>
                            </div>
                        ))}
                    </ul>
                </div>


                <div className={style.historyWrapper}>
                    <h2>병원 검색 기록</h2>
                    <ul>
                        {mockHospitalHistory.map((record, index)=> (
                            <div key = {index}>
                                🗓️{record.date} || 🏥 검색 기록:
                                <strong>{record.items.join(", ")}</strong>
                                <br></br>
                                <br></br>
                            </div>
                        ))}
                    </ul>
                </div>


                <div className={style.historyWrapper}>
                    <h2>영양제 검색 기록</h2>
                    <ul>
                        {mockSupplementHistory.map((record, index) => (
                            <div key = {index}>
                                🗓️{record.date} || 💊 검색 기록: 
                                <strong>{record.items.join(", ")}</strong>
                                <br></br>
                                <br></br>
                            </div>
                        ))}
                    </ul>
                </div>
</>
        </div>
    )

}