import { useState } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import { Box, IconButton, Checkbox, Pagination } from '@mui/material';
import { DataGrid, GridRenderCellParams, GridSortModel } from '@mui/x-data-grid';
import { Edit, Delete } from '@mui/icons-material';
import { Product, ProductTableProps } from '../types/Product';
import styles from './styles/ProductTable.module.css';

function ProductTable({ products, onEdit, onDelete, onStockChange }: ProductTableProps) {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.down('lg'));

  const [sortModel, setSortModel] = useState<GridSortModel>([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const sortedProducts = [...products].sort((a, b) => {
    for (const sort of sortModel) {
      const { field, sort: direction } = sort;

      const valueA = a[field as keyof Product];
      const valueB = b[field as keyof Product];

      let comparison = 0;

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        comparison = valueA.localeCompare(valueB);
      } else if (typeof valueA === 'number' && typeof valueB === 'number') {
        comparison = valueA - valueB;
      } else {
        comparison = 0;
      }

      if (comparison !== 0) {
        return direction === 'asc' ? comparison : -comparison;
      }
    }
    return 0;
  });

  const paginatedProducts = sortedProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const columns = [
    {
      field: 'inStock',
      headerName: '',
      flex: 0.3,
      minWidth: 50,
      sortable: false,
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
    { field: 'category', headerName: 'Category', flex: 0.7, minWidth: 100, sortable: true },
    { field: 'name', headerName: 'Name', flex: 0.7, minWidth: 120, sortable: true },
    {
      field: 'price',
      headerName: 'Price',
      flex: 0.4,
      minWidth: 100,
      sortable: true,
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
      sortable: true,
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
      sortable: true,
      renderCell: (params: GridRenderCellParams) => {
        const stock = params.value;
        let color = 'inherit';
        if (stock < 5) color = 'red';
        else if (stock <= 10) color = 'orange';

        return (
          <span style={{ color, textDecoration: stock === 0 ? 'line-through' : 'none' }}>
            {stock}
          </span>
        );
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
      ),
    },
  ];

  return (
    <Box className={styles.box}>
      <DataGrid
        rows={paginatedProducts}
        columns={columns}
        hideFooter
        disableColumnMenu
        sx={{ width: '100%' }}
        sortingMode="server"
        sortingOrder={['asc', 'desc']}
        sortModel={sortModel}
        onSortModelChange={(newModel) => setSortModel(newModel)}
        getRowId={(row) => row.id!}
        getRowClassName={(params) => {
          const expDate = params.row.expirationDate;
          if (!expDate) return '';
          const diffDays = Math.ceil((new Date(expDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
          if (diffDays < 7) return 'row-red';
          if (diffDays <= 14) return 'row-yellow';
          return 'row-green';
        }}
      />

      <Pagination
        className={styles.pagination}
        count={Math.ceil(products.length / itemsPerPage)}
        page={page}
        onChange={(e, value) => setPage(value)}
      />
    </Box>
  );
}

export default ProductTable;
