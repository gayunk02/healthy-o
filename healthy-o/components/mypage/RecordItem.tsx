'use client';

import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface RecordItemProps {
  number: string;
  date: string;
  title: string;
  suffix?: string;
  tags?: string[];
  onClick: () => void;
}

export function RecordItem({ number, date, title, suffix, tags, onClick }: RecordItemProps) {
  return (
    <div 
      onClick={onClick}
      className="flex items-center justify-between py-4 px-4 bg-white rounded-lg hover:bg-gray-50 cursor-pointer border border-gray-200"
    >
      <div className="flex items-center gap-5">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#0B4619]/10">
          <span className="text-[#0B4619] font-bold text-base">{number}</span>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-gray-800">{date}</span>
            {tags && tags.map((tag, index) => (
              <Badge 
                key={index}
                variant="outline" 
                className="text-xs px-2 py-1 bg-[#0B4619]/5 text-[#0B4619] border-[#0B4619]/20"
              >
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex items-center gap-1 text-sm">
            <span className="text-gray-700 font-medium">{title}</span>
            {suffix && <span className="text-gray-500 ml-1">{suffix}</span>}
          </div>
        </div>
      </div>
      <ArrowRight className="w-4 h-4 text-[#0B4619]" />
    </div>
  );
}