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


  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:9090/products');
      const data = await res.json();
      setProducts(data);
      setFilteredProducts(data);
    } catch (err) {
      console.error('Error fetching products', err);
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
      await fetchProducts();
      setOpen(false);
    } else {
      alert('Error saving product');
    }
  };

  const handleDelete = async (product: Product) => {
    const confirm = window.confirm(`Delete ${product.name}?`);
    if (!confirm) return;

    const res = await fetch(`http://localhost:9090/products/${product.id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      await fetchProducts();
    } else {
      alert('Error deleting');
    }
  };

  // Esta función aplica el filtro a los productos según filters
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

  return (
    <>
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

      <ProductTable
        products={filteredProducts}
        onEdit={(p) => {
          setSelectedProduct(p);
          setOpen(true);
        }}
        onDelete={handleDelete}
      />

      <ProductSummary products={products} />

      <ProductModal
        open={open}
        onClose={() => setOpen(false)}
        onSave={handleSave}
        product={selectedProduct}
      />
    </>
  );
}

export default ProductManager;
