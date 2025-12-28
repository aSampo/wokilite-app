interface EmptyReservationsMessageProps {
  hasReservations: boolean;
}

export function EmptyReservationsMessage({
  hasReservations,
}: EmptyReservationsMessageProps) {
  return (
    <p className="text-zinc-500 italic">
      {hasReservations
        ? "No hay reservas en el rango horario seleccionado"
        : "No hay reservas para este día"}
    </p>
  );
}

