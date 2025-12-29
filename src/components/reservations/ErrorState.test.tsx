import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ErrorState } from "./ErrorState";

describe("ErrorState", () => {
  it("should render error message from Error object", () => {
    const error = new Error("Failed to fetch reservations");

    render(<ErrorState error={error} />);

    expect(screen.getByText("Error al cargar reservas")).toBeInTheDocument();
    expect(
      screen.getByText("Failed to fetch reservations")
    ).toBeInTheDocument();
  });

  it("should render default message for unknown error", () => {
    const error = "Unknown error";

    render(<ErrorState error={error} />);

    expect(screen.getByText("Error al cargar reservas")).toBeInTheDocument();
    expect(screen.getByText("Error desconocido")).toBeInTheDocument();
  });

  it("should render error icon", () => {
    const error = new Error("Test error");
    const { container } = render(<ErrorState error={error} />);

    const icon = container.querySelector("svg");
    expect(icon).toBeInTheDocument();
  });

  it("should handle null error", () => {
    render(<ErrorState error={null} />);

    expect(screen.getByText("Error desconocido")).toBeInTheDocument();
  });
});

