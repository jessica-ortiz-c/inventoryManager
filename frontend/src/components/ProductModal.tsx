import React, { useEffect, useState } from 'react';
import { Autocomplete, Modal, Box, Button, FormControl, FormLabel, Select, MenuItem, TextField } from '@mui/material';
import { NumberField } from '@base-ui-components/react/number-field';
import styles from './index.module.css';
import { Product } from '../types/Product';

const categoriesOptions = ['Food', 'Electronics', 'Clothing'];


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
      <Box sx={style}>
        <FormControl component="fieldset" variant="standard" fullWidth>
          {/* Name */}
          <Box sx={{ display: 'flex', gap: 2, m: 1, alignItems: 'center' }}>
            <FormLabel sx={{ minWidth: 150 }}>Name</FormLabel>
            <TextField
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              variant="outlined"
              sx={{ flex: 1 }}
            />
          </Box>

          {/* Category */}
          <Box sx={{ display: 'flex', gap: 2, m: 1, alignItems: 'center' }}>
            <FormLabel sx={{ minWidth: 150 }}>Category</FormLabel>
             <Autocomplete
              multiple
              freeSolo
              options={categoriesOptions}
              value={category}
              onChange={(event, newValue) => {
                setCategory(newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Category" placeholder="Select or type" />
              )}
            />
          </Box>

          {/* Stock */}
          <Box sx={{ display: 'flex', gap: 2, m: 1, alignItems: 'center' }}>
            <FormLabel sx={{ minWidth: 150 }}>Stock</FormLabel>
            <NumberField.Root id={id} value={stock} min={0} max={1000} className={styles.Field}>
              <NumberField.Group className={styles.Group}>
                <NumberField.Decrement
                  className={styles.Decrement}
                  onClick={() => setStock((prev) => Math.max(prev - 1, 0))}
                >
                  <MinusIcon />
                </NumberField.Decrement>

                <NumberField.Input
                  className={styles.Input}
                  value={stock}
                  onChange={(e) => setStock(Number(e.target.value))}
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
            <FormLabel sx={{ minWidth: 150 }}>Unit Price</FormLabel>
            <NumberField.Root id={id} value={price} min={0} max={1000} className={styles.Field}>
              <NumberField.Group className={styles.Group}>
                <NumberField.Decrement
                  className={styles.Decrement}
                  onClick={() => setPrice((prev) => Math.max(prev - 1, 0))}
                >
                  <MinusIcon />
                </NumberField.Decrement>

                <NumberField.Input
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
            <FormLabel sx={{ minWidth: 150 }}>Expiration Date</FormLabel>
            <TextField
              type="date"
              value={expirationDate || ''} // convierte null a string vacío
              onChange={(e) => setExpirationDate(e.target.value || null)}
              variant="outlined"
              sx={{ flex: 1 }}
            />
          </Box>

          {/* Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, gap: 2 }}>
            <Button variant="outlined" onClick={onClose}>Cancel</Button>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
          </Box>
        </FormControl>
      </Box>
    </Modal>
  );
};

export default ProductModal;

// Icons

function CursorGrowIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg width="26" height="14" viewBox="0 0 24 14" fill="black" stroke="white" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M19.5 5.5L6.5 5.5V2L1 7L6.5 12V8.5H19.5V12L25 7L19.5 2V5.5Z" />
    </svg>
  );
}

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
