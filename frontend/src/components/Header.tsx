// components/Header.tsx
import { useRouter } from "next/router";
import style from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Header() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(()=>{
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleMainClick = () => {
    router.push("/");
  };

  const handleLoginClick = () => {
    router.push("/login");
  };

  const handleSignUpClick = () => {
    router.push("/signup");
  };

  const handleMypage = () => {
    router.push("/mypage");
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);  // 로그아웃 상태 갱신
    alert('로그아웃 되었습니다.');
    router.push('/');
  }

  return (
    <div className={style.headerWrapper}>
      <div className={style.logo} onClick={handleMainClick}>
        <Image src="/headlogo.png" alt="상단 로고" width={150} height={35} style={{cursor: "pointer"}}/>
      </div>

  
      <div className={style.authButtons}>
        {isLoggedIn ? (
          <>

          <div className={style.mypage} onClick={handleMypage}>
            마이페이지
          </div>

          <div className={style.logout} onClick={handleLogout}>
            로그아웃
          </div>

          </>
        ) : (
          <>
            <div className={style.login} onClick={handleLoginClick}>
              로그인
            </div>
            <div className={style.signup} onClick={handleSignUpClick}>
              회원가입
            </div>
          </>
        )}
      </div>
    </div>
  );
}