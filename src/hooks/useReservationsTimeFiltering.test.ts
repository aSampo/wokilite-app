import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useReservationsTimeFiltering } from "./useReservationsTimeFiltering";
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

describe("useReservationsTimeFiltering", () => {
  const reservations: ReservationItem[] = [
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
    createReservation(
      "3",
      "2025-01-15T20:00:00-03:00",
      "2025-01-15T21:30:00-03:00"
    ),
  ];

  it("should return all reservations when no filters are applied", () => {
    const { result } = renderHook(() =>
      useReservationsTimeFiltering({
        reservations,
        startTime: null,
        endTime: null,
      })
    );

    expect(result.current).toHaveLength(3);
  });

  it("should filter by startTime only", () => {
    const { result } = renderHook(() =>
      useReservationsTimeFiltering({
        reservations,
        startTime: "14:00",
        endTime: null,
      })
    );

    expect(result.current).toHaveLength(2);
    expect(result.current[0].id).toBe("2");
    expect(result.current[1].id).toBe("3");
  });

  it("should filter by endTime only", () => {
    const { result } = renderHook(() =>
      useReservationsTimeFiltering({
        reservations,
        startTime: null,
        endTime: "15:00",
      })
    );

    expect(result.current).toHaveLength(1);
    expect(result.current[0].id).toBe("1");
  });

  it("should filter by both startTime and endTime", () => {
    const { result } = renderHook(() =>
      useReservationsTimeFiltering({
        reservations,
        startTime: "12:00",
        endTime: "15:00",
      })
    );

    expect(result.current).toHaveLength(1);
    expect(result.current[0].id).toBe("1");
  });

  it("should include reservations that end exactly at endTime", () => {
    const { result } = renderHook(() =>
      useReservationsTimeFiltering({
        reservations,
        startTime: null,
        endTime: "13:30",
      })
    );

    expect(result.current).toHaveLength(1);
    expect(result.current[0].id).toBe("1");
  });

  it("should return empty array when no reservations match", () => {
    const { result } = renderHook(() =>
      useReservationsTimeFiltering({
        reservations,
        startTime: "22:00",
        endTime: "23:00",
      })
    );

    expect(result.current).toHaveLength(0);
  });

  it("should handle empty reservations array", () => {
    const { result } = renderHook(() =>
      useReservationsTimeFiltering({
        reservations: [],
        startTime: "12:00",
        endTime: "15:00",
      })
    );

    expect(result.current).toHaveLength(0);
  });
});
