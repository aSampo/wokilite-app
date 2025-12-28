import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteReservation } from "@/lib/api/delete-reservation";

export function useDeleteReservation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reservationId: string) => deleteReservation(reservationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reservations"] });
      toast.success("Reserva eliminada", {
        description: "La reserva ha sido cancelada exitosamente",
      });
    },
    onError: (error: Error) => {
      toast.error("Error al eliminar reserva", {
        description: error.message,
      });
    },
  });
}
