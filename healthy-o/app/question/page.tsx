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
import { Save, Download, Loader2, Stethoscope, User, Ruler, Activity, HeartPulse, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from '@/hooks/useAuth';
import {
  GENDER_OPTIONS,
  SMOKING_OPTIONS,
  DRINKING_OPTIONS,
  EXERCISE_OPTIONS,
  SLEEP_OPTIONS,
  WORK_STYLE_OPTIONS,
  DIET_OPTIONS,
  MEAL_REGULARITY_OPTIONS,
  getKeyByValue
} from '@/lib/constants';

export default function QuestionPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { isLoggedIn } = useAuth();
  const toastShown = useRef(false);
  const fetchedRef = useRef(false);
  const [isChecked, setIsChecked] = useState(false);
  const [hasPreviousData, setHasPreviousData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
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
  const [highlightedFields, setHighlightedFields] = useState<string[]>([]);

  // 폼 데이터 상태
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    bmi: '',
    mainSymptoms: '',
    symptomDuration: '',
    chronicDiseases: '',
    medications: '',
    smoking: '',
    drinking: '',
    exercise: '',
    sleep: '',
    occupation: '',
    workStyle: '',
    diet: '',
    mealRegularity: ''
  });

  // 에러 메시지를 한글로 변환하는 함수
  const getKoreanErrorMessage = (error: any): string => {
    if (typeof error === 'string') {
      // JSON 파싱 에러
      if (error.includes('Unexpected token') || error.includes('SyntaxError')) {
        return '서버에서 잘못된 응답을 받았습니다. 잠시 후 다시 시도해주세요.';
      }
      // 네트워크 에러
      if (error.includes('Failed to fetch') || error.includes('NetworkError')) {
        return '네트워크 연결을 확인해주세요.';
      }
      // 기타 에러
      return error;
    }
    
    if (error instanceof Error) {
      if (error.message.includes('Unexpected token') || error.message.includes('SyntaxError')) {
        return '서버에서 잘못된 응답을 받았습니다. 잠시 후 다시 시도해주세요.';
      }
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        return '네트워크 연결을 확인해주세요.';
      }
      return error.message;
    }
    
    return '알 수 없는 오류가 발생했습니다.';
  };

  // BMI 자동 계산
  useEffect(() => {
    if (height && weight) {
      const heightInMeter = Number(height) / 100;
      const weightInKg = Number(weight);
      if (heightInMeter > 0 && weightInKg > 0) {
        const bmiValue = (weightInKg / (heightInMeter * heightInMeter)).toFixed(1);
        setBmi(bmiValue);
        setFormData(prev => ({
          ...prev,
          bmi: bmiValue
        }));
      }
    } else {
      setBmi('');
      setFormData(prev => ({
        ...prev,
        bmi: ''
      }));
    }
  }, [height, weight]);

  useEffect(() => {
    toast({
      title: "개인정보 보호 안내",
      description: "사용자가 입력한 개인 건강 정보는 본 서비스 이용에만 사용됩니다.",
      duration: 5000,
    });
  }, []);

  // 로그인 상태 체크 및 실시간 업데이트
  useEffect(() => {
    const checkLoginStatus = async () => {
      if (isLoggedIn && !isChecked && !fetchedRef.current) {
        fetchedRef.current = true;
        await checkPreviousData();
        setIsChecked(true);
      }
    };

    checkLoginStatus();
  }, [isLoggedIn]);

  // 이전 데이터 존재 여부만 확인하는 함수
  const checkPreviousData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('[Question Page] No token found');
        return;
      }

      const response = await fetch('/api/health-info', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.data) {
          console.log('[Question Page] Found previous data');
          setHasPreviousData(true);
          if (!toastShown.current) {
            toastShown.current = true;
            toast({
              title: "이전에 입력한 정보가 있습니다.",
              description: (
                <div className="flex items-center gap-2">
                  <button
                    onClick={loadHealthInfo}
                    className="text-[#0B4619] underline font-medium mt-1 text-sm"
                  >
                    <Download className="w-4 h-4 inline-block mr-1" />
                    불러오기
                  </button>
                </div>
              ),
              duration: 0,
            });
          }
        }
      }
    } catch (error) {
      console.error('[Question Page] Error checking previous data:', error);
    }
  };

  // 건강 정보 불러오기 함수
  const loadHealthInfo = async () => {
    try {
      if (!isLoggedIn) {
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
          duration: 3000,
        });
        return;
      }

      const token = localStorage.getItem('token');
      const response = await fetch('/api/health-info', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
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
            duration: 3000,
          });
          return;
        }

        if (response.status === 404) {
          toast({
            title: "저장된 건강 정보가 없습니다.",
            duration: 3000,
          });
          return;
        }

        throw new Error('불러오기 실패');
      }

      const result = await response.json();
      const data = result.data;
      
      if (!data) {
        throw new Error('데이터가 존재하지 않습니다.');
      }

      // 모든 상태를 한 번에 업데이트
      const newFormData = {
        name: data.name || '',
        age: data.age?.toString() || '',
        gender: data.gender === 'MALE' ? '남성' : data.gender === 'FEMALE' ? '여성' : '',
        height: data.height?.toString() || '',
        weight: data.weight?.toString() || '',
        bmi: data.bmi?.toString() || '',
        mainSymptoms: '',  // 이전 증상은 새로 입력받아야 함
        symptomDuration: '', // 이전 증상 기간도 새로 입력받아야 함
        chronicDiseases: data.chronicDiseases || '',
        medications: data.medications || '',
        smoking: data.smoking === 'NON' ? '비흡연' :
                 data.smoking === 'ACTIVE' ? '흡연' : 
                 data.smoking === 'QUIT' ? '금연' : '',
        drinking: data.drinking === 'NON' ? '비음주' :
                  data.drinking === 'LIGHT' ? '주 1-2회' :
                  data.drinking === 'MODERATE' ? '주 3-4회' : 
                  data.drinking === 'HEAVY' ? '주 5회 이상' : '',
        exercise: data.exercise === 'NONE' ? '거의 안 함' :
                  data.exercise === 'LIGHT' ? '가벼운 운동 (주 1-2회)' :
                  data.exercise === 'MODERATE' ? '적당한 운동 (주 3-4회)' : 
                  data.exercise === 'HEAVY' ? '활발한 운동 (주 5회 이상)' : '',
        sleep: data.sleep === 'LESS_5' ? '5시간 미만' :
               data.sleep === '5_TO_6' ? '5-6시간' :
               data.sleep === '6_TO_7' ? '6-7시간' :
               data.sleep === '7_TO_8' ? '7-8시간' : 
               data.sleep === 'MORE_8' ? '8시간 초과' : '',
        occupation: data.occupation || '',
        workStyle: data.workStyle === 'SITTING' ? '주로 앉아서 근무' :
                   data.workStyle === 'STANDING' ? '주로 서서 근무' :
                   data.workStyle === 'ACTIVE' ? '활동이 많은 근무' : 
                   data.workStyle === 'MIXED' ? '복합적' : '',
        diet: data.diet === 'BALANCED' ? '균형 잡힌 식단' :
               data.diet === 'MEAT' ? '육류 위주' :
               data.diet === 'FISH' ? '생선 위주' :
               data.diet === 'VEGGIE' ? '채식 위주' : 
               data.diet === 'INSTANT' ? '인스턴트 위주' : '',
        mealRegularity: data.mealRegularity === 'REGULAR' ? '규칙적' :
                         data.mealRegularity === 'MOSTLY' ? '대체로 규칙적' :
                         data.mealRegularity === 'IRREGULAR' ? '불규칙적' : 
                         data.mealRegularity === 'VERY_IRREGULAR' ? '매우 불규칙적' : ''
      };

      // formData 상태 업데이트
      setFormData(newFormData);

      toast({
        title: "건강 정보를 불러왔습니다.",
        description: "주요 증상과 증상 발생 시기는 새로 입력해 주세요.",
        duration: 5000,
      });
    } catch (error) {
      console.error('[Question Page] Error loading health info:', error);
      toast({
        title: "건강 정보 불러오기에 실패했습니다.",
        description: getKoreanErrorMessage(error),
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  // formData가 변경될 때마다 각각의 상태를 업데이트
  useEffect(() => {
    setName(formData.name);
    setAge(formData.age);
    setGender(formData.gender);
    setHeight(formData.height);
    setWeight(formData.weight);
    setBmi(formData.bmi);
    setChronicDiseases(formData.chronicDiseases);
    setMedications(formData.medications);
    setSmoking(formData.smoking);
    setDrinking(formData.drinking);
    setExercise(formData.exercise);
    setSleep(formData.sleep);
    setOccupation(formData.occupation);
    setWorkStyle(formData.workStyle);
    setDiet(formData.diet);
    setMealRegularity(formData.mealRegularity);
  }, [formData]);

  // 필드 값이 변경될 때 하이라이트 제거
  const handleFieldChange = (fieldId: string, value: string) => {
    if (value) {
      setHighlightedFields(prev => prev.filter(id => id !== fieldId));
    }
    
    // formData 업데이트
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }));

    // 개별 상태 업데이트
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

      // 새로운 분석 시작 시 이전 데이터 삭제
      localStorage.removeItem('diagnosis_result');
      localStorage.removeItem('analysis_status');
      localStorage.removeItem('analysis_data');
      localStorage.removeItem('analysis_error');

      // 분석 상태를 pending으로 설정
      localStorage.setItem('analysis_status', 'pending');
      localStorage.setItem('analysis_data', JSON.stringify(formData));
      
      // 바로 Result 페이지로 이동
      router.push('/result');

      // 백그라운드에서 분석 진행
      const processAnalysis = async () => {
        try {
          let diagnosisId: number | null = null;

          if (isLoggedIn) {
            // 로그인 사용자: DB에 저장
            const response = await fetch('/api/question/submit', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
              },
              body: JSON.stringify(formData)
            });

            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.message || '설문 제출에 실패했습니다.');
            }

            const result = await response.json();
            diagnosisId = result.diagnosisId;
            
            // 새로운 설문 제출 시 병원 페이지 캐시 클리어
            if (result.clearHospitalCache) {
              localStorage.removeItem('cached_hospitals');
              localStorage.removeItem('cached_department');
              localStorage.removeItem('hospitals_cache_timestamp');
              console.log('[Question Page] Hospital cache cleared due to new diagnosis');
            }

            if (!diagnosisId || typeof diagnosisId !== 'number') {
              throw new Error('진단 ID가 올바르지 않습니다.');
            }
          }

          // AI 분석 요청
          const requestBody = {
            data: formData,
            ...(isLoggedIn && diagnosisId ? { diagnosisId } : {})
          };

          console.log('[Question Page] Sending request:', JSON.stringify(requestBody, null, 2));

          const diagnosisResponse = await fetch('/api/health/diagnosis', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              ...(isLoggedIn ? { 'Authorization': `Bearer ${localStorage.getItem('token')}` } : {})
            },
            body: JSON.stringify(requestBody)
          });

          const responseData = await diagnosisResponse.json();
          
          if (!diagnosisResponse.ok) {
            console.error('[Question Page] API Error:', {
              status: diagnosisResponse.status,
              statusText: diagnosisResponse.statusText,
              response: responseData
            });
            throw new Error(responseData.message || 'AI 분석에 실패했습니다.');
          }

          if (!responseData.success) {
            console.error('[Question Page] Analysis Failed:', responseData);
            throw new Error(responseData.message || 'AI 분석 결과가 올바르지 않습니다.');
          }

          // diagnosis_id 쿠키 설정
          const expirationDate = new Date();
          expirationDate.setHours(expirationDate.getHours() + 1);
          
          if (isLoggedIn && diagnosisId) {
            document.cookie = `diagnosis_id=${diagnosisId}; path=/; expires=${expirationDate.toUTCString()}; SameSite=Lax`;
          } else if (!isLoggedIn && responseData.data?.tempDiagnosisId) {
            document.cookie = `diagnosis_id=${responseData.data.tempDiagnosisId}; path=/; expires=${expirationDate.toUTCString()}; SameSite=Lax`;
          }

          // 분석 결과 저장
          localStorage.setItem('diagnosis_result', JSON.stringify(responseData.data));
          localStorage.setItem('analysis_status', 'completed');

          console.log('[Question Page] Analysis successful:', responseData);
        } catch (error) {
          console.error('[Question Page] Error:', error);
          localStorage.setItem('analysis_status', 'error');
          localStorage.setItem('analysis_error', error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.');
        }
      };

      // 백그라운드에서 분석 시작
      processAnalysis();
    } catch (error) {
      console.error('[Question Page] Error:', error);
      toast({
        title: "제출 중 오류가 발생했습니다.",
        description: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.',
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 건강 정보 저장 함수
  const saveHealthInfo = async () => {
    console.log('[Question Page] saveHealthInfo called:', { 
      isLoggedIn, 
      isSaving, 
      timestamp: new Date().toLocaleTimeString() 
    });
    
    if (!isLoggedIn) {
      console.log('[Question Page] Save blocked - user not logged in');
      toast({
        title: "로그인이 필요합니다.",
        description: "로그인한 사용자만 정보를 저장할 수 있습니다.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    console.log('[Question Page] Starting save process...');
    try {
      setIsSaving(true);
      const healthData = {
        name,
        age: Number(age),
        gender: gender === '남성' ? 'MALE' : gender === '여성' ? 'FEMALE' : '',
        height: Number(height),
        weight: Number(weight),
        bmi: Number(bmi),
        chronicDiseases: chronicDiseases || '',
        medications: medications || '',
        smoking: smoking ? (
          smoking === '비흡연' ? 'NON' : 
          smoking === '흡연' ? 'ACTIVE' : 
          smoking === '금연' ? 'QUIT' : ''
        ) : '',
        drinking: drinking ? (
          drinking === '비음주' ? 'NON' : 
          drinking === '주 1-2회' ? 'LIGHT' : 
          drinking === '주 3-4회' ? 'MODERATE' : 
          drinking === '주 5회 이상' ? 'HEAVY' : ''
        ) : '',
        exercise: exercise ? (
          exercise === '거의 안 함' ? 'NONE' : 
          exercise === '가벼운 운동 (주 1-2회)' ? 'LIGHT' : 
          exercise === '적당한 운동 (주 3-4회)' ? 'MODERATE' : 
          exercise === '활발한 운동 (주 5회 이상)' ? 'HEAVY' : ''
        ) : '',
        sleep: sleep ? (
          sleep === '5시간 미만' ? 'LESS_5' : 
          sleep === '5-6시간' ? '5_TO_6' : 
          sleep === '6-7시간' ? '6_TO_7' : 
          sleep === '7-8시간' ? '7_TO_8' : 
          sleep === '8시간 초과' ? 'MORE_8' : ''
        ) : '',
        occupation: occupation || '',
        workStyle: workStyle ? (
          workStyle === '주로 앉아서 근무' ? 'SITTING' : 
          workStyle === '주로 서서 근무' ? 'STANDING' : 
          workStyle === '활동이 많은 근무' ? 'ACTIVE' : 
          workStyle === '복합적' ? 'MIXED' : ''
        ) : '',
        diet: diet ? (
          diet === '균형 잡힌 식단' ? 'BALANCED' : 
          diet === '육류 위주' ? 'MEAT' : 
          diet === '생선 위주' ? 'FISH' : 
          diet === '채식 위주' ? 'VEGGIE' : 
          diet === '인스턴트 위주' ? 'INSTANT' : ''
        ) : '',
        mealRegularity: mealRegularity ? (
          mealRegularity === '규칙적' ? 'REGULAR' : 
          mealRegularity === '대체로 규칙적' ? 'MOSTLY' : 
          mealRegularity === '불규칙적' ? 'IRREGULAR' : 
          mealRegularity === '매우 불규칙적' ? 'VERY_IRREGULAR' : ''
        ) : ''
      };

      console.log('[Question Page] Saving health data:', healthData);

      const response = await fetch('/api/health-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(healthData)
      });

      let result;
      try {
        result = await response.json();
      } catch (jsonError) {
        throw new Error('서버에서 잘못된 응답을 받았습니다.');
      }

      if (!response.ok) {
        throw new Error(result?.error || result?.message || '저장 실패');
      }

      toast({
        title: "건강 정보가 저장되었습니다.",
        duration: 3000,
      });
      console.log('[Question Page] Save successful');
    } catch (error) {
      console.error('[Question Page] Save failed:', error);
      toast({
        title: "건강 정보 저장에 실패했습니다.",
        description: getKoreanErrorMessage(error),
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsSaving(false);
      console.log('[Question Page] Save process completed');
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
          </div>
        </CardHeader>

        <CardContent className="space-y-8">
          <div className="bg-gray-50 p-6 rounded-lg space-y-6 border border-gray-200 shadow-sm">
            <h3 className="font-bold text-lg text-[#0B4619]">
              <User className="w-5 h-5 inline-block mb-1 mr-2" />
              기본 정보
            </h3>
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
                <Select 
                  value={formData.gender} 
                  onValueChange={(value) => handleFieldChange('gender', value)}
                >
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
            <h3 className="font-bold text-lg text-[#0B4619]">
              <Ruler className="w-5 h-5 inline-block mb-1 mr-2" />
              신체 정보
            </h3>
            
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
            <h3 className="font-bold text-lg text-[#0B4619]">
              <HeartPulse className="w-5 h-5 inline-block mb-1 mr-2" />
              건강 정보
            </h3>
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
                  <Select 
                    value={formData.smoking} 
                    onValueChange={(value) => handleFieldChange('smoking', value)}
                  >
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
                  <Select 
                    value={formData.drinking} 
                    onValueChange={(value) => handleFieldChange('drinking', value)}
                  >
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
            <h3 className="font-bold text-lg text-[#0B4619]">
              <Activity className="w-5 h-5 inline-block mb-1 mr-2" />
              주요 증상
            </h3>
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
                  <span className="text-lg font-bold text-[#0B4619]">
                    <Leaf className="w-5 h-5 inline-block mb-1 mr-2" />
                    생활 습관 정보
                  </span>
                  <span className="text-sm text-gray-500">(선택사항)</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <Label htmlFor="exercise" className="text-sm font-bold">
                      운동 빈도
                    </Label>
                    <Select 
                      value={formData.exercise} 
                      onValueChange={(value) => handleFieldChange('exercise', value)}
                    >
                      <SelectTrigger className="text-center justify-center">
                        <SelectValue placeholder="운동 빈도를 선택해 주세요" className="text-center" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="거의 안 함" className="text-center">거의 안 함</SelectItem>
                        <SelectItem value="가벼운 운동 (주 1-2회)" className="text-center">가벼운 운동 (주 1-2회)</SelectItem>
                        <SelectItem value="적당한 운동 (주 3-4회)" className="text-center">적당한 운동 (주 3-4회)</SelectItem>
                        <SelectItem value="활발한 운동 (주 5회 이상)" className="text-center">활발한 운동 (주 5회 이상)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="sleep" className="text-sm font-bold">
                      평균 수면 시간
                    </Label>
                    <Select 
                      value={formData.sleep} 
                      onValueChange={(value) => handleFieldChange('sleep', value)}
                    >
                      <SelectTrigger className="text-center justify-center">
                        <SelectValue placeholder="평균 수면 시간을 선택해 주세요" className="text-center" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5시간 미만" className="text-center">5시간 미만</SelectItem>
                        <SelectItem value="5-6시간" className="text-center">5-6시간</SelectItem>
                        <SelectItem value="6-7시간" className="text-center">6-7시간</SelectItem>
                        <SelectItem value="7-8시간" className="text-center">7-8시간</SelectItem>
                        <SelectItem value="8시간 초과" className="text-center">8시간 초과</SelectItem>
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
                    <Select 
                      value={formData.workStyle} 
                      onValueChange={(value) => handleFieldChange('workStyle', value)}
                    >
                      <SelectTrigger className="text-center justify-center">
                        <SelectValue placeholder="근무 형태를 선택해 주세요" className="text-center" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="주로 앉아서 근무" className="text-center">주로 앉아서 근무</SelectItem>
                        <SelectItem value="주로 서서 근무" className="text-center">주로 서서 근무</SelectItem>
                        <SelectItem value="활동이 많은 근무" className="text-center">활동이 많은 근무</SelectItem>
                        <SelectItem value="복합적" className="text-center">복합적</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="diet" className="text-sm font-bold">
                      식사 형태
                    </Label>
                    <Select 
                      value={formData.diet} 
                      onValueChange={(value) => handleFieldChange('diet', value)}
                    >
                      <SelectTrigger className="text-center justify-center">
                        <SelectValue placeholder="주로 어떤 음식을 드시나요?" className="text-center" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="균형 잡힌 식단" className="text-center">균형 잡힌 식단</SelectItem>
                        <SelectItem value="육류 위주" className="text-center">육류 위주</SelectItem>
                        <SelectItem value="생선 위주" className="text-center">생선 위주</SelectItem>
                        <SelectItem value="채식 위주" className="text-center">채식 위주</SelectItem>
                        <SelectItem value="인스턴트 위주" className="text-center">인스턴트 위주</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="mealRegularity" className="text-sm font-bold">
                      식사 규칙성
                    </Label>
                    <Select 
                      value={formData.mealRegularity} 
                      onValueChange={(value) => handleFieldChange('mealRegularity', value)}
                    >
                      <SelectTrigger className="text-center justify-center">
                        <SelectValue placeholder="식사는 규칙적으로 하시나요?" className="text-center" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="규칙적" className="text-center">규칙적</SelectItem>
                        <SelectItem value="대체로 규칙적" className="text-center">대체로 규칙적</SelectItem>
                        <SelectItem value="불규칙적" className="text-center">불규칙적</SelectItem>
                        <SelectItem value="매우 불규칙적" className="text-center">매우 불규칙적</SelectItem>
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
                      onClick={() => {
                        console.log('[Question Page] Save button clicked:', { 
                          isLoggedIn, 
                          isSaving, 
                          timestamp: new Date().toLocaleTimeString() 
                        });
                        saveHealthInfo();
                      }}
                      disabled={!isLoggedIn || isSaving}
                      className={cn(
                        "flex items-center gap-2 h-9 px-4",
                        isLoggedIn 
                          ? "bg-[#0B4619] hover:bg-[#083613] text-white border-[#0B4619]" 
                          : "opacity-50 cursor-not-allowed bg-gray-300 text-gray-500 border-gray-300"
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
                {!isLoggedIn && (
                  <TooltipContent 
                    side="top"
                    align="start"
                    className="bg-[#333] text-white border-none px-3 py-1.5" 
                    sideOffset={5}
                  >
                    <p className="text-sm font-pretendard">
                      로그인한 사용자만 이용 가능합니다
                    </p>
                  </TooltipContent>
                )}
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