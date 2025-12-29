import { useMemo } from "react";
import { extractTimeFromISO } from "@/lib/utils/time-format";
import type { ReservationItem } from "@/types/api.types";

interface UseReservationsTimeFilteringParams {
  reservations: ReservationItem[];
  startTime: string | null;
  endTime: string | null;
}

export function useReservationsTimeFiltering({
  reservations,
  startTime,
  endTime,
}: UseReservationsTimeFilteringParams) {
  return useMemo(() => {
    if (!startTime && !endTime) {
      return reservations;
    }

    return reservations.filter((reservation) => {
      const reservationStartTime = extractTimeFromISO(reservation.start);
      const reservationEndTime = extractTimeFromISO(reservation.end);

      if (startTime && endTime) {
        return (
          reservationStartTime >= startTime && reservationEndTime <= endTime
        );
      }

      if (startTime) {
        return reservationStartTime >= startTime;
      }

      if (endTime) {
        return reservationEndTime <= endTime;
      }

      return true;
    });
  }, [reservations, startTime, endTime]);
}
