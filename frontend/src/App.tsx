import React from 'react';
import './App.css';

import { useState, useEffect } from 'react';

import ProductFilter from './components/ProductFilter';   
import NewProductButton from './components/NewProductButton';
import ProductTable from './components/ProductTable';
import ProductSummary from './components/ProductSummary';


const handleNewProductClick = () => {
  console.log("New product button clicked");
  //OnClick func
};

function App() {
  console.log("App loading ...");

  const [products, setProducts] = useState([]);

  // Loads the products 
  useEffect(() => {
    fetch('http://localhost:9090/products')
      .then((res) => res.json()) 
      .then((data) => setProducts(data))
      .catch((err) => console.error(err)); 
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <main className="App-body">
          {/* First component */}
          <ProductFilter/>
      
          {/* Second component */}
          <NewProductButton onClick={handleNewProductClick} />
          
          {/* Third component and Fourth component */}
          <ProductTable/>
          {/* <Pagination count={10} sx={{display: 'flex', alignContent:'center', justifyContent:'center'}} /> */}
          
           {/* Last component */}
          <ProductSummary/>
        </main>
      </header >
    </div>
  );
}

export default App;
