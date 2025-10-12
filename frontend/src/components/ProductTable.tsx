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
        <thead className="bg-gray-100 select-none">
          <tr>
            {["name", "category", "price", "stock", "expirationDate"].map((field) => (
              <th
                key={field}
                onClick={() => onSortChange(field)}
                className="py-2 px-4 text-left cursor-pointer"
              >
                {field.charAt(0).toUpperCase() + field.slice(1)} {renderSortIcon(field)}
              </th>
            ))}
            <th className="py-2 px-4 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((p) => (
              <tr key={p.id} className="border-t hover:bg-gray-50">
                <td className="py-2 px-4">{p.name}</td>
                <td className="py-2 px-4">{p.category}</td>
                <td className="py-2 px-4">${p.price.toFixed(2)}</td>
                <td className="py-2 px-4">{p.stock}</td>
                <td className="py-2 px-4">{p.expirationDate}</td>
                <td className="py-2 px-4 flex gap-2">
                  <button onClick={() => onEdit(p)} className="text-blue-500 hover:underline">
                    Editar
                  </button>
                  <button onClick={() => onDelete(p)} className="text-red-500 hover:underline">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
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
