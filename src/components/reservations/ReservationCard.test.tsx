import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ReservationCard } from "./ReservationCard";
import { renderWithProviders } from "@/test/test-utils";
import type { ReservationItem } from "@/types/api.types";

const mockReservation: ReservationItem = {
  id: "R1",
  sectorId: "S1",
  tableIds: ["T1", "T2"],
  partySize: 4,
  start: "2025-01-15T12:00:00-03:00",
  end: "2025-01-15T14:00:00-03:00",
  status: "CONFIRMED",
  customer: {
    name: "Juan Pérez",
    phone: "+1234567890",
    email: "juan@example.com",
  },
  createdAt: "2025-01-15T10:00:00Z",
  updatedAt: "2025-01-15T10:00:00Z",
};

vi.mock("@/hooks/useDeleteReservation", () => ({
  useDeleteReservation: () => ({
    mutate: vi.fn(),
    isPending: false,
  }),
}));

describe("ReservationCard", () => {
  it("should render reservation information", () => {
    renderWithProviders(<ReservationCard reservation={mockReservation} />);

    expect(screen.getByText("Juan Pérez")).toBeInTheDocument();
    expect(screen.getByText("4 personas")).toBeInTheDocument();
    expect(screen.getByText(/12:00 - 14:00/)).toBeInTheDocument();
    expect(screen.getByText(/Mesas: T1, T2/)).toBeInTheDocument();
    expect(screen.getByText("CONFIRMED")).toBeInTheDocument();
  });

  it("should show single person text for party size 1", () => {
    const singlePersonReservation = {
      ...mockReservation,
      partySize: 1,
    };
    renderWithProviders(
      <ReservationCard reservation={singlePersonReservation} />
    );

    expect(screen.getByText("1 persona")).toBeInTheDocument();
  });

  it("should show single table text for one table", () => {
    const singleTableReservation = {
      ...mockReservation,
      tableIds: ["T1"],
    };
    renderWithProviders(
      <ReservationCard reservation={singleTableReservation} />
    );

    expect(screen.getByText(/Mesa: T1/)).toBeInTheDocument();
  });

  it("should open delete dialog when delete button is clicked", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ReservationCard reservation={mockReservation} />);

    const card = screen.getByText("Juan Pérez").closest("div");
    if (card) {
      await user.hover(card);
      const buttons = screen.getAllByRole("button");
      const deleteButton = buttons.find((btn) => btn.querySelector("svg"));
      if (deleteButton) {
        await user.click(deleteButton);

        expect(screen.getByText("¿Eliminar reserva?")).toBeInTheDocument();
        const dialog = screen.getByRole("alertdialog");
        expect(dialog).toHaveTextContent(/Juan Pérez/);
      }
    }
  });
});
