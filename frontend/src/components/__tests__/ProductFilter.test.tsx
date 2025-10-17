import { render, screen, fireEvent } from "@testing-library/react";
import ProductFilter from "../ProductFilter";
import { CategoryContext } from "../../context/CategoryContext";
import React from "react";

describe("ProductFilter", () => {
  const mockCategories = ["Food", "Drinks"];
  const mockOnFilter = jest.fn();

  const renderWithContext = () =>
    render(
      <CategoryContext.Provider
        value={{
          categories: mockCategories,
          addCategory: jest.fn(),
          refreshCategories: jest.fn(),
        }}
      >
        <ProductFilter onFilter={mockOnFilter} />
      </CategoryContext.Provider>
    );

  it("renders all filter inputs", () => {
    renderWithContext();
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Availability")).toBeInTheDocument();
  });

  it("toggles category selection", () => {
    renderWithContext();
    const foodButton = screen.getByText("Food");
    fireEvent.click(foodButton);
    expect(foodButton).toHaveClass("bg-blue-500"); // selected
  });

  it("calls onFilter with the correct data", () => {
    renderWithContext();
    fireEvent.change(screen.getByPlaceholderText("Search by name..."), {
      target: { value: "chocolate" },
    });
    fireEvent.click(screen.getByText("Search"));
    expect(mockOnFilter).toHaveBeenCalledWith({
      name: "chocolate",
      category: [],
      availability: "all",
    });
  });
});
