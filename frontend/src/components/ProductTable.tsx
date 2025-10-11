import { useState, useMemo } from "react";
import { Product, ProductTableProps } from "../types/Product";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"; // iconos opcionales

export default function ProductTable({
  products,
  onEdit,
  onDelete,
  onStockChange,
}: ProductTableProps) {
  const [sortConfig, setSortConfig] = useState<
    { key: keyof Product; direction: "asc" | "desc" }[]
  >([]);

  // 🔹 Función para manejar el clic en los encabezados
  const handleSort = (key: keyof Product, isShiftKey: boolean) => {
    setSortConfig((prev) => {
      const existing = prev.find((conf) => conf.key === key);

      // Si ya está como criterio principal y no presiona Shift → alterna asc/desc
      if (!isShiftKey) {
        if (existing) {
          const newDirection = existing.direction === "asc" ? "desc" : "asc";
          return [{ key, direction: newDirection }];
        }
        return [{ key, direction: "asc" }];
      }

      // Si mantiene Shift → agrega o alterna el segundo criterio
      if (isShiftKey) {
        if (existing) {
          // Alternar dirección del existente
          const newDirection = existing.direction === "asc" ? "desc" : "asc";
          return prev.map((conf) =>
            conf.key === key ? { ...conf, direction: newDirection } : conf
          );
        }
        // Añadir nuevo criterio sin reemplazar
        return [...prev, { key, direction: "asc" }];
      }

      return prev;
    });
  };

  // 🔹 Función para comparar múltiples criterios
  const sortedProducts = useMemo(() => {
    const sorted = [...products];
    sorted.sort((a, b) => {
      for (const { key, direction } of sortConfig) {
        let valueA = a[key];
        let valueB = b[key];

        // Comparar correctamente según tipo
        if (typeof valueA === "string" && typeof valueB === "string") {
          const comparison = valueA.localeCompare(valueB);
          if (comparison !== 0) return direction === "asc" ? comparison : -comparison;
        } else if (typeof valueA === "number" && typeof valueB === "number") {
          if (valueA !== valueB) return direction === "asc" ? valueA - valueB : valueB - valueA;
        } else if (key === "expirationDate") {
  const dateA = a.expirationDate ? new Date(a.expirationDate).getTime() : 0;
  const dateB = b.expirationDate ? new Date(b.expirationDate).getTime() : 0;

  // Si uno tiene fecha y el otro no, el que no tiene se va al final
  if (dateA !== dateB) {
    if (dateA === 0) return 1;
    if (dateB === 0) return -1;
    return direction === "asc" ? dateA - dateB : dateB - dateA;
  }
}

      }
      return 0;
    });
    return sorted;
  }, [products, sortConfig]);

  // 🔹 Render helper para mostrar el icono de orden
  const renderSortIcon = (key: keyof Product) => {
    const sort = sortConfig.find((conf) => conf.key === key);
    if (!sort) return <ArrowUpDown className="inline w-4 h-4 ml-1 text-gray-400" />;
    return sort.direction === "asc" ? (
      <ArrowUp className="inline w-4 h-4 ml-1 text-blue-500" />
    ) : (
      <ArrowDown className="inline w-4 h-4 ml-1 text-blue-500" />
    );
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-md">
      <table className="min-w-full border border-gray-200">
        <thead className="bg-gray-100 select-none">
          <tr>
            <th
              className="py-2 px-4 text-left cursor-pointer"
              onClick={(e) => handleSort("name", e.shiftKey)}
            >
              Nombre {renderSortIcon("name")}
            </th>
            <th
              className="py-2 px-4 text-left cursor-pointer"
              onClick={(e) => handleSort("category", e.shiftKey)}
            >
              Categoría {renderSortIcon("category")}
            </th>
            <th
              className="py-2 px-4 text-left cursor-pointer"
              onClick={(e) => handleSort("price", e.shiftKey)}
            >
              Precio {renderSortIcon("price")}
            </th>
            <th
              className="py-2 px-4 text-left cursor-pointer"
              onClick={(e) => handleSort("stock", e.shiftKey)}
            >
              Stock {renderSortIcon("stock")}
            </th>
            <th
              className="py-2 px-4 text-left cursor-pointer"
              onClick={(e) => handleSort("expirationDate", e.shiftKey)}
            >
              Expiración {renderSortIcon("expirationDate")}
            </th>
            <th className="py-2 px-4 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {sortedProducts.length > 0 ? (
            sortedProducts.map((product) => (
              <tr key={product.id} className="border-t hover:bg-gray-50">
                <td className="py-2 px-4">{product.name}</td>
                <td className="py-2 px-4">{product.category}</td>
                <td className="py-2 px-4">${product.price.toFixed(2)}</td>
                <td className="py-2 px-4">{product.stock}</td>
                <td className="py-2 px-4">{product.expirationDate}</td>
                <td className="py-2 px-4 flex gap-2">
                  <button
                    onClick={() => onEdit(product)}
                    className="text-blue-500 hover:underline"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onDelete(product)}
                    className="text-red-500 hover:underline"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={6}
                className="text-center py-4 text-gray-500 italic"
              >
                No hay productos disponibles
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
