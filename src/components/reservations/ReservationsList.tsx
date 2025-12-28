"use client";

import { useState } from "react";
import { useReservations } from "@/hooks/useReservations";
import { SectorFilter } from "./SectorFilter";
import { SectorSection } from "./SectorSection";
import { useReservationsGrouping } from "@/hooks/useReservationsGrouping";
import type { Sector } from "@/lib/api/restaurants";

interface ReservationsListProps {
  restaurantId: string;
  date: string;
  sectors: Sector[];
}

export function ReservationsList({
  restaurantId,
  date,
  sectors,
}: ReservationsListProps) {
  const [selectedSector, setSelectedSector] = useState<string | null>(null);

  const { data, isLoading, error } = useReservations({
    restaurantId,
    date,
    sectorId: selectedSector || undefined,
  });

  const { reservationsBySector } = useReservationsGrouping(data);

  const getSectorName = (sectorId: string) => {
    return sectors.find((s) => s.id === sectorId)?.name || sectorId;
  };

  if (isLoading) {
    return <div className="text-zinc-600">Cargando reservas...</div>;
  }

  if (error) {
    return (
      <div className="text-red-600">
        Error: {error instanceof Error ? error.message : "Error desconocido"}
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const sectorsToDisplay = selectedSector
    ? [selectedSector]
    : Object.keys(reservationsBySector).sort();

  const totalReservations = data?.items.length || 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-zinc-600">Total de reservas: {totalReservations}</p>
        {sectors.length > 0 && (
          <SectorFilter
            sectors={sectors}
            selectedSector={selectedSector}
            onSectorChange={setSelectedSector}
          />
        )}
      </div>

      {data.items.length === 0 ? (
        <p className="text-zinc-500 italic">No hay reservas para este día</p>
      ) : (
        <div className="space-y-6">
          {sectorsToDisplay.map((sectorId) => (
            <SectorSection
              key={sectorId}
              sectorId={sectorId}
              sectorName={getSectorName(sectorId)}
              reservations={reservationsBySector[sectorId] || []}
            />
          ))}
        </div>
      )}
    </div>
  );
}
