'use client';

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { Save, Download, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function QuestionPage() {
  const router = useRouter();
  const { toast } = useToast();
  const toastShown = useRef(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState('');
  const [mainSymptoms, setMainSymptoms] = useState('');
  const [symptomDuration, setSymptomDuration] = useState('');
  const [chronicDiseases, setChronicDiseases] = useState('');
  const [medications, setMedications] = useState('');
  const [smoking, setSmoking] = useState('');
  const [drinking, setDrinking] = useState('');
  const [exercise, setExercise] = useState('');
  const [sleep, setSleep] = useState('');
  const [occupation, setOccupation] = useState('');
  const [workStyle, setWorkStyle] = useState('');
  const [diet, setDiet] = useState('');
  const [mealRegularity, setMealRegularity] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [highlightedFields, setHighlightedFields] = useState<string[]>([]);
  const [hasPreviousData, setHasPreviousData] = useState(false);

  // BMI 자동 계산
  useEffect(() => {
    if (height && weight) {
      const heightInMeter = Number(height) / 100;
      const weightInKg = Number(weight);
      if (heightInMeter > 0 && weightInKg > 0) {
        const bmiValue = (weightInKg / (heightInMeter * heightInMeter)).toFixed(1);
        setBmi(bmiValue);
      }
    } else {
      setBmi('');
    }
  }, [height, weight]);

  useEffect(() => {
    toast({
      title: "개인정보 보호 안내",
      description: "사용자가 입력한 개인 건강 정보는 본 서비스 이용에만 사용됩니다.",
      duration: 5000,
    });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  // 페이지 로드 시 이전 데이터 확인
  useEffect(() => {
    const checkPreviousData = async () => {
      try {
        const response = await fetch('/api/health-info');
        if (response.ok) {
          setHasPreviousData(true);
          toast({
            title: "이전에 입력한 정보가 있습니다.",
            description: (
              <div className="flex items-center gap-2">
                <button
                  onClick={loadHealthInfo}
                  className="text-[#0B4619] underline font-medium mt-1 text-sm"
                >
                  <Download className="w-4 h-4" />
                  불러오기
                </button>
              </div>
            ),
            duration: 0,
          });
        }
      } catch (error) {
        console.error('Error checking previous data:', error);
      }
    };

    const token = localStorage.getItem('token');
    if (token) {
      checkPreviousData();
    }
  }, []);

  // 필드 값이 변경될 때 하이라이트 제거
  const handleFieldChange = (fieldId: string, value: string) => {
    if (value) {
      setHighlightedFields(prev => prev.filter(id => id !== fieldId));
    }
    
    switch (fieldId) {
      case 'name':
        setName(value);
        break;
      case 'age':
        if (value === '' || /^\d+$/.test(value)) {
          setAge(value);
        }
        break;
      case 'gender':
        setGender(value);
        break;
      case 'height':
        if (value === '' || /^\d*\.?\d*$/.test(value)) {
          setHeight(value);
        }
        break;
      case 'weight':
        if (value === '' || /^\d*\.?\d*$/.test(value)) {
          setWeight(value);
        }
        break;
      case 'mainSymptoms':
        setMainSymptoms(value);
        break;
      case 'symptomDuration':
        setSymptomDuration(value);
        break;
      case 'chronicDiseases':
        setChronicDiseases(value);
        break;
      case 'medications':
        setMedications(value);
        break;
      case 'smoking':
        setSmoking(value);
        break;
      case 'drinking':
        setDrinking(value);
        break;
      case 'exercise':
        setExercise(value);
        break;
      case 'sleep':
        setSleep(value);
        break;
      case 'occupation':
        setOccupation(value);
        break;
      case 'workStyle':
        setWorkStyle(value);
        break;
      case 'diet':
        setDiet(value);
        break;
      case 'mealRegularity':
        setMealRegularity(value);
        break;
      case 'additionalInfo':
        setAdditionalInfo(value);
        break;
    }
  };

  const onSubmit = async () => {
    const requiredFields = [
      { name: '이름', value: name, id: 'name' },
      { name: '나이', value: age, id: 'age' },
      { name: '성별', value: gender, id: 'gender' },
      { name: '키', value: height, id: 'height' },
      { name: '몸무게', value: weight, id: 'weight' },
      { name: '주요 증상', value: mainSymptoms, id: 'mainSymptoms' },
      { name: '증상 발생 시기', value: symptomDuration, id: 'symptomDuration' }
    ];

    const emptyFields = requiredFields.filter(field => !field.value);
    
    if (emptyFields.length > 0) {
      setHighlightedFields(emptyFields.map(field => field.id));
      
      const firstEmptyField = document.getElementById(emptyFields[0].id);
      if (firstEmptyField) {
        firstEmptyField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      toast({
        title: "필수 항목 입력 필요",
        description: (
          <ul className="list-disc pl-4">
            {emptyFields.map(field => (
              <li key={field.name}>{field.name}</li>
            ))}
          </ul>
        ),
        variant: "destructive",
        duration: 0,
      });
      return;
    }

    setHighlightedFields([]);

    try {
      setIsLoading(true);

      const healthStatus = {
        height: Number(height),
        weight: Number(weight),
        bmi: Number(bmi),
        mainSymptoms,
        symptomDuration,
        chronicDiseases,
        medications,
        smoking,
        drinking,
        exercise,
        sleep,
        occupation,
        workStyle,
        diet,
        mealRegularity,
        additionalInfo
      };

      const response = await fetch('/api/question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          name, 
          age, 
          gender, 
          status: JSON.stringify(healthStatus)
        })
      });

      if (!response.ok) {
        throw new Error("서버 요청 실패");
      }

      // 응답 성공 시 바로 result 페이지로 이동
      router.push('/result');
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "제출 중 오류가 발생했습니다.",
        description: "다시 시도해주세요.",
        variant: "destructive",
        duration: 0,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 건강 정보 저장 함수
  const saveHealthInfo = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast({
        title: "로그인이 필요한 서비스입니다.",
        description: (
          <div className="flex items-center gap-2">
            <button
              onClick={() => router.push('/login')}
              className="text-[#0B4619] underline font-medium mt-1 text-sm"
            >
              로그인하기
            </button>
          </div>
        ),
        duration: 0,
      });
      return;
    }

    try {
      setIsSaving(true);
      const healthData = {
        name,
        age,
        gender,
        height,
        weight,
        bmi,
        mainSymptoms,
        symptomDuration,
        chronicDiseases,
        medications,
        smoking,
        drinking,
        exercise,
        sleep,
        occupation,
        workStyle,
        diet,
        mealRegularity,
        additionalInfo
      };

      const response = await fetch('/api/health-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(healthData)
      });

      if (!response.ok) {
        throw new Error('저장 실패');
      }

      toast({
        title: "건강 정보가 저장되었습니다.",
        duration: 3000,
      });
    } catch (error) {
      console.error('Error saving health info:', error);
      toast({
        title: "건강 정보 저장에 실패했습니다.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsSaving(false);
    }
  };

  // 건강 정보 불러오기 함수
  const loadHealthInfo = async () => {
    const toastStyle = { className: cn('font-pretendard') };

    try {
      const response = await fetch('/api/health-info');
      
      if (response.status === 401) {
        toast({
          title: "로그인이 필요한 서비스입니다.",
          description: (
            <div className="flex items-center gap-2">
              <button
                onClick={() => router.push('/login')}
                className="text-[#0B4619] underline font-medium mt-1 text-sm"
              >
                <Download className="w-4 h-4" />
                로그인하기
              </button>
            </div>
          ),
          className: cn(
            "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
            "bg-red-50 border-red-500 text-red-500"
          ),
        });
        return;
      }

      if (response.status === 404) {
        toast({
          title: "저장된 건강 정보가 없습니다.",
          className: toastStyle.className,
        });
        return;
      }

      if (!response.ok) {
        throw new Error('불러오기 실패');
      }

      const data = await response.json();
      
      // 각 상태 업데이트
      setName(data.name || '');
      setAge(data.age || '');
      setGender(data.gender || '');
      setHeight(data.height || '');
      setWeight(data.weight || '');
      setMainSymptoms(data.mainSymptoms || '');
      setSymptomDuration(data.symptomDuration || '');
      setChronicDiseases(data.chronicDiseases || '');
      setMedications(data.medications || '');
      setSmoking(data.smoking || '');
      setDrinking(data.drinking || '');
      setExercise(data.exercise || '');
      setSleep(data.sleep || '');
      setOccupation(data.occupation || '');
      setWorkStyle(data.workStyle || '');
      setDiet(data.diet || '');
      setMealRegularity(data.mealRegularity || '');
      setAdditionalInfo(data.additionalInfo || '');

      toast({
        title: "건강 정보를 불러왔습니다.",
        duration: 3000,
      });
    } catch (error) {
      console.error('Error loading health info:', error);
      toast({
        title: "건강 정보 불러오기에 실패했습니다.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const getInputStyle = (fieldId: string) => {
    return cn(
      "text-center placeholder:text-center",
      highlightedFields.includes(fieldId) && "ring-2 ring-red-500 animate-pulse bg-red-50"
    );
  };

  const getTextareaStyle = (fieldId: string) => {
    return cn(
      "w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B4619] focus:border-transparent resize-y text-center placeholder:text-center",
      highlightedFields.includes(fieldId) && "ring-2 ring-red-500 animate-pulse bg-red-50"
    );
  };

  return (
    <div className="w-full pt-[100px] pb-20">
      <Card className="w-full max-w-[800px] mx-auto shadow-lg">
        <CardHeader className="space-y-3 pb-8">
          <div className="space-y-4">
            <CardTitle className="text-3xl font-bold text-center text-[#0B4619]">
              🩺 건강 상태 입력
            </CardTitle>
            <CardDescription className="text-center text-base">
              정확한 진단을 위해 상세한 정보를 입력해 주세요
            </CardDescription>
            {hasPreviousData && (
              <div className="flex items-center gap-2 text-sm text-gray-500 px-6">
                <button
                  onClick={loadHealthInfo}
                  className="text-[#0B4619] hover:text-[#083613] flex items-center gap-1 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  이전 정보 불러오기
                </button>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-8">
          <div className="space-y-6">
            <h3 className="font-bold text-lg text-[#0B4619]">👤 기본 정보</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <Label htmlFor="name" className="text-sm font-bold">
                  이름 <span className="text-red-500 font-bold">*</span>
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => handleFieldChange('name', e.target.value)}
                  placeholder="이름을 입력해 주세요"
                  className={getInputStyle('name')}
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="age" className="text-sm font-bold">
                  나이 <span className="text-red-500 font-bold">*</span>
                </Label>
                <Input
                  id="age"
                  type="text"
                  inputMode="numeric"
                  pattern="\d*"
                  value={age}
                  onChange={(e) => handleFieldChange('age', e.target.value)}
                  placeholder="나이를 입력해 주세요"
                  className={getInputStyle('age')}
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="gender" className="text-sm font-bold">
                  성별 <span className="text-red-500 font-bold">*</span>
                </Label>
                <Select value={gender} onValueChange={(value) => handleFieldChange('gender', value)}>
                  <SelectTrigger id="gender" className={cn(getInputStyle('gender'), "justify-center")}>
                    <SelectValue placeholder="성별을 선택해 주세요" className="text-center" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="남성" className="text-center">남성</SelectItem>
                    <SelectItem value="여성" className="text-center">여성</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg space-y-6 border border-gray-200">
            <h3 className="font-bold text-lg text-[#0B4619]">📊 신체 정보</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <Label htmlFor="height" className="text-sm font-bold">
                  키 (cm) <span className="text-red-500 font-bold">*</span>
                </Label>
                <Input
                  id="height"
                  type="text"
                  inputMode="decimal"
                  pattern="[0-9]*\.?[0-9]*"
                  value={height}
                  onChange={(e) => handleFieldChange('height', e.target.value)}
                  placeholder="키를 입력해 주세요"
                  className={getInputStyle('height')}
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="weight" className="text-sm font-bold">
                  몸무게 (kg) <span className="text-red-500 font-bold">*</span>
                </Label>
                <Input
                  id="weight"
                  type="text"
                  inputMode="decimal"
                  pattern="[0-9]*\.?[0-9]*"
                  value={weight}
                  onChange={(e) => handleFieldChange('weight', e.target.value)}
                  placeholder="몸무게를 입력해 주세요"
                  className={getInputStyle('weight')}
                />
              </div>
            </div>

            {bmi && (
              <div className="bg-white p-4 rounded-md border border-gray-200">
                <p className="text-center font-medium">
                  BMI: {bmi} ({getBmiStatus(Number(bmi))})
                </p>
              </div>
            )}
          </div>

          <div className="bg-gray-50 p-6 rounded-lg space-y-6 border border-gray-200">
            <h3 className="font-bold text-lg text-[#0B4619]">🏥 건강 정보</h3>
            <div className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="chronicDiseases" className="text-sm font-bold">
                  만성 질환 유무
                </Label>
                <p className="text-sm text-gray-500 mb-2">
                  예시: 고혈압, 당뇨병, 천식, 관절염 등
                </p>
                <Input
                  id="chronicDiseases"
                  value={chronicDiseases}
                  onChange={(e) => handleFieldChange('chronicDiseases', e.target.value)}
                  placeholder="현재 앓고 있는 만성 질환이 있다면 입력해 주세요"
                  className="text-center placeholder:text-center"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="medications" className="text-sm font-bold">
                  복용중인 약물
                </Label>
                <p className="text-sm text-gray-500 mb-2">
                  예시: 혈압약, 당뇨약, 소염진통제, 항생제 등
                </p>
                <Input
                  id="medications"
                  value={medications}
                  onChange={(e) => handleFieldChange('medications', e.target.value)}
                  placeholder="현재 복용중인 약물이 있다면 입력해 주세요"
                  className="text-center placeholder:text-center"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <Label htmlFor="smoking" className="text-sm font-bold">
                    흡연 여부
                  </Label>
                  <Select value={smoking} onValueChange={setSmoking}>
                    <SelectTrigger className="text-center justify-center">
                      <SelectValue placeholder="흡연 여부를 선택해 주세요" className="text-center" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="비흡연" className="text-center">비흡연</SelectItem>
                      <SelectItem value="흡연" className="text-center">흡연</SelectItem>
                      <SelectItem value="금연" className="text-center">금연</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="drinking" className="text-sm font-bold">
                    음주 여부
                  </Label>
                  <Select value={drinking} onValueChange={setDrinking}>
                    <SelectTrigger className="text-center justify-center">
                      <SelectValue placeholder="음주 여부를 선택해 주세요" className="text-center" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="비음주" className="text-center">비음주</SelectItem>
                      <SelectItem value="주 1-2회" className="text-center">주 1-2회</SelectItem>
                      <SelectItem value="주 3-4회" className="text-center">주 3-4회</SelectItem>
                      <SelectItem value="주 5회 이상" className="text-center">주 5회 이상</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg space-y-6 border border-gray-200">
            <h3 className="font-bold text-lg text-[#0B4619]">🏥 주요 증상</h3>
            <div className="space-y-3">
              <Label htmlFor="mainSymptoms" className="text-sm font-bold">
                주요 증상 <span className="text-red-500 font-bold">*</span>
              </Label>
              <p className="text-sm text-gray-500 mb-2">
                예시: 기침이 2주째 지속됨, 가래가 있음, 밤에 기침이 심해짐, 숨쉴 때 가슴이 답답함
              </p>
              <textarea
                id="mainSymptoms"
                value={mainSymptoms}
                onChange={(e) => handleFieldChange('mainSymptoms', e.target.value)}
                placeholder="현재 겪고 있는 주요 증상을 자세히 설명해 주세요 (자세하게 설명하실 수록 좋습니다.)"
                className={getTextareaStyle('mainSymptoms')}
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="symptomDuration" className="text-sm font-bold">
                증상 발생 시기 <span className="text-red-500 font-bold">*</span>
              </Label>
              <p className="text-sm text-gray-500 mb-2">
                예시: 3일 전부터, 1주일 전부터, 1개월 전부터
              </p>
              <Input
                id="symptomDuration"
                value={symptomDuration}
                onChange={(e) => handleFieldChange('symptomDuration', e.target.value)}
                placeholder="증상이 언제부터 시작되었는지 입력해 주세요"
                className={getInputStyle('symptomDuration')}
              />
            </div>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="lifestyle" className="border rounded-lg">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-[#0B4619]">🌱 생활습관 정보</span>
                  <span className="text-sm text-gray-500">(선택사항)</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <Label htmlFor="exercise" className="text-sm font-bold">
                      운동 빈도
                    </Label>
                    <Select value={exercise} onValueChange={setExercise}>
                      <SelectTrigger className="text-center justify-center">
                        <SelectValue placeholder="운동 빈도를 선택해 주세요" className="text-center" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none" className="text-center">거의 안 함</SelectItem>
                        <SelectItem value="light" className="text-center">가벼운 운동 (주 1-2회)</SelectItem>
                        <SelectItem value="moderate" className="text-center">적당한 운동 (주 3-4회)</SelectItem>
                        <SelectItem value="heavy" className="text-center">활발한 운동 (주 5회 이상)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="sleep" className="text-sm font-bold">
                      평균 수면 시간
                    </Label>
                    <Select value={sleep} onValueChange={setSleep}>
                      <SelectTrigger className="text-center justify-center">
                        <SelectValue placeholder="평균 수면 시간을 선택해 주세요" className="text-center" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="less5" className="text-center">5시간 미만</SelectItem>
                        <SelectItem value="5to6" className="text-center">5-6시간</SelectItem>
                        <SelectItem value="6to7" className="text-center">6-7시간</SelectItem>
                        <SelectItem value="7to8" className="text-center">7-8시간</SelectItem>
                        <SelectItem value="more8" className="text-center">8시간 초과</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="occupation" className="text-sm font-bold">
                      직업
                    </Label>
                    <Input
                      id="occupation"
                      value={occupation}
                      onChange={(e) => handleFieldChange('occupation', e.target.value)}
                      placeholder="예: 사무직, 학생, 자영업 등"
                      className="text-center placeholder:text-center"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="workStyle" className="text-sm font-bold">
                      근무 형태
                    </Label>
                    <Select value={workStyle} onValueChange={setWorkStyle}>
                      <SelectTrigger className="text-center justify-center">
                        <SelectValue placeholder="근무 형태를 선택해 주세요" className="text-center" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sitting" className="text-center">주로 앉아서 근무</SelectItem>
                        <SelectItem value="standing" className="text-center">주로 서서 근무</SelectItem>
                        <SelectItem value="moving" className="text-center">활동이 많은 근무</SelectItem>
                        <SelectItem value="mixed" className="text-center">복합적</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="diet" className="text-sm font-bold">
                      식사 형태
                    </Label>
                    <Select value={diet} onValueChange={setDiet}>
                      <SelectTrigger className="text-center justify-center">
                        <SelectValue placeholder="주로 어떤 음식을 드시나요?" className="text-center" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="balanced" className="text-center">균형 잡힌 식단</SelectItem>
                        <SelectItem value="meat" className="text-center">육류 위주</SelectItem>
                        <SelectItem value="fish" className="text-center">생선 위주</SelectItem>
                        <SelectItem value="vegetable" className="text-center">채식 위주</SelectItem>
                        <SelectItem value="instant" className="text-center">인스턴트 위주</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="mealRegularity" className="text-sm font-bold">
                      식사 규칙성
                    </Label>
                    <Select value={mealRegularity} onValueChange={setMealRegularity}>
                      <SelectTrigger className="text-center justify-center">
                        <SelectValue placeholder="식사는 규칙적으로 하시나요?" className="text-center" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="regular" className="text-center">규칙적</SelectItem>
                        <SelectItem value="mostly" className="text-center">대체로 규칙적</SelectItem>
                        <SelectItem value="irregular" className="text-center">불규칙적</SelectItem>
                        <SelectItem value="very-irregular" className="text-center">매우 불규칙적</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="border-t border-gray-200 pt-6">
            <TooltipProvider delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={saveHealthInfo}
                      disabled={!isLoggedIn || isSaving}
                      className={cn(
                        "flex items-center gap-2 h-9 px-4",
                        isLoggedIn 
                          ? "bg-[#0B4619] hover:bg-[#083613] text-white border-[#0B4619]" 
                          : "opacity-50 cursor-not-allowed"
                      )}
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>저장 중...</span>
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          <span>현재 정보 저장하기</span>
                        </>
                      )}
                    </Button>
                  </div>
                </TooltipTrigger>
                <TooltipContent 
                  side="top"
                  align="start"
                  className="bg-[#333] text-white border-none px-3 py-1.5" 
                  sideOffset={5}
                >
                  <p className="text-sm font-pretendard">
                    {!isLoggedIn 
                      ? "로그인한 사용자만 이용 가능합니다" 
                      : "입력한 정보를 나중에 다시 불러올 수 있습니다"
                    }
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="pt-4">
            <Button
              onClick={onSubmit}
              disabled={isLoading}
              className="w-full bg-[#0B4619] hover:bg-[#083613] text-white font-medium py-6 text-lg"
            >
              {isLoading ? "분석 중..." : "유사 건강 정보 확인하기"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// BMI 상태 반환 함수
function getBmiStatus(bmi: number): string {
  if (bmi < 18.5) return '저체중';
  if (bmi < 23) return '정상';
  if (bmi < 25) return '과체중';
  if (bmi < 30) return '비만';
  return '고도비만';
} 