"use client";

import { format } from "date-fns";
import { useState } from "react";
import { ReservationsList } from "@/components/reservations/ReservationsList";
import { DateNavigator } from "@/components/ui/date-navigator";

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const dateString = format(selectedDate, "yyyy-MM-dd");

  return (
    <div className="min-h-screen bg-zinc-50 p-8">
      <div className="mx-auto max-w-7xl flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold text-zinc-900">
            WokiLite - Reservas
          </h1>
        </div>
        <DateNavigator date={selectedDate} onDateChange={setSelectedDate} />
        <div className="bg-white rounded-lg shadow p-6">
          <ReservationsList restaurantId="R1" date={dateString} />
        </div>
      </div>
    </div>
  );
}
