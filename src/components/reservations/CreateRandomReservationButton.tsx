"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCreateRandomReservation } from "@/hooks/useCreateRandomReservation";
import type { Sector } from "@/lib/api/restaurants";

interface CreateRandomReservationButtonProps {
  restaurantId: string;
  date: string;
  sectors: Sector[];
}

export function CreateRandomReservationButton({
  restaurantId,
  date,
  sectors,
}: CreateRandomReservationButtonProps) {
  const { createRandomReservation, isCreating } = useCreateRandomReservation({
    restaurantId,
    date,
    sectors,
  });

  return (
    <Button
      onClick={() => createRandomReservation()}
      disabled={isCreating}
      size="sm"
      className="gap-2"
    >
      {isCreating ? (
        <>
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          Creando...
        </>
      ) : (
        <>
          <Plus className="h-4 w-4" />
          Crear Reserva de Prueba
        </>
      )}
    </Button>
  );
}
