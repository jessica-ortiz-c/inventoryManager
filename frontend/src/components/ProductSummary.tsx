
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Product } from '../types/Product';

interface ProductSummaryProps {
  products: Product[];
}

const columnsSummary = [
  { field: 'id', headerName: '', flex: 0.5 },
  { field: 'totalProducts', headerName: 'Total products in Stock', flex: 1 },
  { field: 'totalValue', headerName: 'Total Value in Stock', flex: 1 },
  { field: 'averagePrice', headerName: 'Average price in Stock', flex: 1 },
];

function ProductSummary({products}: ProductSummaryProps) {
  if (!Array.isArray(products)) return null;
  //Stores data by category, e.g. => "Food": {totalProducts: 5, totalValue: 100}
  const summaryByCategory: { [key: string]: { totalProducts: number; totalValue: number } } = {};

  let overallTotalProducts = 0; 
  let overallTotalValue = 0;

  products.forEach((product) => { //calculate for each product
    const { category, stock, price } = product;
    const productTotal = stock * price; 

    const categories = Array.isArray(category) ? category : [category];

    categories.forEach((cat) => { //
      if (!summaryByCategory[cat]) { //if there's not  data for that category
        summaryByCategory[cat] = { totalProducts: 0, totalValue: 0 };
      }

      summaryByCategory[cat].totalProducts += stock; //total stock for each category
      summaryByCategory[cat].totalValue += productTotal; //total value for each category
    });

    overallTotalProducts += stock;
    overallTotalValue += productTotal;
  });

  const rowsSummary = Object.entries(summaryByCategory).map(([cat, data]) => ({
    id: cat, //category
    totalProducts: data.totalProducts,
    totalValue: data.totalValue.toFixed(2),
    averagePrice: data.totalProducts > 0 ? (data.totalValue / data.totalProducts).toFixed(2) : '0.00',
  })); 

  
  rowsSummary.push({
    id: 'Overall',
    totalProducts: overallTotalProducts,
    totalValue: overallTotalValue.toFixed(2),
    averagePrice: overallTotalProducts > 0
      ? (overallTotalValue / overallTotalProducts).toFixed(2)
      : '0.00',
  });



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
