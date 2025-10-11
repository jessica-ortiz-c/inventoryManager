import { useState, useEffect } from 'react';
import { Product } from '../types/Product';

import ProductFilter from './ProductFilter';
import ProductTable from './ProductTable';
import ProductModal from './ProductModal';
import NewProductButton from './NewProductButton';
import ProductSummary from './ProductSummary';

interface Filters {
  name: string;
  availability: string;
  category: string[];
}

function ProductManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);

  const [filters, setFilters] = useState<Filters>({
    name: '',
    availability: 'all',
    category: [],
  });

  // 🔹 Paginación
  const [page, setPage] = useState(0);
  const [size] = useState(10); // cantidad de productos por página
  const [totalPages, setTotalPages] = useState(1);

  // 🔹 Ordenamiento
  const [sortBy, setSortBy] = useState('name');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const fetchProducts = async (pageNum = 0, sort = sortBy, direction = order) => {
    try {
      const res = await fetch(
        `http://localhost:9090/products?page=${pageNum}&size=${size}&sortBy=${sort}&order=${direction}`
      );
      const data = await res.json();

      // ✅ Si tu backend devuelve un objeto con "content" y "totalPages"
      if (Array.isArray(data.content)) {
        setProducts(data.content);
        setFilteredProducts(data.content);
        setTotalPages(data.totalPages);
      } else {
        // En caso de que tu backend devuelva solo una lista (sin paginación aún)
        setProducts(data);
        setFilteredProducts(data);
        setTotalPages(1);
      }

      setPage(pageNum);
    } catch (err) {
      console.error('❌ Error fetching products:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSave = async (product: Product) => {
    const isEdit = Boolean(product.id);
    const url = isEdit
      ? `http://localhost:9090/products/${product.id}`
      : 'http://localhost:9090/products';

    const method = isEdit ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });

    if (response.ok) {
      await fetchProducts(page);
      setOpen(false);
    } else {
      alert('❌ Error saving product');
    }
  };

  const handleDelete = async (product: Product) => {
    const confirmDelete = window.confirm(`¿Eliminar ${product.name}?`);
    if (!confirmDelete) return;

    const res = await fetch(`http://localhost:9090/products/${product.id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      await fetchProducts(page);
    } else {
      alert('❌ Error deleting product');
    }
  };

  // 🔹 Aplicar filtros
  const applyFilters = (filters: Filters) => {
    const filtered = products.filter((product) => {
      const nameMatch = product.name.toLowerCase().includes(filters.name.toLowerCase());

      const categoryMatch =
        filters.category.length === 0 ||
        filters.category.some((cat) =>
          Array.isArray(product.category)
            ? product.category.includes(cat)
            : product.category === cat
        );

      const availabilityMatch =
        filters.availability === 'all' ||
        (filters.availability === 'in' && product.stock > 0) ||
        (filters.availability === 'out' && product.stock === 0);

      return nameMatch && categoryMatch && availabilityMatch;
    });
    setFilteredProducts(filtered);
  };

  const handleStockChange = (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );

    setFilteredProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  // Cambiar página
  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      fetchProducts(newPage, sortBy, order);
    }
  };

  // Cambiar orden
  const handleSortChange = (field: string) => {
    const newOrder = sortBy === field && order === 'asc' ? 'desc' : 'asc';
    setSortBy(field);
    setOrder(newOrder);
    fetchProducts(page, field, newOrder);
  };

  return (
    <div className="container mx-auto p-4 flex flex-col gap-8">
      <section className="bg-gray-100 rounded-xl p-4 shadow-sm gap-4">
        <ProductFilter
          onFilter={(newFilters) => {
            setFilters(newFilters);
            applyFilters(newFilters);
          }}
        />

        <NewProductButton
          onClick={() => {
            setSelectedProduct(undefined);
            setOpen(true);
          }}
        />
      </section>

      <section className="bg-white rounded-xl p-4 shadow-sm overflow-x-auto">
        <ProductTable
          products={filteredProducts}
          onEdit={(p) => {
            setSelectedProduct(p);
            setOpen(true);
          }}
          onDelete={handleDelete}
          onStockChange={handleStockChange}
        />
      </section>

      {/* 🔹 Controles de paginación */}
      <div className="flex justify-center gap-3 mt-4">
        <button
          disabled={page === 0}
          onClick={() => handlePageChange(page - 1)}
          className="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
        >
          ⬅️ Previous
        </button>
        <span className="font-medium">
          Page {page + 1} of {totalPages}
        </span>
        <button
          disabled={page >= totalPages - 1}
          onClick={() => handlePageChange(page + 1)}
          className="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
        >
          Next ➡️
        </button>
      </div>

      <section className="bg-white rounded-xl p-4 shadow-sm overflow-x-auto">
        <ProductSummary products={products} />
      </section>

      <ProductModal
        open={open}
        onClose={() => setOpen(false)}
        onSave={handleSave}
        product={selectedProduct}
      />
    </div>
  );
}

export default ProductManager;