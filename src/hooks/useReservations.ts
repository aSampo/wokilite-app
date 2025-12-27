import { useQuery } from '@tanstack/react-query';
import { getReservations, type GetReservationsParams } from '@/lib/api/reservations';

export function useReservations(params: GetReservationsParams) {
  return useQuery({
    queryKey: ['reservations', params.restaurantId, params.date, params.sectorId],
    queryFn: () => getReservations(params),
    enabled: !!params.restaurantId && !!params.date,
  });
}

