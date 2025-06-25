import {useState } from 'react';
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import { Box, IconButton, Pagination } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { Product } from '../types/Product';
import styles from './styles/ProductTable.module.css';

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
    {
  field: 'stock',
  headerName: 'Stock',
  flex: 0.5,
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
    <Box className={styles.box}>
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