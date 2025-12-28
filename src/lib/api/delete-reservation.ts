import { apiClient } from "./client";

export async function deleteReservation(reservationId: string): Promise<void> {
  return apiClient<void>(`/reservations/${reservationId}`, {
    method: "DELETE",
  });
}
