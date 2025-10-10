import { useState } from 'react';
import { Product, ProductTableProps } from '../types/Product';

function ProductTable({ products, onEdit, onDelete, onStockChange }: ProductTableProps) {
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const itemsPerPage = 10;

  const sortedProducts = [...products].sort((a, b) => {
    if (!sortField) return 0;
    const valueA = a[sortField as keyof Product];
    const valueB = b[sortField as keyof Product];
    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return sortOrder === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
    } else if (typeof valueA === 'number' && typeof valueB === 'number') {
      return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
    }
    return 0;
  });

  const paginatedProducts = sortedProducts.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const toggleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const toggleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const validIds = paginatedProducts
        .map((p) => p.id)
        .filter((id): id is string => typeof id === 'string');
      setSelectedProducts(validIds);
    } else {
      setSelectedProducts([]);
    }
  };

  const toggleSelectOne = (id: string | undefined) => {
    if (!id) return;
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
        <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
          <tr>
            <th className="py-2 px-4 text-center">
              <input
                type="checkbox"
                onChange={toggleSelectAll}
                checked={
                  paginatedProducts.length > 0 &&
                  paginatedProducts.every(
                    (p) => p.id && selectedProducts.includes(p.id)
                  )
                }
                className="w-4 h-4 accent-blue-600"
              />
            </th>
            <th className="py-2 px-4 cursor-pointer" onClick={() => toggleSort('category')}>
              Category
            </th>
            <th className="py-2 px-4 cursor-pointer" onClick={() => toggleSort('name')}>
              Name
            </th>
            <th className="py-2 px-4 cursor-pointer" onClick={() => toggleSort('price')}>
              Price
            </th>
            <th className="py-2 px-4">Expiration</th>
            <th className="py-2 px-4">Stock</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {paginatedProducts.map((product) => {
            const diffDays = product.expirationDate
              ? Math.ceil(
                  (new Date(product.expirationDate).getTime() - new Date().getTime()) /
                    (1000 * 3600 * 24)
                )
              : null;

            let rowColor = '';
            if (diffDays !== null) {
              if (diffDays < 7) rowColor = 'bg-red-50';
              else if (diffDays <= 14) rowColor = 'bg-yellow-50';
              else rowColor = 'bg-green-50';
            }

            // 🎨 Determinar color del stock
            let stockColor = 'text-gray-700 font-medium';
            if (product.stock < 5) stockColor = 'text-red-600 font-medium';
            else if (product.stock <= 10) stockColor = 'text-orange-500 font-medium';

            return (
              <tr
                key={product.id ?? Math.random()}
                className={`border-t hover:bg-gray-50 transition-colors ${rowColor}`}
              >
                <td className="py-2 px-4 text-center">
                  <input
                    type="checkbox"
                    checked={product.id ? selectedProducts.includes(product.id) : false}
                    onChange={() => toggleSelectOne(product.id)}
                    className="w-4 h-4 accent-blue-600"
                  />
                </td>

                {/* ✅ Categoría (string simple) */}
                <td className="py-2 px-4">{product.category || 'Sin categoría'}</td>

                {/* ✅ Nombre */}
                <td className="py-2 px-4">{product.name}</td>

                {/* ✅ Precio */}
                <td className="py-2 px-4">
                  ${Number(product.price).toLocaleString('es-MX')}
                </td>

                {/* ✅ Fecha de expiración */}
                <td className="py-2 px-4">
                  {product.expirationDate ? product.expirationDate : 'N/A'}
                </td>

                {/* ✅ Stock colorizado */}
                <td className={`py-2 px-4 text-center ${stockColor}`}>
                  {product.stock}
                </td>

                {/* ✅ Acciones */}
                <td className="py-2 px-4 flex items-center gap-3 justify-center">
                  <button
                    onClick={() => onEdit(product)}
                    className="text-blue-600 hover:text-blue-800"
                    title="Editar"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => onDelete(product)}
                    className="text-red-600 hover:text-red-800"
                    title="Eliminar"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* ✅ Paginación */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded ${
              page === i + 1
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProductTable;
