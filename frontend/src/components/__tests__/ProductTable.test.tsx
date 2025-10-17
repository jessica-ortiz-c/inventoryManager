// src/components/__tests__/ProductTable.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import ProductTable from "../ProductTable";
import { Product } from "../../types/Product";

describe("ProductTable", () => {
  const mockProducts: Product[] = [
    { id: "1", name: "Pan", category: "Food", price: 10, stock: 5, expirationDate: "2025-12-01" },
    { id: "2", name: "Leche", category: "Drinks", price: 20, stock: 8, expirationDate: "2025-10-10" },
  ];

  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();
  const mockOnSortChange = jest.fn();

  const baseProps = {
    onEdit: mockOnEdit,
    onDelete: mockOnDelete,
    onSortChange: mockOnSortChange,
    sortBy: "name",
    order: "asc" as const,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("debe renderizar las filas de productos", () => {
    render(<ProductTable products={mockProducts} {...baseProps} />);
    expect(screen.getByText("Pan")).toBeInTheDocument();
    expect(screen.getByText("Leche")).toBeInTheDocument();
  });

  it("debe mostrar mensaje si no hay productos", () => {
    render(<ProductTable products={[]} {...baseProps} />);
    expect(screen.getByText(/No products found/i)).toBeInTheDocument();
  });

  it("debe ejecutar onEdit al presionar el botón editar", () => {
    render(<ProductTable products={mockProducts} {...baseProps} />);
    const editButtons = screen.getAllByRole("button", { name: /editar/i });
    fireEvent.click(editButtons[0]);
    expect(mockOnEdit).toHaveBeenCalledWith(mockProducts[0]);
  });

  it("debe ejecutar onDelete al presionar el botón eliminar", () => {
    render(<ProductTable products={mockProducts} {...baseProps} />);
    const deleteButtons = screen.getAllByRole("button", { name: /eliminar/i });
    fireEvent.click(deleteButtons[1]);
    expect(mockOnDelete).toHaveBeenCalledWith(mockProducts[1]);
  });

  it("debe ejecutar onSortChange al hacer click en el encabezado de columna", () => {
    render(<ProductTable products={mockProducts} {...baseProps} />);
    const header = screen.getByText(/Name/i);
    fireEvent.click(header);
    expect(mockOnSortChange).toHaveBeenCalledWith("name");
  });
});
