import React from 'react';
import logo from './logo.svg';
import './App.css';

import { MenuItem, Select, Box, FormGroup, Checkbox, Button, FormControl, TextField,
   FormLabel, FormHelperText, FormControlLabel } from '@mui/material';

import { DataGrid, GridColDef } from '@mui/x-data-grid';


const columns = [
  { field: 'id', headerName: 'ID', flex: 0.5 },
  { field: 'name', headerName: 'Name', flex: 1 },
  { field: 'category', headerName: 'Category', flex: 1 },
  { field: 'price', headerName: 'Price', flex: 0.8 },
  { field: 'expiration date', headerName: 'Expiration Date', flex: 0.8 },
  { field: 'stock', headerName: 'Stocks', flex: 0.5 },
  { field: 'actions', headerName: 'Actions', flex: 1 },
];

const rows = [
  { id: 1, name: 'Leche entera', category: 'Lácteos', price: '$25.00', 'expiration date': '2025-07-01', stock: 34, actions: 'Editar | Eliminar' },
  { id: 2, name: 'Pan integral', category: 'Panadería', price: '$18.50', 'expiration date': '2025-06-15', stock: 50, actions: 'Editar | Eliminar' },
  { id: 3, name: 'Queso Oaxaca', category: 'Lácteos', price: '$55.00', 'expiration date': '2025-07-05', stock: 20, actions: 'Editar | Eliminar' },
  { id: 4, name: 'Yogur griego', category: 'Lácteos', price: '$30.00', 'expiration date': '2025-07-10', stock: 15, actions: 'Editar | Eliminar' },
  { id: 5, name: 'Arroz integral', category: 'Despensa', price: '$22.00', 'expiration date': '2026-01-01', stock: 120, actions: 'Editar | Eliminar' },
  { id: 6, name: 'Huevos orgánicos', category: 'Frescura', price: '$40.00', 'expiration date': '2025-06-20', stock: 60, actions: 'Editar | Eliminar' },
  { id: 7, name: 'Aceite de oliva', category: 'Despensa', price: '$75.00', 'expiration date': '2026-03-12', stock: 35, actions: 'Editar | Eliminar' },
  { id: 8, name: 'Cereal de avena', category: 'Desayuno', price: '$28.00', 'expiration date': '2026-02-15', stock: 25, actions: 'Editar | Eliminar' },
  { id: 9, name: 'Manzanas rojas', category: 'Frutas', price: '$15.00', 'expiration date': '2025-06-14', stock: 80, actions: 'Editar | Eliminar' },
  { id: 10, name: 'Plátanos', category: 'Frutas', price: '$12.00', 'expiration date': '2025-06-12', stock: 70, actions: 'Editar | Eliminar' },
  { id: 11, name: 'Detergente líquido', category: 'Limpieza', price: '$45.00', 'expiration date': '2027-05-01', stock: 40, actions: 'Editar | Eliminar' },
  { id: 12, name: 'Jabón en barra', category: 'Higiene', price: '$10.00', 'expiration date': '2027-01-10', stock: 90, actions: 'Editar | Eliminar' },
  { id: 13, name: 'Papel higiénico', category: 'Hogar', price: '$35.00', 'expiration date': '2029-12-31', stock: 100, actions: 'Editar | Eliminar' },
  { id: 14, name: 'Atún en lata', category: 'Despensa', price: '$18.00', 'expiration date': '2027-09-01', stock: 45, actions: 'Editar | Eliminar' },
  { id: 15, name: 'Agua embotellada', category: 'Bebidas', price: '$9.00', 'expiration date': '2026-04-22', stock: 200, actions: 'Editar | Eliminar' },
];



function App() {
  return (
    <div className="App">
      <header className="App-header">


        {/* First component */}
        <Box component="section" sx={{ p: 2, border: '1px solid',  width: '70%' }}>
          <FormControl component="fieldset" variant='standard'>
            <FormLabel component="label">Name</FormLabel>
            <TextField id="product-name" label="Product name" variant="outlined" />

            <FormLabel component="label">Category</FormLabel>
              <Select
                id="category"
                label="Select"
              >
                <MenuItem value={10}>Food</MenuItem>
                <MenuItem value={20}>Electronics</MenuItem>
                <MenuItem value={30}>Clothing</MenuItem>
              </Select>

            <FormLabel component="label">Availability</FormLabel>
              <Select
                id="availability"
                label="Select"
              >
                <MenuItem value={10}>In Stock</MenuItem>
                <MenuItem value={20}>Out of Stock</MenuItem>
                <MenuItem value={30}>All</MenuItem>
              </Select>
          </FormControl>
        </Box>

        <Button variant="outlined" >
          New product
        </Button>

        <FormHelperText>aqui va la tabla</FormHelperText>

        <div style={{ height: 400, width: '70%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10, page: 0 },
            },
          }}
          
        />
      </div>
      </header>
    </div>
  );
}

export default App;
