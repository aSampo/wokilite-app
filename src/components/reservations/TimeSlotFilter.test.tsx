import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TimeSlotFilter } from "./TimeSlotFilter";
import type { ReservationItem } from "@/types/api.types";

const createReservation = (
  id: string,
  start: string,
  end: string
): ReservationItem => ({
  id,
  sectorId: "S1",
  tableIds: ["T1"],
  partySize: 2,
  start,
  end,
  status: "CONFIRMED",
  customer: {
    name: "Test User",
    phone: "+1234567890",
    email: "test@example.com",
  },
  createdAt: "2025-01-15T10:00:00Z",
  updatedAt: "2025-01-15T10:00:00Z",
});

describe("TimeSlotFilter", () => {
  it("should not render when there are no reservations", () => {
    const { container } = render(
      <TimeSlotFilter
        reservations={[]}
        startTime={null}
        endTime={null}
        onStartTimeChange={vi.fn()}
        onEndTimeChange={vi.fn()}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  it("should render start and end time selectors", () => {
    const reservations = [
      createReservation(
        "1",
        "2025-01-15T12:00:00-03:00",
        "2025-01-15T13:30:00-03:00"
      ),
      createReservation(
        "2",
        "2025-01-15T14:00:00-03:00",
        "2025-01-15T15:30:00-03:00"
      ),
    ];

    render(
      <TimeSlotFilter
        reservations={reservations}
        startTime={null}
        endTime={null}
        onStartTimeChange={vi.fn()}
        onEndTimeChange={vi.fn()}
      />
    );

    expect(screen.getByText("Desde (todas)")).toBeInTheDocument();
    expect(screen.getByText("Hasta (todas)")).toBeInTheDocument();
  });

  it("should render start time selector with available slots", () => {
    const onStartTimeChange = vi.fn();
    const reservations = [
      createReservation(
        "1",
        "2025-01-15T12:00:00-03:00",
        "2025-01-15T13:30:00-03:00"
      ),
    ];

    render(
      <TimeSlotFilter
        reservations={reservations}
        startTime={null}
        endTime={null}
        onStartTimeChange={onStartTimeChange}
        onEndTimeChange={vi.fn()}
      />
    );

    const comboboxes = screen.getAllByRole("combobox");
    expect(comboboxes).toHaveLength(2);
    expect(comboboxes[0]).toHaveTextContent("Desde (todas)");
  });

  it("should render end time selector with available slots", () => {
    const onEndTimeChange = vi.fn();
    const reservations = [
      createReservation(
        "1",
        "2025-01-15T12:00:00-03:00",
        "2025-01-15T13:30:00-03:00"
      ),
    ];

    render(
      <TimeSlotFilter
        reservations={reservations}
        startTime={null}
        endTime={null}
        onStartTimeChange={vi.fn()}
        onEndTimeChange={onEndTimeChange}
      />
    );

    const comboboxes = screen.getAllByRole("combobox");
    expect(comboboxes).toHaveLength(2);
    expect(comboboxes[1]).toHaveTextContent("Hasta (todas)");
  });

  it("should show clear button when filters are active", () => {
    const reservations = [
      createReservation(
        "1",
        "2025-01-15T12:00:00-03:00",
        "2025-01-15T13:30:00-03:00"
      ),
    ];

    render(
      <TimeSlotFilter
        reservations={reservations}
        startTime="12:00"
        endTime={null}
        onStartTimeChange={vi.fn()}
        onEndTimeChange={vi.fn()}
      />
    );

    expect(screen.getByText("Limpiar")).toBeInTheDocument();
  });

  it("should call clear handlers when clear button is clicked", async () => {
    const user = userEvent.setup();
    const onStartTimeChange = vi.fn();
    const onEndTimeChange = vi.fn();
    const reservations = [
      createReservation(
        "1",
        "2025-01-15T12:00:00-03:00",
        "2025-01-15T13:30:00-03:00"
      ),
    ];

    render(
      <TimeSlotFilter
        reservations={reservations}
        startTime="12:00"
        endTime="13:30"
        onStartTimeChange={onStartTimeChange}
        onEndTimeChange={onEndTimeChange}
      />
    );

    const clearButton = screen.getByText("Limpiar");
    await user.click(clearButton);

    expect(onStartTimeChange).toHaveBeenCalledWith(null);
    expect(onEndTimeChange).toHaveBeenCalledWith(null);
  });

  it("should render with multiple reservations", () => {
    const reservations = [
      createReservation(
        "1",
        "2025-01-15T14:00:00-03:00",
        "2025-01-15T15:30:00-03:00"
      ),
      createReservation(
        "2",
        "2025-01-15T12:00:00-03:00",
        "2025-01-15T13:00:00-03:00"
      ),
      createReservation(
        "3",
        "2025-01-15T12:00:00-03:00",
        "2025-01-15T13:30:00-03:00"
      ),
    ];

    render(
      <TimeSlotFilter
        reservations={reservations}
        startTime={null}
        endTime={null}
        onStartTimeChange={vi.fn()}
        onEndTimeChange={vi.fn()}
      />
    );

    const comboboxes = screen.getAllByRole("combobox");
    expect(comboboxes).toHaveLength(2);
  });
});
