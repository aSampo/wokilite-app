import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CreateRandomReservationButton } from "./CreateRandomReservationButton";
import { renderWithProviders } from "@/test/test-utils";
import type { Sector } from "@/lib/api/restaurants";

const mockSectors: Sector[] = [
  { id: "S1", name: "Main Hall" },
  { id: "S2", name: "Terrace" },
];

const mockCreateRandomReservation = vi.fn();

vi.mock("@/hooks/useCreateRandomReservation", () => ({
  useCreateRandomReservation: vi.fn(() => ({
    createRandomReservation: mockCreateRandomReservation,
    isCreating: false,
  })),
}));

describe("CreateRandomReservationButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render button with correct text", () => {
    renderWithProviders(
      <CreateRandomReservationButton
        restaurantId="R1"
        date="2025-01-15"
        sectors={mockSectors}
      />
    );

    expect(screen.getByText("Crear Reserva de Prueba")).toBeInTheDocument();
  });

  it("should call createRandomReservation when clicked", async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <CreateRandomReservationButton
        restaurantId="R1"
        date="2025-01-15"
        sectors={mockSectors}
      />
    );

    const button = screen.getByRole("button", {
      name: /crear reserva de prueba/i,
    });
    await user.click(button);

    expect(mockCreateRandomReservation).toHaveBeenCalledTimes(1);
  });

  it("should render plus icon when not creating", () => {
    renderWithProviders(
      <CreateRandomReservationButton
        restaurantId="R1"
        date="2025-01-15"
        sectors={mockSectors}
      />
    );

    const icon = screen.getByRole("button").querySelector("svg");
    expect(icon).toBeInTheDocument();
  });
});
