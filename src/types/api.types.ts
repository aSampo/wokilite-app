export interface ReservationItem {
  id: string;
  sectorId: string;
  tableIds: string[];
  partySize: number;
  start: string;
  end: string;
  status: string;
  customer: {
    name: string;
    phone: string;
    email: string;
  };
  notes?: string;
  createdAt: string;
  updatedAt: string;
  cancelledAt?: string;
}

export interface DayReservationsResponse {
  date: string;
  items: ReservationItem[];
}

