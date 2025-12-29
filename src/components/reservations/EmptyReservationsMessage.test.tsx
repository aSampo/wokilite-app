import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { EmptyReservationsMessage } from "./EmptyReservationsMessage";

describe("EmptyReservationsMessage", () => {
  it("should show message when there are no reservations", () => {
    render(<EmptyReservationsMessage hasReservations={false} />);
    expect(
      screen.getByText("No hay reservas para este día")
    ).toBeInTheDocument();
  });

  it("should show message when there are reservations but filtered out", () => {
    render(<EmptyReservationsMessage hasReservations={true} />);
    expect(
      screen.getByText("No hay reservas en el rango horario seleccionado")
    ).toBeInTheDocument();
  });
});
