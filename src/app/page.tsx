import { Metadata } from "next";
import { getRestaurantInfo } from "@/lib/api/restaurants";
import { ReservationsView } from "@/components/reservations/ReservationsView";

export async function generateMetadata(): Promise<Metadata> {
  const restaurantInfo = await getRestaurantInfo("R1");

  return {
    title: `${restaurantInfo.restaurant.name} - Reservas`,
    description: `Sistema de gestión de reservas para ${restaurantInfo.restaurant.name}`,
  };
}

export default async function Home() {
  const restaurantInfo = await getRestaurantInfo("R1");

  return (
    <div className="min-h-screen bg-zinc-50 p-8">
      <div className="mx-auto max-w-7xl flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-zinc-900">
              {restaurantInfo.restaurant.name} - Reservas
            </h1>
          </div>
        </div>
        <ReservationsView restaurantId="R1" sectors={restaurantInfo.sectors} />
      </div>
    </div>
  );
}
