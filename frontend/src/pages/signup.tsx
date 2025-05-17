import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/signup.module.css";

export default function SignupPage() {
  const router = useRouter();
  const [phone1, setPhone1] = useState("");
  const [phone2, setPhone2] = useState("");
  const [phone3, setPhone3] = useState("");
  const [form, setForm] = useState({
    email: "",
    writer: "",
    password1: "",
    password2: "",
    gender: "",
  });
  const [errors, setErrors] = useState<any>({});

  const handleInputChange = (key: string, value: string) => {
    setForm((prev) => {
      const newForm = { ...prev, [key]: value };
      const newErrors = { ...errors };

      if (value === "") {
        newErrors[key] = "";
      } else {
        if (key === "email") {
          const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/;
          newErrors.email = emailRegex.test(value) ? "" : "올바른 이메일 형식이 아닙니다.";
        }

        if (key === "writer") {
          newErrors.writer = value.trim().length >= 2 ? "" : "이름은 2글자 이상 입력해 주세요.";
        }

        if (key === "password1") {
          const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;
          newErrors.password1 = passwordRegex.test(value)
            ? ""
            : "비밀번호는 8~20자의 영문, 숫자, 특수문자를 포함해야 합니다.";
          newErrors.password2 = form.password2 === "" ? "" : (value === form.password2 ? "" : "비밀번호가 일치하지 않습니다.");
        }

        if (key === "password2") {
          newErrors.password2 = value === "" ? "" : (value === form.password1 ? "" : "비밀번호가 일치하지 않습니다.");
        }

        if (key === "gender") {
          newErrors.gender = value ? "" : "성별을 선택해 주세요.";
        }
      }

      setErrors(newErrors);
      return newForm;
    });
  };

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
  };

  const validateForm = () => {
    const newErrors: any = {};
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;

    if (!emailRegex.test(form.email)) newErrors.email = "올바른 이메일 형식이 아닙니다.";
    if (!form.writer || form.writer.trim().length < 2) newErrors.writer = "이름은 2글자 이상 입력해 주세요.";
    if (!form.password1) newErrors.password1 = "비밀번호를 입력해 주세요.";
    else if (!passwordRegex.test(form.password1)) newErrors.password1 = "비밀번호는 8~20자의 영문, 숫자, 특수문자를 포함해야 합니다.";
    if (!form.password2) newErrors.password2 = "비밀번호를 입력해 주세요.";
    else if (form.password1 !== form.password2) newErrors.password2 = "비밀번호가 일치하지 않습니다.";
    if (phone1.length !== 3 || phone2.length !== 4 || phone3.length !== 4) newErrors.phone = "올바른 전화번호 형식이 아닙니다.";
    if (!form.gender) newErrors.gender = "성별을 선택해 주세요.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (validateForm()) {
      try {
        const response = await fetch("/api/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: form.email,
            name: form.writer,
            password: form.password1,
            phone: `${phone1}-${phone2}-${phone3}`,
            gender: form.gender,
          }),
        });
        const data = await response.json();
        alert(data.message || "Healthy-O 가입을 축하합니다.");
        router.push("/login");
      } catch (error) {
        alert("회원가입 중 문제가 발생했습니다.");
        console.error(error);
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.h3}>회원가입</h2>

      <label className={styles.label}>이메일</label>
      <input
        className={styles.inputbox}
        placeholder="이메일을 입력해 주세요."
        onChange={(e) => handleInputChange("email", e.target.value)}
      />
      <div className={styles.error}>{errors.email}</div>

      <label className={styles.label}>이름</label>
      <input
        className={styles.inputbox}
        placeholder="이름을 입력해 주세요."
        onChange={(e) => handleInputChange("writer", e.target.value)}
      />
      <div className={styles.error}>{errors.writer}</div>

      <label className={styles.label}>비밀번호</label>
      <input
        className={styles.inputbox}
        placeholder="영문,숫자,특수문자 조합 8~20자리"
        type="password"
        onChange={(e) => handleInputChange("password1", e.target.value)}
      />
      <div className={styles.error}>{errors.password1}</div>

      <label className={styles.label}>비밀번호 확인</label>
      <input
        className={styles.inputbox}
        placeholder="영문,숫자,특수문자 조합 8~20자리"
        type="password"
        onChange={(e) => handleInputChange("password2", e.target.value)}
      />
      <div className={styles.error}>{errors.password2}</div>

      <label className={styles.label}>전화번호</label>
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
      <div className={styles.error}>{errors.phone}</div>

      <div className={styles.genderSection}>
        <label className={styles.labelCenter}>성별</label>
        <div className={styles.gender__wrapper}>
          <label className={styles.gender}>
            <input
              type="radio"
              name="gender"
              onChange={() => handleInputChange("gender", "남성")}
            />
            남성
          </label>
          <label className={styles.gender}>
            <input
              type="radio"
              name="gender"
              onChange={() => handleInputChange("gender", "여성")}
            />
            여성
          </label>
        </div>
      </div>
      <div className={styles.error}>{errors.gender}</div>

      <button id="signup__button" onClick={handleSignup} className={styles.signup__button}>
        가입하기
      </button>
    </div>
  );
}
