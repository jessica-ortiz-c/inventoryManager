import { Product } from "../types/Product";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

interface Props {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
  onSortChange: (field: string) => void;
  sortBy: string;
  order: "asc" | "desc";
}

export default function ProductTable({ products, onEdit, onDelete, onSortChange, sortBy, order }: Props) {
  // 🔹 Función auxiliar para determinar color de fondo según fecha de expiración
  const getExpirationBg = (expirationDate: string | null) => {
    if (!expirationDate) return ""; // sin color si no tiene fecha

    const today = new Date();
    const expDate = new Date(expirationDate);
    const diffDays = Math.ceil((expDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "bg-red-200"; // expirado
    if (diffDays < 7) return "bg-red-100";
    if (diffDays <= 14) return "bg-yellow-100";
    return "bg-green-100";
  };

  // 🔹 Determinar color de texto en celda de stock
  const getStockClass = (stock: number) => {
    if (stock === 0) return "text-red-600 line-through font-semibold";
    if (stock < 5) return "text-red-600 font-medium";
    if (stock <= 10) return "text-orange-600 font-medium";
    return "text-gray-800";
  };

  // 🔹 Renderizar icono de ordenamiento
  const renderSortIcon = (field: string) => {
    if (sortBy !== field) return <ArrowUpDown className="inline w-4 h-4 ml-1 text-gray-400" />;
    return order === "asc" ? (
      <ArrowUp className="inline w-4 h-4 ml-1 text-blue-500" />
    ) : (
      <ArrowDown className="inline w-4 h-4 ml-1 text-blue-500" />
    );
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-md">
      <table className="min-w-full border border-gray-200">
        <thead className="bg-gray-100 select-none text-gray-700 text-sm uppercase tracking-wide">
          <tr>
            {["name", "category", "price", "stock", "expirationDate"].map((field) => (
              <th
                key={field}
                onClick={() => onSortChange(field)}
                className="py-2 px-4 text-left cursor-pointer hover:text-blue-600 transition-colors"
              >
                {field.charAt(0).toUpperCase() + field.slice(1)} {renderSortIcon(field)}
              </th>
            ))}
            <th className="py-2 px-4 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-gray-800">
          {products.length > 0 ? (
            products.map((p) => {
              const rowBg = getExpirationBg(p.expirationDate);
              const stockClass = getStockClass(p.stock);

              return (
                <tr
                  key={p.id}
                  className={`border-t hover:bg-gray-50 transition-colors ${rowBg}`}
                >
                  <td className={`py-2 px-4 ${p.stock === 0 ? "line-through text-gray-400" : ""}`}>
                    {p.name}
                  </td>
                  <td className="py-2 px-4">{p.category}</td>
                  <td className="py-2 px-4 text-right">${p.price.toFixed(2)}</td>
                  <td className={`py-2 px-4 text-center ${stockClass}`}>{p.stock}</td>
                  <td className="py-2 px-4 text-center">
                    {p.expirationDate ? new Date(p.expirationDate).toLocaleDateString("es-MX") : "—"}
                  </td>
                  <td className="py-2 px-4 flex gap-2">
                    <button
                      onClick={() => onEdit(p)}
                      className="text-blue-500 hover:underline font-medium"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => onDelete(p)}
                      className="text-red-500 hover:underline font-medium"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={6} className="text-center py-4 text-gray-500 italic">
                No products found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
