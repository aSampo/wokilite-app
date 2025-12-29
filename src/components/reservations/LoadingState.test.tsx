import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { LoadingState } from "./LoadingState";

describe("LoadingState", () => {
  it("should render loading message", () => {
    render(<LoadingState />);

    expect(screen.getByText("Cargando reservas...")).toBeInTheDocument();
  });

  it("should render loader icon", () => {
    const { container } = render(<LoadingState />);

    const loader = container.querySelector("svg");
    expect(loader).toBeInTheDocument();
  });

  it("should have proper structure", () => {
    const { container } = render(<LoadingState />);

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass("flex", "items-center", "justify-center");
  });
});

