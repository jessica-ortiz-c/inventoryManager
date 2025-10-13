import { useState, useEffect } from "react";
import { Product } from "../types/Product";

import ProductFilter from "./ProductFilter";
import ProductTable from "./ProductTable";
import ProductModal from "./ProductModal";
import NewProductButton from "./NewProductButton";
import ProductSummary from "./ProductSummary";
import { useCategoryContext } from "../context/CategoryContext";
import { productService } from "../services/productService";

interface Filters {
  name: string;
  availability: string;
  category: string[];
}

function ProductManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);

  const { refreshCategories } = useCategoryContext();

  // 🔹 Filtros y paginación
  const [filters, setFilters] = useState<Filters>({ name: "", availability: "all", category: [] });
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("name");
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  // Estado nuevo
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  // 🔹 Cargar productos desde el backend
  const fetchProducts = async (pageNum = 0) => {
    try {
      const data = await productService.getProducts({
        page: pageNum,
        size,
        sortBy,
        order,
        name: filters.name,
        category: filters.category.join(","), // backend recibe como string
        availability: filters.availability,
      });

      if (data.products) {
        setProducts(data.products);
        setTotalPages(data.totalPages);
      } else {
        setProducts([]);
        setTotalPages(1);
      }

      setPage(pageNum);
    } catch (err) {
      console.error("❌ Error fetching products:", err);
    }
  };

const fetchAllProducts = async () => {
  try {
    const data = await productService.getProducts({
      page: 0,
      size: 9999,
      sortBy: "name",
      order: "asc",
    });
    setAllProducts(data.products || []);
  } catch (err) {
    console.error("❌ Error fetching all products:", err);
  }
};

  // 🔹 Efecto: recargar al cambiar filtros o sort
useEffect(() => {
  fetchProducts();
  fetchAllProducts();
}, [filters, sortBy, order]);

  // 🔹 Guardar producto
  const handleSave = async (product: Product) => {
    const isEdit = Boolean(product.id);
    const url = isEdit
      ? `http://localhost:9090/products/${product.id}`
      : "http://localhost:9090/products";
    const method = isEdit ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });

    if (response.ok) {
      fetchProducts(page);
      await refreshCategories();
      setOpen(false);
    } else {
      alert("❌ Error saving product");
    }
  };

  // 🔹 Eliminar producto
  const handleDelete = async (product: Product) => {
    if (!window.confirm(`¿Eliminar ${product.name}?`)) return;

    const res = await fetch(`http://localhost:9090/products/${product.id}`, {
      method: "DELETE",
    });

    if (res.ok) fetchProducts(page);
    else alert("❌ Error deleting product");
  };

  // 🔹 Cambiar página
  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) fetchProducts(newPage);
  };

  return (
    <div className="container mx-auto p-4 flex flex-col gap-8">
      {/* Filtro y botón */}
      <section className="bg-gray-100 rounded-xl p-4 shadow-sm gap-4">
        <ProductFilter onFilter={setFilters} />
        <NewProductButton
          onClick={() => {
            setSelectedProduct(undefined);
            setOpen(true);
          }}
        />
      </section>

      {/* Tabla */}
      <section className="bg-white rounded-xl p-4 shadow-sm overflow-x-auto">
        <ProductTable
          products={products}
          onEdit={(p) => {
            setSelectedProduct(p);
            setOpen(true);
          }}
          onDelete={handleDelete}
          onSortChange={(field) => {
            const newOrder = sortBy === field && order === "asc" ? "desc" : "asc";
            setSortBy(field);
            setOrder(newOrder);
          }}
          sortBy={sortBy}
          order={order}
        />
      </section>

      {/* Paginación */}
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
        <ProductSummary products={allProducts} />
      </section>

      <ProductModal open={open} onClose={() => setOpen(false)} onSave={handleSave} product={selectedProduct} />
    </div>
  );
}

export default ProductManager;
