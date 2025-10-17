import { render, screen, fireEvent } from "@testing-library/react";
import ProductModal from "../ProductModal";
import { CategoryContext } from "../../context/CategoryContext";

beforeAll(() => {
  // Mock para evitar el error de "not implemented: window.alert"
  window.alert = jest.fn();
});

describe("ProductModal", () => {
  const mockOnClose = jest.fn();
  const mockOnSave = jest.fn();
  const mockAddCategory = jest.fn();

  const renderModal = (open = true) =>
    render(
      <CategoryContext.Provider
        value={{
          categories: ["Food"],
          addCategory: mockAddCategory,
          refreshCategories: jest.fn(),
        }}
      >
        <ProductModal
          open={open}
          onClose={mockOnClose}
          onSave={mockOnSave}
          product={undefined}
        />
      </CategoryContext.Provider>
    );

  it("renders when open", () => {
    renderModal();
    expect(screen.getByText("Add New Product")).toBeInTheDocument();
  });

  it("validates name field before saving", () => {
    renderModal();
    fireEvent.click(screen.getByText("Save"));
    expect(screen.getByText("Add New Product")).toBeInTheDocument();
  });

  it("calls onSave with product data", () => {
    renderModal();
    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Test" } });
    fireEvent.click(screen.getByText("Food"));
    fireEvent.click(screen.getByText("Save"));
    expect(mockOnSave).toHaveBeenCalled();
  });
});
