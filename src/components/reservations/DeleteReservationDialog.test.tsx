import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DeleteReservationDialog } from "./DeleteReservationDialog";

describe("DeleteReservationDialog", () => {
  it("should not render when open is false", () => {
    render(
      <DeleteReservationDialog
        open={false}
        onOpenChange={vi.fn()}
        onConfirm={vi.fn()}
        customerName="Juan Pérez"
        isDeleting={false}
      />
    );

    expect(screen.queryByText("¿Eliminar reserva?")).not.toBeInTheDocument();
  });

  it("should render when open is true", () => {
    render(
      <DeleteReservationDialog
        open={true}
        onOpenChange={vi.fn()}
        onConfirm={vi.fn()}
        customerName="Juan Pérez"
        isDeleting={false}
      />
    );

    expect(screen.getByText("¿Eliminar reserva?")).toBeInTheDocument();
    expect(screen.getByText(/Juan Pérez/)).toBeInTheDocument();
    expect(
      screen.getByText(/Esta acción no se puede deshacer/)
    ).toBeInTheDocument();
  });

  it("should call onConfirm when delete button is clicked", async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();

    render(
      <DeleteReservationDialog
        open={true}
        onOpenChange={vi.fn()}
        onConfirm={onConfirm}
        customerName="Juan Pérez"
        isDeleting={false}
      />
    );

    const deleteButton = screen.getByRole("button", { name: /eliminar/i });
    await user.click(deleteButton);

    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it("should call onOpenChange when cancel button is clicked", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();

    render(
      <DeleteReservationDialog
        open={true}
        onOpenChange={onOpenChange}
        onConfirm={vi.fn()}
        customerName="Juan Pérez"
        isDeleting={false}
      />
    );

    const cancelButton = screen.getByRole("button", { name: /cancelar/i });
    await user.click(cancelButton);

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("should disable buttons when isDeleting is true", () => {
    render(
      <DeleteReservationDialog
        open={true}
        onOpenChange={vi.fn()}
        onConfirm={vi.fn()}
        customerName="Juan Pérez"
        isDeleting={true}
      />
    );

    const deleteButton = screen.getByRole("button", { name: /eliminando/i });
    const cancelButton = screen.getByRole("button", { name: /cancelar/i });

    expect(deleteButton).toBeDisabled();
    expect(cancelButton).toBeDisabled();
    expect(screen.getByText("Eliminando...")).toBeInTheDocument();
  });

  it("should show customer name in description", () => {
    render(
      <DeleteReservationDialog
        open={true}
        onOpenChange={vi.fn()}
        onConfirm={vi.fn()}
        customerName="María García"
        isDeleting={false}
      />
    );

    const description = screen.getByText(/María García/);
    expect(description).toBeInTheDocument();
  });
});

