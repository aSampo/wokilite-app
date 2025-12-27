import { apiClient } from './client';
import type { DayReservationsResponse } from '@/types/api.types';

export interface GetReservationsParams {
  restaurantId: string;
  date: string;
  sectorId?: string;
}

export async function getReservations(
  params: GetReservationsParams
): Promise<DayReservationsResponse> {
  const searchParams = new URLSearchParams({
    restaurantId: params.restaurantId,
    date: params.date,
  });

  if (params.sectorId) {
    searchParams.append('sectorId', params.sectorId);
  }

  return apiClient<DayReservationsResponse>(
    `/reservations/day?${searchParams.toString()}`
  );
}

