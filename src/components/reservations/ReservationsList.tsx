"use client";

import { useReservations } from "@/hooks/useReservations";

interface ReservationsListProps {
  restaurantId: string;
  date: string;
}

export function ReservationsList({
  restaurantId,
  date,
}: ReservationsListProps) {
  const { data, isLoading, error } = useReservations({
    restaurantId,
    date,
  });

  if (isLoading) {
    return <div className="text-zinc-600">Cargando reservas...</div>;
  }

  if (error) {
    return (
      <div className="text-red-600">
        Error: {error instanceof Error ? error.message : "Error desconocido"}
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="space-y-4">
      {data.items.length > 0 && (
        <p className="text-zinc-600">Total de reservas: {data.items.length}</p>
      )}

      {data.items.length === 0 ? (
        <p className="text-zinc-500 italic">No hay reservas para este día</p>
      ) : (
        <div className="space-y-3">
          {data.items.map((reservation) => (
            <div
              key={reservation.id}
              className="border border-zinc-200 rounded-lg p-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-lg">
                    {reservation.customer.name}
                  </p>
                  <p className="text-zinc-600">
                    {reservation.partySize}{" "}
                    {reservation.partySize === 1 ? "persona" : "personas"}
                  </p>
                  <p className="text-sm text-zinc-500">
                    {new Date(reservation.start).toLocaleTimeString("es-AR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    -{" "}
                    {new Date(reservation.end).toLocaleTimeString("es-AR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-zinc-600">
                    {reservation.tableIds.length === 1 ? "Mesa" : "Mesas"}:{" "}
                    {reservation.tableIds.join(", ")}
                  </p>
                  <p className="text-xs text-zinc-500 mt-1">
                    {reservation.status}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

