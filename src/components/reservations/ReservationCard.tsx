import type { ReservationItem } from "@/types/api.types";

interface ReservationCardProps {
  reservation: ReservationItem;
}

export function ReservationCard({ reservation }: ReservationCardProps) {
  return (
    <div className="bg-white border border-zinc-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="space-y-2">
        <div>
          <p className="font-semibold text-sm text-zinc-900 truncate">
            {reservation.customer.name}
          </p>
          <p className="text-xs text-zinc-600">
            {reservation.partySize}{" "}
            {reservation.partySize === 1 ? "persona" : "personas"}
          </p>
        </div>

        <div className="text-xs text-zinc-500 space-y-1">
          <p className="font-medium">
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
          <p>
            {reservation.tableIds.length === 1 ? "Mesa" : "Mesas"}:{" "}
            {reservation.tableIds.join(", ")}
          </p>
        </div>

        <div className="pt-1">
          <span className="inline-block px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded">
            {reservation.status}
          </span>
        </div>
      </div>
    </div>
  );
}
