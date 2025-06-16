import React from 'react';
import './App.css';

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

 {/* Rows for testing datagrid */}
const rows = [
  { id: 1,  category: 'Lácteos', name: 'Leche entera', price: '$25.00', 'expiration date': '2025-07-01', stock: 34, actions: 'Editar | Eliminar' },
  { id: 2, category: 'Panadería', name: 'Pan integral',  price: '$18.50', 'expiration date': '2025-06-15', stock: 50, actions: 'Editar | Eliminar' },
  { id: 3,  category: 'Lácteos', name: 'Queso Oaxaca', price: '$55.00', 'expiration date': '2025-07-05', stock: 20, actions: 'Editar | Eliminar' },
  { id: 4, category: 'Lácteos', name: 'Yogur griego',  price: '$30.00', 'expiration date': '2025-07-10', stock: 15, actions: 'Editar | Eliminar' },
  { id: 5,  category: 'Despensa', name: 'Arroz integral', price: '$22.00', 'expiration date': '2026-01-01', stock: 120, actions: 'Editar | Eliminar' },
  { id: 6, category: 'Frescura', name: 'Huevos orgánicos', price: '$40.00', 'expiration date': '2025-06-20', stock: 60, actions: 'Editar | Eliminar' },
  { id: 7,  category: 'Despensa', name: 'Aceite de oliva', price: '$75.00', 'expiration date': '2026-03-12', stock: 35, actions: 'Editar | Eliminar' },
  { id: 8, category: 'Desayuno', name: 'Cereal de avena',  price: '$28.00', 'expiration date': '2026-02-15', stock: 25, actions: 'Editar | Eliminar' },
  { id: 9,  category: 'Frutas', name: 'Manzanas rojas', price: '$15.00', 'expiration date': '2025-06-14', stock: 80, actions: 'Editar | Eliminar' },
  { id: 10,  category: 'Frutas', name: 'Plátanos', price: '$12.00', 'expiration date': '2025-06-12', stock: 70, actions: 'Editar | Eliminar' },
  { id: 11,  category: 'Limpieza', name: 'Detergente líquido', price: '$45.00', 'expiration date': '2027-05-01', stock: 40, actions: 'Editar | Eliminar' },
  { id: 12, category: 'Higiene',name: 'Jabón en barra', price: '$10.00', 'expiration date': '2027-01-10', stock: 90, actions: 'Editar | Eliminar' },
  { id: 13,  category: 'Hogar', name: 'Papel higiénico', price: '$35.00', 'expiration date': '2029-12-31', stock: 100, actions: 'Editar | Eliminar' },
  { id: 14, category: 'Despensa', name: 'Atún en lata', price: '$18.00', 'expiration date': '2027-09-01', stock: 45, actions: 'Editar | Eliminar' },
  { id: 15,  category: 'Bebidas', name: 'Agua embotellada', price: '$9.00', 'expiration date': '2026-04-22', stock: 200, actions: 'Editar | Eliminar' },
];



function App() {
  console.log("App cargando");
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
            rows={rows}
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
