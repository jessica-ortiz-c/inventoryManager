import React from 'react';
import { useEffect, useState } from 'react';
import { Modal, Box, Button, Typography, FormControl, FormLabel,Select, MenuItem, TextField } from '@mui/material';

import { NumberField } from '@base-ui-components/react/number-field';
import styles from './index.module.css';

interface ProductModalProps {
  open: boolean;
  onClose: () => void;
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

const ProductModal: React.FC<ProductModalProps> = ({ open, onClose }) => {
    
    const id = React.useId();
    const [stock, setStock] = React.useState<number>(10);
    const [price, setPrice] = React.useState<number>(0.50);
    

    return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
       <FormControl component="fieldset" variant="standard" fullWidth>

        {/* Name */}
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent:'left',  gap: 2, m: 1 }}>
          <FormLabel sx={{ minWidth: 150 }}>Name</FormLabel>
          <TextField required id="product-name" variant="outlined" sx={{ flex: 1 }} />
        </Box>

        {/* Category */}
        <Box sx={{display: 'flex', flexDirection: 'row',  alignItems: 'center', justifyContent:'left',  gap: 2, m: 1 }}>
          <FormLabel sx={{ minWidth: 150 }}>Category</FormLabel>
          
          <Select required id="category" sx={{ flex: 1 }}>
            <MenuItem value="Food">Food</MenuItem>
            <MenuItem value="Electronics">Electronics</MenuItem>
            <MenuItem value="Clothing">Clothing</MenuItem>
          </Select>
        </Box>

        {/* Stock*/}
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent:'left',  gap: 2, m: 1}}>
          <FormLabel sx={{ minWidth: 150 }}>Stock</FormLabel>
            <NumberField.Root id={id} value={stock} min={0} max={1000} className={styles.Field}>  
              <NumberField.ScrubArea> 
                <NumberField.ScrubAreaCursor className={styles.ScrubAreaCursor}>
                <CursorGrowIcon />
                </NumberField.ScrubAreaCursor>
            </NumberField.ScrubArea>

            <NumberField.Group className={styles.Group}>
                <NumberField.Decrement
                    className={styles.Decrement}
                    onClick={() => setStock((prev) => Math.max(prev - 1, 0))} //Don't accept negative values
                >
                    <MinusIcon />
                </NumberField.Decrement>

                <NumberField.Input className={styles.Input} value={stock} onChange={(event) => setStock(Number(event.target.value))} />

                <NumberField.Increment
                    className={styles.Increment}
                    onClick={() => setStock((prev) => prev + 1)} // Adds one for each increment
                >
                    <PlusIcon />
                </NumberField.Increment>
            </NumberField.Group>
            </NumberField.Root>

        </Box>

        {/* Unit Price*/}
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent:'left',  gap: 2, m: 1}}>
          <FormLabel sx={{ minWidth: 150 }}>Unit Price</FormLabel>
          <NumberField.Root id={id} value={price} min={0} max={1000} className={styles.Field}>  
              <NumberField.ScrubArea> 
                <NumberField.ScrubAreaCursor className={styles.ScrubAreaCursor}>
                <CursorGrowIcon />
                </NumberField.ScrubAreaCursor>
            </NumberField.ScrubArea>

            <NumberField.Group className={styles.Group}>
                <NumberField.Decrement
                    className={styles.Decrement}
                    onClick={() => setPrice((prev) => Math.max(prev - 1, 0))} //Don't accept negative values
                >
                    <MinusIcon />
                </NumberField.Decrement>

                <NumberField.Input className={styles.Input} value={price}onChange={(event) => {
            const newValue = parseFloat(event.target.value);
            if (!isNaN(newValue)) {
                setPrice(newValue);
            }
        }} />

                <NumberField.Increment
                    className={styles.Increment}
                    onClick={() => setPrice((prev) => prev + 1)} // Adds one for each increment
                >
                    <PlusIcon />
                </NumberField.Increment>
            </NumberField.Group>
            </NumberField.Root>
        </Box>

        {/* Expiration Date*/}
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent:'left',  gap: 2, m: 1}}>
          <FormLabel sx={{ minWidth: 150 }}>Expiration Date</FormLabel>
          <TextField id="product-name" variant="outlined" type='date' sx={{ flex: 1 }}/>
        </Box>

        <Button>Save</Button>
        <Button>Cancel</Button>

      </FormControl>
      </Box>
    </Modal>
  );
};

export default ProductModal;


function CursorGrowIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      width="26"
      height="14"
      viewBox="0 0 24 14"
      fill="black"
      stroke="white"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M19.5 5.5L6.49737 5.51844V2L1 6.9999L6.5 12L6.49737 8.5L19.5 8.5V12L25 6.9999L19.5 2V5.5Z" />
    </svg>
  );
}

function PlusIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentcolor"
      strokeWidth="1.6"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M0 5H5M10 5H5M5 5V0M5 5V10" />
    </svg>
  );
}

function MinusIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentcolor"
      strokeWidth="1.6"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M0 5H10" />
    </svg>
  );
}
