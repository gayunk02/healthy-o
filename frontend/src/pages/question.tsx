import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import style from '@/styles/question.module.css';

export default function Home() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.alert('안내: 사용자가 입력한 개인 건강 정보는 본 서비스 이용에만 사용됩니다.');
  }, []);

  const onSubmit = async () => {
    if (!name || !age || !gender || !status) {
      alert("모든 항목을 입력해 주세요.");
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch('/api/question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, age, gender, status })
      });

      if (!response.ok) {
        throw new Error("서버 요청 실패");
      }

      const data = await response.json();
      router.push('/result');
    } catch (error) {
      alert("제출 중 오류가 발생했습니다. 다시 시도해주세요.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 className={style.title}>
        🩺 건강 상태 입력 🔍
      </h1>

      <div className={style.divider}></div>

      <div className={style.mainQuestion}>
        <div>
          <label htmlFor="name">✍🏻 이름을 입력하세요: </label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="age">✍🏻 나이를 입력하세요: </label>
          <input
            id="age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="gender">✍🏻 성별을 입력하세요: </label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">성별을 선택하세요</option>
            <option value="남성">남성</option>
            <option value="여성">여성</option>
          </select>
        </div>

        <div>
          <label htmlFor="status">✍🏻 현재 상태를 입력하세요</label>
          <div className={style.example}>
            현재 건강 상태 및 주요 증상을 입력해주세요!
            <br />
            (예: 주요 증상, 증상 발생 시기, 만성 질환 유무, 복용중 약물, 흡연 여부, 음주 여부 등 자세히 적어주시면 더 좋아요!)
          </div>
          <br />
          <textarea
            id="status"
            placeholder="위 예시를 보고 현재 상태를 입력하세요"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        </div>
      </div>

      <div className={style.divider}></div>
      <button
        className={style.questbtn}
        onClick={onSubmit}
        disabled={isLoading}
      >
        {isLoading ? "제출 중..." : "제출하기"}
      </button>
    </div>
  );
}
