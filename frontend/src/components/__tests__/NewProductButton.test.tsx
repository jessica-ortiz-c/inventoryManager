import { render, screen, fireEvent } from "@testing-library/react";
import NewProductButton from "../NewProductButton";

describe("NewProductButton", () => {
  it("renders correctly", () => {
    render(<NewProductButton onClick={() => {}} />);
    expect(screen.getByText("New product")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn(); // Si usas Vitest; si no, usa jest.fn()
    render(<NewProductButton onClick={handleClick} />);
    fireEvent.click(screen.getByText("New product"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
