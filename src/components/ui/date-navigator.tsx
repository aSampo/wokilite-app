"use client";

import { addDays, subDays } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";

interface DateNavigatorProps {
  date: Date;
  onDateChange: (date: Date) => void;
}

export function DateNavigator({ date, onDateChange }: DateNavigatorProps) {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onDateChange(subDays(date, 1))}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <DatePicker
        date={date}
        onDateChange={(newDate) => newDate && onDateChange(newDate)}
      />
      <Button
        variant="outline"
        size="icon"
        onClick={() => onDateChange(addDays(date, 1))}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
