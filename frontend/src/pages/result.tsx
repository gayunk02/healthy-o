import { useRouter } from "next/router"
import style from '@/styles/result.module.css'
import { useEffect, useState } from "react";

export default function Home(){

    const router = useRouter();
    const [isConsent, setIsConsent] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const consent = localStorage.getItem("consent");

        if(consent !== "true") {
            alert("서비스 이용을 위해 동의가 필요합니다.");
            router.replace("/disclaimer");
        } else{
            setIsConsent(true);
        }
        setLoading(false);
    }, [router]);

    if (loading || !isConsent) return null;

    const mockResults = [
        {
            name: "고혈압",
            description: "혈압이 높은 상태를 의미하며, 의사의 진단을 받는 것을 추천합니다."
        },
        
        {
            name: "비염",
            description: "재채기, 콧물, 코막힘 증상을 동반할 수 있는 알레르기 질환입니다."
        },
        {
            name: "위염",
            description: "복부 통증과 메스꺼움을 유발할 수 있으며, 자극적인 음식은 피해야 합니다."
        },

    ]



    const onClickHospital = () => {
        router.push('/hospital');
    }

    const onClickSupplement = () => {
        router.push('/supplement');
    }



    return(
        <div>
            <h1 className={style.title}>✅ 건강 정보 검색 ✅</h1>

            <div className={style.divider}></div>

            <div className={style.state}>입력 정보와 유사한 건강 정보를 안내합니다. </div>

            <div className={style.divider}></div>

            <h3 className={style.result}>검색 결과</h3>


            <div className={style.resultDescriptionWrapper}>   
            <div className={style.resultDescription}>
                {mockResults.map((item, index) => (
                    <div key = {index} style={{fontSize:"30px", marginTop: "20px", marginBottom:"20px"}}>
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
                👇🏻 로그인하고, 아래에서 주변 병원과 영양제도 검색해보세요! 👇🏻
            </div>

            <div className={style.divider}></div>

            <button className={style.hospitalbtn} onClick={onClickHospital}>병원 찾기</button>

            <button className={style.supplementbtn} onClick={onClickSupplement}>영양제 찾기</button>
        </div>
    )
}