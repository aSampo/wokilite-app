import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getAvailability } from "@/lib/api/availability";
import { createReservation } from "@/lib/api/create-reservation";
import {
  generateRandomCustomer,
  generateRandomPartySize,
} from "@/lib/utils/random-data";
import type { Sector } from "@/lib/api/restaurants";

interface UseCreateRandomReservationParams {
  restaurantId: string;
  date: string;
  sectors: Sector[];
}

export function useCreateRandomReservation({
  restaurantId,
  date,
  sectors,
}: UseCreateRandomReservationParams) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      if (sectors.length === 0) {
        throw new Error("No hay sectores disponibles");
      }

      const partySize = generateRandomPartySize();
      const shuffledSectors = [...sectors].sort(() => Math.random() - 0.5);

      for (const sector of shuffledSectors) {
        try {
          const availability = await getAvailability({
            restaurantId,
            sectorId: sector.id,
            date,
            partySize,
          });

          const availableSlot = availability.slots.find(
            (slot) => slot.available
          );

          if (availableSlot) {
            const customer = generateRandomCustomer();

            const reservation = await createReservation({
              restaurantId,
              sectorId: sector.id,
              partySize,
              startDateTimeISO: availableSlot.start,
              customer,
              notes: "Reserva de prueba",
            });

            return {
              reservation,
              sectorName: sector.name,
            };
          }
        } catch (error) {
          continue;
        }
      }

      throw new Error(
        `No hay disponibilidad para ${partySize} personas en ningún sector. El restaurante está lleno para este día.`
      );
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["reservations"] });
      toast.success("Reserva creada exitosamente", {
        description: `${data.reservation.customer.name} - ${data.reservation.partySize} personas en ${data.sectorName}`,
      });
    },
    onError: (err: Error) => {
      toast.error("Error al crear reserva", {
        description: err.message,
      });
    },
  });

  return {
    createRandomReservation: mutation.mutate,
    isCreating: mutation.isPending,
  };
}
