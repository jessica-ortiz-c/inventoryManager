import React from 'react';
import { Box, FormControl, FormLabel, TextField, Select, MenuItem, Button } from '@mui/material';

function ProductFilter() {
  return (
    <Box component="section" sx={{ p: 2, border: '1px solid' }}>
      <FormControl component="fieldset" variant="standard" fullWidth>

        {/* Name */}
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent:'left',  gap: 2, m: 2 }}>
          <FormLabel sx={{ minWidth: 150 }}>Name</FormLabel>
          <TextField id="product-name" variant="outlined" sx={{ flex: 0.5 }} />
        </Box>

        {/* Category */}
        <Box sx={{display: 'flex', flexDirection: 'row',  alignItems: 'center', justifyContent:'left',  gap: 2, m: 2 }}>
          <FormLabel sx={{ minWidth: 150 }}>Category</FormLabel>
          <Select id="category" sx={{ flex: 0.5 }}>
            <MenuItem value="Food">Food</MenuItem>
            <MenuItem value="Electronics">Electronics</MenuItem>
            <MenuItem value="Clothing">Clothing</MenuItem>
          </Select>
        </Box>

        {/* Availability */}
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent:'left',  gap: 2, m: 2}}>
          <FormLabel sx={{ minWidth: 150 }}>Availability</FormLabel>
          <Select id="availability" sx={{ flex: 0.55 }}>
            <MenuItem value="in">In Stock</MenuItem>
            <MenuItem value="out">Out of Stock</MenuItem>
            <MenuItem value="all">All</MenuItem>
          </Select>
          <Button variant="outlined">Search</Button>
        </Box>

      </FormControl>
    </Box>
  );
}

export default ProductFilter;
