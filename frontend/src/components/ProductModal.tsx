import React, { useEffect, useState } from 'react';
import { Product, ProductModalProps } from '../types/Product';
import { useCategoryContext } from '../context/CategoryContext';

const ProductModal: React.FC<ProductModalProps> = ({ open, onClose, onSave, product }) => {
 // const id = React.useId();
  const [name, setName] = useState('');
  const { categories, addCategory } = useCategoryContext(); //Context for categories, it helps to new categories be saved 
  const [category, setCategory] = useState<string>(''); // un único string

  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(0);
  const [expirationDate, setExpirationDate] = useState<string>(''); // nunca null


  useEffect(() => {
    if (product) { //if there's a product, for editing
      setName(product.name);
      setCategory(product.category);
      setStock(product.stock);
      setPrice(product.price);
      setExpirationDate(product.expirationDate || '');
    } else { //if there's no product, for new product
      setName('');
      setCategory('');
      setStock(0);
      setPrice(0);
      setExpirationDate('');
    }
  }, [product, open]);

  //simple validations
    const handleSave = () => {
  if (!name.trim()) {
    alert('Name is required');
    return;
  }
  if (!category) {
    alert('Select a category');
    return;
  }

  const newProduct: Product = {
    id: product?.id,
    name,
    category,
    stock: isNaN(stock) ? 0 : stock,
    price: isNaN(price) ? 0 : price,
    expirationDate: expirationDate ? expirationDate : null,
  };

  console.log("Producto a guardar:", newProduct);
  onSave(newProduct);
  onClose();
}; 

  

  return (
     <div
      className={`fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 transition-opacity duration-300
        ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
    >
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg space-y-5">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          {product ? 'Edit Product' : 'Add New Product'}
        </h2>
       
          {/* Name */}
          <div>
          <label className="block text-sm font-semibold mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

          {/* Category */}
          <div>
          <label className="block text-sm font-semibold mb-1">Category</label>
         <div className="flex flex-wrap gap-2 border border-gray-300 p-2 rounded-lg">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setCategory(cat)} // solo asigna una categoría
            className={`px-3 py-1 rounded-full text-sm ${
              category === cat ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

        </div>

          {/* Stock */}
           <div className="flex items-center justify-between">
          <label className="font-semibold">Stock</label>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setStock((prev) => Math.max(prev - 1, 0))}
              
              className="px-2 py-1 border rounded-md bg-gray-100 hover:bg-gray-200"
              
            >
              -
            </button>
            <input
              type="number"
              min={0}
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
              className="w-16 text-center border border-gray-300 rounded-md"
            />
            <button
              onClick={() => setStock((prev) => prev + 1)}
              className="px-2 py-1 border rounded-md bg-gray-100 hover:bg-gray-200"
            >
              +
            </button>
          </div>
        </div>

          {/* Unit Price */}
          <div className="flex items-center justify-between">
          <label className="font-semibold">Unit Price</label>
          <input
            type="number"
            min={0}
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            className="w-32 border border-gray-300 rounded-lg px-3 py-1 text-right"
          />
        </div>


          {/* Expiration Date */}
          <div>
          <label className="block text-sm font-semibold mb-1">Expiration Date</label>
          <input
            type="date"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)} // 👈 sin null
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />

        </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-3">
          <button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-4 py-2 transition-colors"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="border border-gray-300 hover:bg-gray-100 rounded-lg px-4 py-2 font-semibold"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;