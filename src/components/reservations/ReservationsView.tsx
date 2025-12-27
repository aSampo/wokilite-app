"use client";

import { format } from "date-fns";
import { useState } from "react";
import { DateNavigator } from "@/components/ui/date-navigator";
import { ReservationsList } from "./ReservationsList";
import type { Sector } from "@/lib/api/restaurants";

interface ReservationsViewProps {
  restaurantId: string;
  sectors: Sector[];
}

export function ReservationsView({
  restaurantId,
  sectors,
}: ReservationsViewProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const dateString = format(selectedDate, "yyyy-MM-dd");

  return (
    <>
      <DateNavigator date={selectedDate} onDateChange={setSelectedDate} />
      <div className="bg-white rounded-lg shadow p-6">
        <ReservationsList
          restaurantId={restaurantId}
          date={dateString}
          sectors={sectors}
        />
      </div>
    </>
  );
}
