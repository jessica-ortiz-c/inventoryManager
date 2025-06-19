import { useState, useEffect } from 'react';

import { Product } from '../types/Product';

import ProductTable from './ProductTable';
import ProductModal from './ProductModal';
import NewProductButton from './NewProductButton';
import ProductSummary from './ProductSummary';

function ProductManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);

  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:9090/products');
      const data = await res.json();
      setProducts(data);
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
      await fetchProducts(); // Refresh products
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
      await fetchProducts(); // Refresh products
    } else {
      alert('Error deleting');
    }
  };

  return (
    <>
      <NewProductButton
        onClick={() => {
          setSelectedProduct(undefined);
          setOpen(true);
        }}
      />

    
      <ProductTable
        products={products}
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
