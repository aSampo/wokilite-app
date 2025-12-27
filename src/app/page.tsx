import { format } from "date-fns";
import { Suspense } from "react";
import { ReservationsList } from "@/components/reservations/ReservationsList";

export default function Home() {
  const today = format(new Date(), "yyyy-MM-dd");
  const formattedDate = format(new Date(today), "dd/MM/yyyy");

  return (
    <div className="min-h-screen bg-zinc-50 p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-4xl font-bold text-zinc-900 mb-8">
          WokiLite - Reservas
        </h1>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">
            Reservas para {formattedDate}
          </h2>

          <Suspense
            fallback={<div className="text-zinc-600">Cargando reservas...</div>}
          >
            <ReservationsList restaurantId="R1" date={today} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
