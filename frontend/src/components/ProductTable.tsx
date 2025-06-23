import {useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, IconButton, Pagination } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { Product } from '../types/Product';

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
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
          <IconButton color="primary" onClick={() => onEdit(params.row)}>
            <Edit />Edit
          </IconButton>
          <IconButton color="error" onClick={() => onDelete(params.row)}>
            <Delete />Delete
          </IconButton>
        </>
      ),
    },
  ];

  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const paginatedProducts = products.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Box sx={{display: 'flex', alignItems: 'center', flexDirection:'column'}}>
      <DataGrid
        rows={paginatedProducts}
        columns={columns}
        getRowId={(row) => row.id!}
        pageSizeOptions={[5, 10, 20]}
        autoHeight
        checkboxSelection
        hideFooter
        disableColumnMenu
        sx={{width: '100%'}}
      />
      
      <Pagination
        count={Math.ceil(products.length / itemsPerPage)}
        page={page}
        onChange={(e, value) => setPage(value)}
        sx={{  mt: 2 }}
      />
    </Box>
  );
}

export default ProductTable;