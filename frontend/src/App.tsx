import React from 'react';
import './App.css';

import { useState, useEffect } from 'react';

import { MenuItem, Select, Box, FormGroup, Checkbox, Button, FormControl, TextField,
   FormLabel, FormHelperText, FormControlLabel,Pagination } from '@mui/material';

import { DataGrid, GridColDef } from '@mui/x-data-grid';


const columns = [
  { field: 'category', headerName: 'Category', flex: 1 },
  { field: 'name', headerName: 'Name', flex: 1 },
  { field: 'price', headerName: 'Price', flex: 0.8 },
  { field: 'expiration date', headerName: 'Expiration Date', flex: 0.8 },
  { field: 'stock', headerName: 'Stocks', flex: 0.5 },
  { field: 'actions', headerName: 'Actions', flex: 1 },
];

const columnsSummary = [
  { field: 'id', headerName: '', flex: 0.5 },
  { field: 'totalProducts', headerName: 'Total products in Stock', flex: 1 },
  { field: 'totalValue', headerName: 'Total Value in Stock', flex: 1 },
  { field: 'averagePrice', headerName: 'Average price in Stock', flex: 1 },
];

const rowsSummary = [
  { id: 'Food', totalProducts: 0 , totalValue: 0, averagePrice: 0 },
  { id: 'Electronics', totalProducts: 0 , totalValue: 0, averagePrice: 0 },
  { id: 'Clothing', totalProducts: 0 , totalValue: 0, averagePrice: 0 },
  { id: 'Overall', totalProducts: 0 , totalValue: 0, averagePrice: 0 },
];


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
        <Box component="section" sx={{ p: 2, border: '1px solid'}}>
          <FormControl component="fieldset" variant="standard" fullWidth>
    
            {/* Name */}
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent:'left',  gap: 2, m: 2 }}>
              <FormLabel sx={{ minWidth: 150 }}>Name</FormLabel>
              <TextField id="product-name" variant="outlined"  sx={{ flex: 0.5 }} />
            </Box>

            {/* Category */}
            <Box sx={{display: 'flex', flexDirection: 'row',  alignItems: 'center', justifyContent:'left',  gap: 2, m: 2 }}>
              <FormLabel sx={{ minWidth: 150 }}>Category</FormLabel>
              <Select id="category"  sx={{ flex: 0.5}}>
                <MenuItem value={10}>Food</MenuItem>
                <MenuItem value={20}>Electronics</MenuItem>
                <MenuItem value={30}>Clothing</MenuItem>
              </Select>
            </Box>

            {/* Availability */}
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent:'left',  gap: 2, m: 2}}>
              <FormLabel sx={{ minWidth: 150 }}>Availability</FormLabel>
              <Select id="availability" sx={{ flex: 0.55 }}>
                <MenuItem value={10}>In Stock</MenuItem>
                <MenuItem value={20}>Out of Stock</MenuItem>
                <MenuItem value={30}>All</MenuItem>
              </Select>
              <Button variant="outlined">Search</Button>
            </Box>
          </FormControl>
        </Box>


         {/* Second component */}

        <Button variant="outlined" sx={{p:'10px', width: '25%'}} >
          New product
        </Button>


        
         {/* Third component and Fourth component */}
        <Box style={{ width: '100%' }}>
          <DataGrid 
            rows={products}
            columns={columns}
            checkboxSelection
            hideFooter
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10, page: 0 },
              },
            }}
            disableColumnMenu
            

          />
          {/* <Pagination count={10} sx={{display: 'flex', alignContent:'center', justifyContent:'center'}} /> */}
        </Box>


        <Box sx={{}}>
            <DataGrid sx={{p:'10px', 
            '& .MuiDataGrid-cell':{display: 'flex', alignContent:'center'}, 
            '& .MuiDataGrid-columnHeader':{ justifyContent: 'center'}}}
            rows={rowsSummary}
            columns={columnsSummary}

            hideFooter
            autoHeight
          />


        </Box>
      </main>
      </header >


    </div>
  );
}

export default App;
