"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDeleteReservation } from "@/hooks/useDeleteReservation";
import { DeleteReservationDialog } from "./DeleteReservationDialog";
import { formatTime24h } from "@/lib/utils/time-format";
import type { ReservationItem } from "@/types/api.types";

interface ReservationCardProps {
  reservation: ReservationItem;
}

export function ReservationCard({ reservation }: ReservationCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { mutate: deleteReservation, isPending: isDeleting } =
    useDeleteReservation();

  const handleDelete = () => {
    deleteReservation(reservation.id, {
      onSuccess: () => {
        setShowDeleteDialog(false);
      },
    });
  };

  return (
    <>
      <div className="bg-white border border-zinc-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow relative group">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          onClick={() => setShowDeleteDialog(true)}
        >
          <Trash2 className="h-4 w-4 text-red-600" />
        </Button>

        <div className="space-y-2">
          <div>
            <p className="font-semibold text-sm text-zinc-900 truncate pr-8">
              {reservation.customer.name}
            </p>
            <p className="text-xs text-zinc-600">
              {reservation.partySize}{" "}
              {reservation.partySize === 1 ? "persona" : "personas"}
            </p>
          </div>

          <div className="text-xs text-zinc-500 space-y-1">
            <p className="font-medium">
              {formatTime24h(reservation.start)} -{" "}
              {formatTime24h(reservation.end)}
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
      <DeleteReservationDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleDelete}
        customerName={reservation.customer.name}
        isDeleting={isDeleting}
      />
    </>
  );
}
