import {useState } from 'react';
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import { Box, IconButton, Pagination, Checkbox } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { Product, ProductTableProps } from '../types/Product';
import { useMediaQuery, useTheme } from '@mui/material';

import styles from './styles/ProductTable.module.css';

function ProductTable({ products, onEdit, onDelete, onStockChange }: ProductTableProps) {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.down('lg'));
  
  const columns = [
    {
      field: 'inStock', 
      headerName: '',
      flex: 0.3,
      minWidth: 50,
      renderCell: (params: GridRenderCellParams) => {
        const product: Product = params.row;

        return (
          <Checkbox
            checked={product.stock === 0}
            onChange={(e) => {
              const isChecked = e.target.checked;
              const newStock = isChecked ? 0 : 10;
              const updatedProduct = { ...product, stock: newStock };
              onStockChange(updatedProduct);
            }}
            color="primary"
          />
        );
      },
    },
    { field: 'category', headerName: 'Category', flex: 0.7,   minWidth: 100},
    { field: 'name', headerName: 'Name', flex: 0.7,   minWidth: 120 },
    {
      field: 'price',
      headerName: 'Price',
      flex: 0.4,
      minWidth: 100,
      renderCell: (params: GridRenderCellParams) => {
        const price = Number(params.value).toLocaleString('es-MX');
        return <span>${price}</span>;
      },
    },

    {
      field: 'expirationDate',
      headerName: 'Expiration Date',
      flex: 0.6,
        minWidth: 120,
      renderCell: (params: GridRenderCellParams) => {
        const expDate = params.value;
        return expDate ? expDate : 'N/A';
      },
    },
    {
      field: 'stock',
      headerName: 'Stock',
      flex: 0.5,
      minWidth: 80, 
      renderCell: (params: GridRenderCellParams) => {
        const stock = params.value;
        let color = 'inherit';
        if (stock < 5) color = 'red';
        else if (stock <= 10) color = 'orange';


        const style = {
          color,
          textDecoration: stock === 0 ? 'line-through' : 'none',
        };

        return <span style={style}>{stock}</span>;
      },
    },

    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
        minWidth: 120,
      sortable: false,
      filterable: false,
      renderCell: (params: { row: Product }) => (
      <>
        <IconButton color="primary" onClick={() => onEdit(params.row)} title="Edit">
          <Edit />
          {!isLargeScreen && <span style={{ marginLeft: 4 }}>Edit</span>}
        </IconButton>
        <IconButton color="error" onClick={() => onDelete(params.row)} title="Delete">
          <Delete />
          {!isLargeScreen && <span style={{ marginLeft: 4 }}>Delete</span>}
        </IconButton>
      </>
    )
    },
  ];

  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const paginatedProducts = products.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Box className={styles.box} sx={{overflowX: 'auto'}}>
      <DataGrid className='table'
        rows={paginatedProducts}
        columns={columns}
        getRowId={(row) => row.id!}
        pageSizeOptions={[5, 10, 20]}
        getRowClassName={(params) => {
          const expDate = params.row.expirationDate;
          if (!expDate) return '';
          
          const diffDays = Math.ceil((new Date(expDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24));

          if (diffDays < 7) return 'row-red';
          if (diffDays <= 14) return 'row-yellow';
          return 'row-green';
        }}

        hideFooter
        disableColumnMenu
        sx={{width: '100%'}}
      />
      
      

      <Pagination className={styles.pagination}
        count={Math.ceil(products.length / itemsPerPage)}
        page={page}
        onChange={(e, value) => setPage(value)}
      />
    </Box>
  );
}

export default ProductTable;