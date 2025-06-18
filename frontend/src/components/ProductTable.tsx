import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

import { Product } from '../types/Product';

function ProductTable() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('http://localhost:9090/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(console.error);
  }, []);

  const handleDelete = async (product: Product) => {
    if (window.confirm(`Do you want to remove ${product.name}?`)) {
      try {
        const res = await fetch(`http://localhost:9090/products/${product.id}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          setProducts(prev => prev.filter(p => p.id !== product.id));
        } else {
          alert('Error removing the product');
        }
      } catch (error) {
        alert('Error in the conexion to remove');
      }
    }
  };

  const handleEdit = (product: Product) =>{
      
  }

  const columns = [
    { field: 'category', headerName: 'Category', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'price', headerName: 'Price', flex: 0.8 },
    { field: 'expirationDate', headerName: 'Expiration Date', flex: 0.8 },
    { field: 'stock', headerName: 'Stock', flex: 0.5 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      sortable: false,
      filterable: false,
      renderCell: (params: { row: Product }) => (
        <>
          <IconButton color="primary" onClick={() => alert('Editar ' + params.row.name)}>
            <Edit />Edit
          </IconButton>
          <IconButton color="error" onClick={() => handleDelete(params.row)}>
            <Delete />Delete
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <DataGrid
      rows={products}
      columns={columns}
      getRowId={(row) => row.id!}
      initialState={{
        pagination: { paginationModel: { pageSize: 10, page: 0 } },
      }}
      disableColumnMenu
      checkboxSelection
    />
  );
}

export default ProductTable;
