// 영양제 페이지
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import style from '@/styles/supplement.module.css'

export default function Home(){

    const router = useRouter();
    const [isAuth, setIsAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        
        const token = localStorage.getItem("token");
        const consent = localStorage.getItem("consent");

        if (!token) {
          alert("로그인이 필요한 서비스입니다.");
          router.push("/login");
          return;
        } 
        
        if (consent !== "true"){
            alert("서비스 이용을 위해 동의가 필요합니다.");
            router.push("/disclaimer");
            return;
        }

        setIsAuth(true);
        setLoading(false);
      }, []);

      if(loading) return null;

      if(!isAuth) return null;

      
      const mockSupplements = [
        {
            name: "비타민 D",
            description: "면역 기능을 강화하고 뼈 건강 유지에 중요한 성분입니다.",
        },
        {
            name: "오메가 3",
            description: "혈관 건강과 염증 완화에 도움을 줍니다.",
        },
        {
            name: "프로바이오틱스 (유산균)",
            description: "장내 환경을 개선하고 소화를 도와줍니다.",
        },
        {
            name: "마그네슘",
            description: "신경과 근육 기능을 도와주며, 스트레스 완화에 효과적입니다.",
        },
      ]





    const onClickMain = () => {
        router.push('/');
    }

    const onClickHospital = () => {
        router.push('/hospital');
    }

    return(
        <div>
            <h1 className={style.title}>💊 영양제 검색 결과 💊</h1>

            <div className={style.divider}></div>

            <div className={style.state}>사용자의 건강 상태를 기반으로 영양제를 검색합니다.</div>

            <div className={style.divider}></div>

            
            <div className={style.resultDescriptionWrapper}>
                <div className={style.resultDescription}>
                    {mockSupplements.map((item, index)=>(
                        <div key={index} style={{fontSize:"30px", marginTop:"20px", marginBottom: "20px"}}>
                            <strong>
                                {index + 1}. {item.name}
                            </strong>
                            <br />
                            <span style={{fontSize:"25px", color:"#444"}}>
                                {item.description}
                            </span>
                        </div>
                    ))}
                </div>
                <br></br>
            </div>
            
            <div className={style.result}>
                    👇🏻 로그인하고, 아래에서 병원 추천도 받아보세요! 👇🏻
            </div>

            <div className={style.divider}></div>

            <button className={style.hospitalbtn} onClick={onClickHospital}>병원 추천받기</button>
            <button className={style.mainbtn} onClick={onClickMain}>메인 페이지로 돌아가기</button>
        </div>
    )
}