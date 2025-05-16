import { useEffect, useState } from "react";
import styles from "../styles/signup.module.css";

export default function SignupPage() {
  const [phone1, setPhone1] = useState("");
  const [phone2, setPhone2] = useState("");
  const [phone3, setPhone3] = useState("");
  const [token, setToken] = useState("000000");
  const [timer, setTimer] = useState("3:00");
  const [isTokenDisabled, setIsTokenDisabled] = useState(true);
  const [isConfirmDisabled, setIsConfirmDisabled] = useState(true);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [form, setForm] = useState({
    email: "",
    writer: "",
    password1: "",
    password2: "",
    location: "",
    gender: "",
  });
  const [errors, setErrors] = useState<any>({});

  const handlePhoneChange = (index: number, value: string) => {
    if (index === 1) {
      setPhone1(value);
      if (value.length === 3) document.getElementById("phone2")?.focus();
    } else if (index === 2) {
      setPhone2(value);
      if (value.length === 4) document.getElementById("phone3")?.focus();
    } else {
      setPhone3(value);
    }

    if (phone1.length === 3 && phone2.length === 4 && phone3.length === 4) {
      setIsTokenDisabled(false);
    }
  };

  const handleInputChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const validateForm = () => {
    const newErrors: any = {};
    if (!form.email.includes("@"))
      newErrors.email = "이메일이 올바르지 않습니다.";
    if (!form.writer) newErrors.writer = "이름이 올바르지 않습니다.";
    if (!form.password1) newErrors.password1 = "비밀번호를 입력해 주세요.";
    if (!form.password2) newErrors.password2 = "비밀번호를 입력해 주세요.";
    if (form.password1 !== form.password2)
      newErrors.password1 = newErrors.password2 =
        "비밀번호가 일치하지 않습니다.";
    if (phone1.length !== 3 || phone2.length !== 4 || phone3.length !== 4) {
      newErrors.location = "전화번호를 올바르게 입력해 주세요.";
    }
    if (!form.gender) newErrors.gender = "성별을 선택해 주세요.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (validateForm()) {
      try {
        const response = await fetch('/api/signup', { //백엔드 주소 입력란 '~/api/singup'
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: form.email,
            name: form.writer,
            password: form.password1,
            phone: `${phone1}-${phone2}-${phone3}`,
            gender: form.gender
          })
        });
  
        const data = await response.json();
        alert(data.message || "Healthy-O 가입을 축하합니다.");
      } catch (error) {
        alert("회원가입 중 문제가 발생했습니다.");
        console.error(error);
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <h3>회원가입</h3>

      <input
        className={styles.inputbox}
        placeholder="이메일을 입력해 주세요."
        onChange={(e) => handleInputChange("email", e.target.value)}
      />
      <div className={styles.error}>{errors.email}</div>

      <input
        className={styles.inputbox}
        placeholder="이름을 입력해 주세요."
        onChange={(e) => handleInputChange("writer", e.target.value)}
      />
      <div className={styles.error}>{errors.writer}</div>

      <input
        className={styles.inputbox}
        placeholder="비밀번호를 입력해 주세요."
        type="password"
        onChange={(e) => handleInputChange("password1", e.target.value)}
      />
      <div className={styles.error}>{errors.password1}</div>

      <input
        className={styles.inputbox}
        placeholder="비밀번호를 다시 입력해 주세요."
        type="password"
        onChange={(e) => handleInputChange("password2", e.target.value)}
      />
      <div className={styles.error}>{errors.password2}</div>

      <div className={styles.phone__wrapper}>
        <input
          id="phone1"
          className={styles.phoneNum}
          maxLength={3}
          value={phone1}
          onChange={(e) => handlePhoneChange(1, e.target.value)}
        />
        -
        <input
          id="phone2"
          className={styles.phoneNum}
          maxLength={4}
          value={phone2}
          onChange={(e) => handlePhoneChange(2, e.target.value)}
        />
        -
        <input
          id="phone3"
          className={styles.phoneNum}
          maxLength={4}
          value={phone3}
          onChange={(e) => handlePhoneChange(3, e.target.value)}
        />
      </div>

      <div className={styles.error}>{errors.location}</div>

      <div className={styles.gender__wrapper}>
        <label className={styles.gender}>
          <input
            type="radio"
            name="gender"
            onChange={() => handleInputChange("gender", "여성")}
          />
          여성
        </label>
        <label className={styles.gender}>
          <input
            type="radio"
            name="gender"
            onChange={() => handleInputChange("gender", "남성")}
          />
          남성
        </label>
      </div>
      <div className={styles.error}>{errors.gender}</div>

      <hr />
      <div className={styles.divider}></div>
      <button id="signup__button" onClick={handleSignup}>
        가입하기
      </button>
    </div>
  );
}
