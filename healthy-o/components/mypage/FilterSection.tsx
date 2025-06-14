"use client"

import { Button } from "@/components/ui/button"
import { RotateCcw, Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { DateRange } from "react-day-picker"
import { DatePickerWithRange } from "@/components/ui/date-picker-with-range"

interface FilterSectionProps {
  dateRange: DateRange | undefined;
  setDateRange: (date: DateRange | undefined) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onRefresh: () => Promise<void>;
}

export function FilterSection({
  dateRange,
  setDateRange,
  searchQuery,
  setSearchQuery,
  onRefresh,
}: FilterSectionProps) {
  const handleReset = async () => {
    setDateRange(undefined);
    setSearchQuery("");
    await onRefresh();
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg space-y-4 border border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-[#0B4619]/10 p-2 rounded-lg">
            <Filter className="w-5 h-5 text-[#0B4619]" />
          </div>
          <h3 className="font-bold text-lg text-[#0B4619]">검색 필터</h3>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <DatePickerWithRange date={dateRange} setDate={setDateRange} />
        </div>
        <div className="flex-1 relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="검색어를 입력하세요"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full bg-white border-gray-200 focus:border-[#0B4619] focus:ring-[#0B4619] transition-colors"
            />
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleReset}
          className="flex items-center gap-2 hover:bg-[#0B4619] hover:text-white transition-colors"
        >
          <RotateCcw className="h-4 w-4" />
          초기화
        </Button>
      </div>
    </div>
  );
} 