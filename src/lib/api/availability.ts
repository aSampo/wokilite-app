import { apiClient } from "./client";

export interface AvailabilitySlot {
  start: string;
  available: boolean;
  tables?: string[];
  reason?: string;
}

export interface AvailabilityResponse {
  slotMinutes: number;
  durationMinutes: number;
  slots: AvailabilitySlot[];
}

export interface GetAvailabilityParams {
  restaurantId: string;
  sectorId: string;
  date: string;
  partySize: number;
}

export async function getAvailability(
  params: GetAvailabilityParams
): Promise<AvailabilityResponse> {
  const searchParams = new URLSearchParams({
    restaurantId: params.restaurantId,
    sectorId: params.sectorId,
    date: params.date,
    partySize: params.partySize.toString(),
  });

  return apiClient<AvailabilityResponse>(
    `/availability?${searchParams.toString()}`
  );
}
