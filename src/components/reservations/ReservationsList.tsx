"use client";

import { useState } from "react";
import { useReservations } from "@/hooks/useReservations";
import { SectorSection } from "./SectorSection";
import { ReservationsHeader } from "./ReservationsHeader";
import { EmptyReservationsMessage } from "./EmptyReservationsMessage";
import { LoadingState } from "./LoadingState";
import { ErrorState } from "./ErrorState";
import { useReservationsGrouping } from "@/hooks/useReservationsGrouping";
import { useReservationsTimeFiltering } from "@/hooks/useReservationsTimeFiltering";
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
  const [startTime, setStartTime] = useState<string | null>(null);
  const [endTime, setEndTime] = useState<string | null>(null);

  const { data, isLoading, error } = useReservations({
    restaurantId,
    date,
    sectorId: selectedSector || undefined,
  });

  const filteredReservations = useReservationsTimeFiltering({
    reservations: data?.items || [],
    startTime,
    endTime,
  });

  const { reservationsBySector } = useReservationsGrouping({
    date: data?.date || date,
    items: filteredReservations,
  });

  const getSectorName = (sectorId: string) => {
    return sectors.find((s) => s.id === sectorId)?.name || sectorId;
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  if (!data) {
    return null;
  }

  const sectorsToDisplay = selectedSector
    ? [selectedSector]
    : Object.keys(reservationsBySector).sort();

  const totalReservations = filteredReservations.length;
  const hasReservations = data.items.length > 0;

  return (
    <div className="space-y-6">
      <ReservationsHeader
        totalReservations={totalReservations}
        sectors={sectors}
        selectedSector={selectedSector}
        onSectorChange={setSelectedSector}
        reservations={data.items}
        startTime={startTime}
        endTime={endTime}
        onStartTimeChange={setStartTime}
        onEndTimeChange={setEndTime}
      />
      {filteredReservations.length === 0 ? (
        <EmptyReservationsMessage hasReservations={hasReservations} />
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
