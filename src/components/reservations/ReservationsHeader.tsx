"use client";

import { SectorFilter } from "./SectorFilter";
import { TimeSlotFilter } from "./TimeSlotFilter";
import type { Sector } from "@/lib/api/restaurants";
import type { ReservationItem } from "@/types/api.types";

interface ReservationsHeaderProps {
  totalReservations: number;
  sectors: Sector[];
  selectedSector: string | null;
  onSectorChange: (sectorId: string | null) => void;
  reservations: ReservationItem[];
  startTime: string | null;
  endTime: string | null;
  onStartTimeChange: (time: string | null) => void;
  onEndTimeChange: (time: string | null) => void;
}

export function ReservationsHeader({
  totalReservations,
  sectors,
  selectedSector,
  onSectorChange,
  reservations,
  startTime,
  endTime,
  onStartTimeChange,
  onEndTimeChange,
}: ReservationsHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-zinc-600">Total de reservas: {totalReservations}</p>
      <div className="flex items-center gap-4">
        {sectors.length > 0 && (
          <SectorFilter
            sectors={sectors}
            selectedSector={selectedSector}
            onSectorChange={onSectorChange}
          />
        )}
        <TimeSlotFilter
          reservations={reservations}
          startTime={startTime}
          endTime={endTime}
          onStartTimeChange={onStartTimeChange}
          onEndTimeChange={onEndTimeChange}
        />
      </div>
    </div>
  );
}
