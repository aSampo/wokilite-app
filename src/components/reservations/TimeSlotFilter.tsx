"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { extractTimeFromISO } from "@/lib/utils/time-format";
import type { ReservationItem } from "@/types/api.types";

interface TimeSlotFilterProps {
  reservations: ReservationItem[];
  startTime: string | null;
  endTime: string | null;
  onStartTimeChange: (time: string | null) => void;
  onEndTimeChange: (time: string | null) => void;
}

function extractTimeSlots(reservations: ReservationItem[]): string[] {
  const timesSet = new Set<string>();

  reservations.forEach((reservation) => {
    const startTime = extractTimeFromISO(reservation.start);
    timesSet.add(startTime);
  });

  return Array.from(timesSet).sort();
}

export function TimeSlotFilter({
  reservations,
  startTime,
  endTime,
  onStartTimeChange,
  onEndTimeChange,
}: TimeSlotFilterProps) {
  const availableSlots = extractTimeSlots(reservations);

  if (availableSlots.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <Select
        value={startTime || "all"}
        onValueChange={(value) =>
          onStartTimeChange(value === "all" ? null : value)
        }
      >
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Desde" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Desde (todas)</SelectItem>
          {availableSlots.map((time) => (
            <SelectItem key={time} value={time}>
              {time}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <span className="text-zinc-400">-</span>

      <Select
        value={endTime || "all"}
        onValueChange={(value) =>
          onEndTimeChange(value === "all" ? null : value)
        }
      >
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Hasta" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Hasta (todas)</SelectItem>
          {availableSlots.map((time) => (
            <SelectItem key={time} value={time}>
              {time}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {(startTime || endTime) && (
        <button
          onClick={() => {
            onStartTimeChange(null);
            onEndTimeChange(null);
          }}
          className="text-xs text-zinc-500 hover:text-zinc-700 underline ml-2"
        >
          Limpiar
        </button>
      )}
    </div>
  );
}
