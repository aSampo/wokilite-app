import { useMemo } from "react";
import type {
  DayReservationsResponse,
  ReservationItem,
} from "@/types/api.types";

export function useReservationsGrouping(
  data: DayReservationsResponse | undefined
) {
  return useMemo(() => {
    if (!data) {
      return {
        sectorIds: [],
        reservationsBySector: {},
      };
    }

    const uniqueSectorIds = Array.from(
      new Set(data.items.map((r) => r.sectorId))
    ).sort();

    const grouped = data.items.reduce((acc, reservation) => {
      const sectorId = reservation.sectorId;
      if (!acc[sectorId]) {
        acc[sectorId] = [];
      }
      acc[sectorId].push(reservation);
      return acc;
    }, {} as Record<string, ReservationItem[]>);

    return {
      sectorIds: uniqueSectorIds,
      reservationsBySector: grouped,
    };
  }, [data]);
}
