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
      const reservationTime = extractTimeFromISO(reservation.start);

      if (startTime && endTime) {
        return reservationTime >= startTime && reservationTime < endTime;
      }

      if (startTime) {
        return reservationTime >= startTime;
      }

      if (endTime) {
        return reservationTime < endTime;
      }

      return true;
    });
  }, [reservations, startTime, endTime]);
}
