
import './App.css';

import { useState, useEffect } from 'react';

import ProductFilter from './components/ProductFilter';   
import ProductManager from './components/ProductManager';

import ProductModal from './components/ProductModal';
import { Product } from './types/Product';
import { CategoryProvider } from './context/CategoryContext';


function App() {
  console.log("App loading ...");

  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | undefined>();

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setProductToEdit(undefined);
  };

  const loadProducts = () => {
    fetch('http://localhost:9090/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error('Error al cargar productos', err));
  };

  useEffect(() => {
    loadProducts(); // first load
  }, []);

  const handleSaveProduct = async (product: Product) => {
    const method = product.id ? 'PUT' : 'POST';
    const url = product.id
      ? `http://localhost:9090/products/${product.id}`
      : 'http://localhost:9090/products';

    console.log('Producto a guardar:', product);

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });

      if (res.ok) {
        loadProducts(); // recarga productos actualizados
        handleCloseModal(); // cierra modal
        console.log('Guardado con éxito');
      } else {
        const msg = await res.text();
        console.error('Error al guardar:', msg);
        alert('Error al guardar el producto.');
      }
    } catch (error) {
      console.error('Error de red al guardar producto:', error);
      alert('No se pudo conectar con el backend.');
    }
  };

  return (
    <CategoryProvider>
    <div className="App">
      <header className="App-header">
        <main className="App-body">

          {/*Manages the components */}
          <ProductManager />
          {/* <Pagination count={10} sx={{display: 'flex', alignContent:'center', justifyContent:'center'}} /> */}
          
         <ProductModal
            open={isModalOpen}
            onClose={handleCloseModal}
            product={productToEdit}
            onSave={handleSaveProduct}
          />
          
        </main>
      </header >
    </div>
    </CategoryProvider>
  );
}

export default App;
