
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';



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

function ProductSummary() {
  return (
    <Box>
      <DataGrid
        sx={{
          p: '10px',
          '& .MuiDataGrid-cell': { display: 'flex', alignContent: 'center' },
          '& .MuiDataGrid-columnHeader': { justifyContent: 'center' },
        }}
        rows={rowsSummary}
        columns={columnsSummary}
        hideFooter
        autoHeight
      />
    </Box>
  );
}

export default ProductSummary;
