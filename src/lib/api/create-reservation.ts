import { apiClient } from "./client";

export interface Customer {
  name: string;
  phone: string;
  email: string;
}

export interface CreateReservationRequest {
  restaurantId: string;
  sectorId: string;
  partySize: number;
  startDateTimeISO: string;
  customer: Customer;
  notes?: string;
}

export interface CreateReservationResponse {
  id: string;
  restaurantId: string;
  sectorId: string;
  tableIds: string[];
  partySize: number;
  start: string;
  end: string;
  status: string;
  customer: Customer;
  createdAt: string;
  updatedAt: string;
}

export async function createReservation(
  data: CreateReservationRequest
): Promise<CreateReservationResponse> {
  const idempotencyKey = `${data.restaurantId}-${data.startDateTimeISO}-${Date.now()}`;

  return apiClient<CreateReservationResponse>("/reservations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Idempotency-Key": idempotencyKey,
    },
    body: JSON.stringify(data),
  });
}

