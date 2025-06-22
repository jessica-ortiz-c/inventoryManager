import { DataGrid } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
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

  return (
    <DataGrid
      rows={products}
      columns={columns}
      getRowId={(row) => row.id!}
      initialState={{
        pagination: { paginationModel: { pageSize: 10, page: 0 } },
      }}
      disableColumnMenu
      pageSizeOptions={[10]} 
      checkboxSelection
    />
  );
}
export default ProductTable;