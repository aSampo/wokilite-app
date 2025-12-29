import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { SectorFilter } from "./SectorFilter";
import type { Sector } from "@/lib/api/restaurants";

const mockSectors: Sector[] = [
  { id: "S1", name: "Main Hall" },
  { id: "S2", name: "Terrace" },
  { id: "S3", name: "Private Room" },
];

describe("SectorFilter", () => {
  it("should render all sectors option", () => {
    render(
      <SectorFilter
        sectors={mockSectors}
        selectedSector={null}
        onSectorChange={vi.fn()}
      />
    );

    expect(screen.getByText("Todos los sectores")).toBeInTheDocument();
  });

  it("should render select with all sectors option", () => {
    render(
      <SectorFilter
        sectors={mockSectors}
        selectedSector={null}
        onSectorChange={vi.fn()}
      />
    );

    const select = screen.getByRole("combobox");
    expect(select).toHaveTextContent("Todos los sectores");
  });

  it("should render with selected sector", () => {
    render(
      <SectorFilter
        sectors={mockSectors}
        selectedSector="S1"
        onSectorChange={vi.fn()}
      />
    );

    const select = screen.getByRole("combobox");
    expect(select).toHaveTextContent("Main Hall");
  });

  it("should render all sectors when selectedSector is null", () => {
    render(
      <SectorFilter
        sectors={mockSectors}
        selectedSector={null}
        onSectorChange={vi.fn()}
      />
    );

    const select = screen.getByRole("combobox");
    expect(select).toHaveTextContent("Todos los sectores");
  });

  it("should show selected sector", () => {
    render(
      <SectorFilter
        sectors={mockSectors}
        selectedSector="S2"
        onSectorChange={vi.fn()}
      />
    );

    const select = screen.getByRole("combobox");
    expect(select).toHaveTextContent("Terrace");
  });
});
