import type { ReservationItem } from "@/types/api.types";
import { ReservationCard } from "./ReservationCard";

interface SectorSectionProps {
  sectorId: string;
  sectorName: string;
  reservations: ReservationItem[];
}

export function SectorSection({
  sectorId,
  sectorName,
  reservations,
}: SectorSectionProps) {
  if (reservations.length === 0) return null;

  return (
    <div className="bg-linear-to-br from-zinc-50 to-zinc-100/50 border border-zinc-200 rounded-xl p-5">
      <div className="flex items-center gap-3 mb-4">
        <h3 className="text-lg font-bold text-zinc-900">{sectorName}</h3>
        <span className="px-2 py-0.5 text-xs font-medium bg-zinc-900 text-white rounded-full">
          {reservations.length}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {reservations.map((reservation) => (
          <ReservationCard key={reservation.id} reservation={reservation} />
        ))}
      </div>
    </div>
  );
}
