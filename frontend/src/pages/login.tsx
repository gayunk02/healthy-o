import { useState } from 'react';
import styles from '@/styles/login.module.css';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if(!email || !password){
      alert('아이디와 비밀번호를 입력하세요.');
      return;
    }

    // 로그인 토큰 저장
    localStorage.setItem('token', 'mock-login-token');

    // 로그인 성공 후 메인 페이지 이동
    alert('로그인 성공! (mock)');
    router.push('/');
    setTimeout(()=>{
      location.reload();
    }, 100);
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Helthy-O 로그인</h2>

      <div className={styles.inputGroup}>
        <div className={styles.label}>ID:</div>
        <input
          type="text"
          placeholder="아이디를 입력하세요"
          className={styles.inputBox}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className={styles.inputGroup}>
        <div className={styles.label}>PW:</div>
        <input
          type="password"
          placeholder="비밀번호를 입력하세요"
          className={styles.inputBox}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button className={styles.loginBtn} onClick={handleLogin}>
        로그인
      </button>
    </div>
  );
}