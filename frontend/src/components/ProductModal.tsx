import React, { useEffect, useState } from 'react';
import { Autocomplete, Modal, Box, Button, FormLabel, TextField } from '@mui/material';
import { NumberField } from '@base-ui-components/react';
import styles from './index.module.css';
import { Product } from '../types/Product';
import { useCategoryContext } from '../context/CategoryContext';

interface ProductModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
  product?: Product;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '35%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ProductModal: React.FC<ProductModalProps> = ({ open, onClose, onSave, product }) => {
  const id = React.useId();

  const [name, setName] = useState('');
  const { categories, addCategory } = useCategoryContext(); //Context for categories, it helps to new categories be saved 
  const [category, setCategory] = useState<string[]>([]);
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(0);
  const [expirationDate, setExpirationDate] = useState<string | null>(null);

  useEffect(() => {
    if (product) { //if there's a product, for editing
      setName(product.name);
      setCategory(product.category);
      setStock(product.stock);
      setPrice(product.price);
      setExpirationDate(product.expirationDate);
    } else { //if there's no product, for new product
      setName('');
      setCategory([]);
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
    if (category.length === 0) {
      alert('Select at least one');
      return;
    }
    
    const newProduct: Product = {
      id: product?.id,
      name,
      category,
      stock,
      price,
      expirationDate,
    };
    onSave(newProduct);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}  >
       
          {/* Name */}
          <Box sx={{ display: 'flex', gap: 2, m: 1, alignItems: 'center' }}>
            <FormLabel htmlFor="product-name" sx={{ minWidth: 100 }}>Name</FormLabel>
            <TextField id='product-name'
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              variant="outlined"
              sx={{ flex: 1 }}
            />
          </Box>

          {/* Category */}
          <Box sx={{ display: 'flex', gap: 2, m: 1, alignItems: 'center' }}>
            <FormLabel htmlFor="product-category" sx={{ minWidth: 100 }}>Category</FormLabel>
             <Autocomplete id='categories' sx={{ flex: 1}}
              multiple
              freeSolo
              options={categories}
              value={category}
              onChange={(event, newValue) => {
                setCategory(newValue);
                newValue.forEach((cat) => addCategory(cat)); // registra nuevas
              }}
              renderInput={(params) => (
                <TextField {...params}
                  id='product-category'
                  label="Category" placeholder="Select or type" />
              )}
            />
          </Box>

          {/* Stock */}
          <Box sx={{ display: 'flex', gap: 2, m: 1, alignItems: 'center' }}>
            <FormLabel htmlFor="product-stock" sx={{ minWidth: 100 }}>Stock</FormLabel>
            <NumberField.Root id={id} value={stock} min={0} max={1000} className={styles.Field}>
              <NumberField.Group className={styles.Group}>
                <NumberField.Decrement
                  className={styles.Decrement}
                  onClick={() => setStock((prev) => Math.max(prev - 1, 0))}
                >
                  <MinusIcon />
                </NumberField.Decrement>

                <NumberField.Input id='product-stock'
                  className={styles.Input}
                  value={stock}

                  onChange={(e) => {
                    const newValue = Number(e.target.value);
                    if (!isNaN(newValue)) setStock(newValue);
                  }}
                />
                <NumberField.Increment
                  className={styles.Increment}
                  onClick={() => setStock((prev) => prev + 1)}
                >
                  <PlusIcon />
                </NumberField.Increment>
              </NumberField.Group>
            </NumberField.Root>
          </Box>

          {/* Unit Price */}
          <Box sx={{ display: 'flex', gap: 2, m: 1, alignItems: 'center' }}>
            <FormLabel htmlFor="product-price" sx={{ minWidth: 100 }}>Unit Price</FormLabel>
            <NumberField.Root id={id} value={price} min={0} max={1000} className={styles.Field}>
              
              <NumberField.Group className={styles.Group}>
                <NumberField.Decrement
                  className={styles.Decrement}
                  onClick={() => setPrice((prev) => Math.max(prev - 1, 0))}
                >
                  <MinusIcon />
                </NumberField.Decrement>
                <NumberField.Input id="product-price"
                  className={styles.Input}
                  value={price}
                  onChange={(e) => {
                    const newValue = parseFloat(e.target.value);
                    if (!isNaN(newValue)) setPrice(newValue);
                  }}
                />
                <NumberField.Increment
                  className={styles.Increment}
                  onClick={() => setPrice((prev) => prev + 1)}
                >
                  <PlusIcon />
                </NumberField.Increment>
              </NumberField.Group>
            </NumberField.Root>
          </Box>

          {/* Expiration Date */}
          <Box sx={{ display: 'flex', gap: 2, m: 1, alignItems: 'center' }}>
            <FormLabel htmlFor="expiration-date" sx={{ minWidth: 100 }}>Expiration Date</FormLabel>
            <TextField id='expiration-date'
              type="date"
              value={expirationDate || ''} // convierte null a string vacío
              onChange={(e) => setExpirationDate(e.target.value || null)}
              variant="outlined"
              sx={{ flex: 1 }}
            />
          </Box>

          {/* Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, gap: 2 }}>
            <Button 
              variant="outlined" 
              color="primary" 
              onClick={handleSave}
              sx={{flex: 1}}> Save</Button>
            <Button 
              variant="outlined" 
              onClick={onClose}
              sx={{flex: 1}} >Cancel</Button>
          </Box>
      </Box>
    </Modal>
  );
};

export default ProductModal;

// Functions for FieldNumber

function PlusIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.6" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M0 5H10M5 0V10" />
    </svg>
  );
}

function MinusIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.6" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M0 5H10" />
    </svg>
  );
}
