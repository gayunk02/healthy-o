import { DateRange } from "react-day-picker";
import { DiagnosisRecord, HospitalRecord, SupplementRecord } from "@/types/records";

export const filterByDate = (date: string, dateRange: DateRange | undefined) => {
  if (!dateRange?.from || !dateRange?.to) return true;
  
  const recordDate = new Date(date);
  const fromDate = new Date(dateRange.from);
  const toDate = new Date(dateRange.to);
  
  // 시작일은 00:00:00으로, 종료일은 23:59:59로 설정
  fromDate.setHours(0, 0, 0, 0);
  toDate.setHours(23, 59, 59, 999);
  
  return recordDate >= fromDate && recordDate <= toDate;
};

export const filterBySearch = (
  item: DiagnosisRecord | HospitalRecord | SupplementRecord,
  query: string,
  type: 'health' | 'hospital' | 'supplement'
) => {
  if (!query || !item) return true;
  const searchQuery = query.toLowerCase();
  
  try {
  if (type === 'health') {
    const record = item as DiagnosisRecord;
      if (!record.diseases) return false;
      return record.diseases.some(disease => {
        if (!disease) return false;
        const nameMatch = disease.diseaseName?.toLowerCase().includes(searchQuery) || false;
        const symptomMatch = Array.isArray(disease.mainSymptoms) && 
      disease.mainSymptoms.some(symptom => 
            symptom?.toLowerCase().includes(searchQuery)
    );
        return nameMatch || symptomMatch;
      });
  } else if (type === 'hospital') {
    const record = item as HospitalRecord;
      const deptMatch = record.recommendedDepartment?.toLowerCase().includes(searchQuery) || false;
      const hospitalMatch = Array.isArray(record.hospitals) && 
        record.hospitals.some(h => h?.name?.toLowerCase().includes(searchQuery));
      return deptMatch || hospitalMatch;
  } else {
    const record = item as SupplementRecord;
      if (!Array.isArray(record.supplements)) return false;
      return record.supplements.some(s => 
        s?.supplementName?.toLowerCase().includes(searchQuery)
      );
    }
  } catch (error) {
    console.error('Filter search error:', error);
    return false;
  }
}; 