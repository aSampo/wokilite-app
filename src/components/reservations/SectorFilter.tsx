"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Sector } from "@/lib/api/restaurants";

interface SectorFilterProps {
  sectors: Sector[];
  selectedSector: string | null;
  onSectorChange: (sector: string | null) => void;
}

export function SectorFilter({
  sectors,
  selectedSector,
  onSectorChange,
}: SectorFilterProps) {
  return (
    <Select
      value={selectedSector || "all"}
      onValueChange={(value) => onSectorChange(value === "all" ? null : value)}
    >
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Todos los sectores" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Todos los sectores</SelectItem>
        {sectors.map((sector) => (
          <SelectItem key={sector.id} value={sector.id}>
            {sector.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
