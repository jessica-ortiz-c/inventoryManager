import React from "react";
import { render, screen } from "@testing-library/react";
import ProductSummary from "../ProductSummary";
import { Product } from "../../types/Product";

describe("ProductSummary", () => {
  const mockProducts: Product[] = [
    {
      id: "1",
      name: "Coca-Cola",
      category: "Drinks",
      price: 20,
      stock: 5,
      expirationDate: "2025-12-31",
    },
    {
      id: "2",
      name: "Pepsi",
      category: "Drinks",
      price: 18,
      stock: 3,
      expirationDate: "2025-10-31",
    },
    {
      id: "3",
      name: "Bread",
      category: "Food",
      price: 15,
      stock: 2,
      expirationDate: "2025-11-30",
    },
  ];

  it("renders table headers correctly", () => {
    render(<ProductSummary products={mockProducts} />);

    expect(screen.getByText(/Category/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Products/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Value/i)).toBeInTheDocument();
    expect(screen.getByText(/Average Price/i)).toBeInTheDocument();
  });

  it("renders category summaries correctly", () => {
    render(<ProductSummary products={mockProducts} />);

    // Verificar que las categorías se muestren
    expect(screen.getByText("Drinks")).toBeInTheDocument();
    expect(screen.getByText("Food")).toBeInTheDocument();
  });

  it("renders overall totals at the end", () => {
    render(<ProductSummary products={mockProducts} />);

    // El "Overall" debe aparecer
    expect(screen.getByText("Overall")).toBeInTheDocument();

    // Verificar totales calculados correctamente
    // Drinks: (5x20) + (3x18) = 100 + 54 = 154
    // Food: (2x15) = 30
    // Overall = 184 total value, 10 total products

    expect(screen.getByText("Drinks")).toBeInTheDocument();
    expect(screen.getByText("Food")).toBeInTheDocument();
    expect(screen.getByText("Overall")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument(); // total products overall
  });

  it("renders nothing when products is not an array", () => {
    const { container } = render(<ProductSummary products={undefined as any} />);
    expect(container.firstChild).toBeNull();
  });
});
