import React from 'react';
import { ProductSummaryProps } from '../types/Product';

function ProductSummary({ products }: ProductSummaryProps) {
  if (!Array.isArray(products)) return null;

  const summaryByCategory: Record<string, { totalProducts: number; totalValue: number }> = {};

  let overallTotalProducts = 0;
  let overallTotalValue = 0;

  // Calcular totales por categoría y globales
  products.forEach(({ category, stock, price }) => {
    const productTotal = stock * price;
    const categories = Array.isArray(category) ? category : [category];

    categories.forEach((cat) => {
      if (!summaryByCategory[cat]) {
        summaryByCategory[cat] = { totalProducts: 0, totalValue: 0 };
      }
      summaryByCategory[cat].totalProducts += stock;
      summaryByCategory[cat].totalValue += productTotal;
    });

    overallTotalProducts += stock;
    overallTotalValue += productTotal;
  });

  // Convertir el resumen en un array
  const rowsSummary = Object.entries(summaryByCategory).map(([cat, data]) => ({
    id: cat,
    totalProducts: data.totalProducts,
    totalValue: data.totalValue.toLocaleString('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }),
    averagePrice:
      data.totalProducts > 0
        ? (data.totalValue / data.totalProducts).toLocaleString('es-MX', {
            style: 'currency',
            currency: 'MXN',
          })
        : '$0.00',
  }));

  // 📍 Agregar solo un "Overall" al final
  rowsSummary.push({
    id: 'Overall',
    totalProducts: overallTotalProducts,
    totalValue: overallTotalValue.toLocaleString('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }),
    averagePrice:
      overallTotalProducts > 0
        ? (overallTotalValue / overallTotalProducts).toLocaleString('es-MX', {
            style: 'currency',
            currency: 'MXN',
          })
        : '$0.00',
  });

  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
        <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
          <tr>
            <th className="py-2 px-4 text-left">Category</th>
            <th className="py-2 px-4 text-center">Total Products</th>
            <th className="py-2 px-4 text-center">Total Value</th>
            <th className="py-2 px-4 text-center">Average Price</th>
          </tr>
        </thead>
        <tbody>
          {rowsSummary.map((row) => (
            <tr
              key={row.id}
              className={`border-t ${
                row.id === 'Overall'
                  ? 'font-bold bg-gray-50'
                  : 'hover:bg-gray-50'
              }`}
            >
              <td className="py-2 px-4">{row.id}</td>
              <td className="py-2 px-4 text-center">{row.totalProducts}</td>
              <td className="py-2 px-4 text-center">{row.totalValue}</td>
              <td className="py-2 px-4 text-center">{row.averagePrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductSummary;
