import React, { useState , useEffect } from 'react';
import { Box, FormControl, FormLabel, TextField,Select,  MenuItem,  Button,  Autocomplete } from '@mui/material';
import { useCategoryContext } from '../context/CategoryContext';
import styles from './styles/ProductFilter.module.css'
import '../App.css'; // o el nombre del archivo global donde definiste la clase


interface FilterProps {
  onFilter: (filters: {
    name: string;
    category: string[];
    availability: string;
  }) => void;
}

function ProductFilter({ onFilter }: FilterProps) {
  const { categories } = useCategoryContext();

  const [name, setName] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [availability, setAvailability] = useState('all');

  const handleSearch = () => {
    onFilter({
      name,
      category: selectedCategories,
      availability,
    });
  };


  return (
    <Box component="section" className={styles.section}>

        {/* Name */}
        <Box className={styles.box}>  {/* sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2, m: 2 }} */}
          <FormLabel className={styles.label}
            >Name</FormLabel>
          <TextField
            id="product-name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ flex: 0.5 }}
          />
        </Box>

        {/* Category */}
        <Box className={styles.box}>
          <FormLabel className={styles.label}>Category</FormLabel>
          <Autocomplete
            multiple
            options={categories}
            value={selectedCategories}
            onChange={(e, newValue) => setSelectedCategories(newValue)}
            renderInput={(params) => <TextField {...params} label="Category" />}
            sx={{ flex: 0.5 }}
          />
        </Box>

        {/* Availability */}
        <Box className={styles.box}>
          <FormLabel className={styles.label} >Availability</FormLabel>
          <Select
            id="availability"
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            sx={{ flex: 0.5 }}
          >
            <MenuItem value="in">In Stock</MenuItem>
            <MenuItem value="out">Out of Stock</MenuItem>
            <MenuItem value="all">All</MenuItem>
          </Select>
          <Button variant="outlined" className={styles.searchbtn}
          onClick={handleSearch}>
            Search
          </Button>
        </Box>
    </Box>
  );
}

export default ProductFilter;
