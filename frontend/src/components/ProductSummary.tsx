
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { ProductSummaryProps } from '../types/Product';

import { useMediaQuery, useTheme } from '@mui/material';


function ProductSummary({products}: ProductSummaryProps) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  

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
    totalValue: data.totalValue.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' }),
    averagePrice: data.totalProducts > 0 
    ? (data.totalValue / data.totalProducts).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })
    : '$0.00',
    })); 
      
  rowsSummary.push({
    id: 'Overall',
    totalProducts: overallTotalProducts,
    totalValue: overallTotalValue.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' }),
    averagePrice: overallTotalProducts > 0
    ? (overallTotalValue / overallTotalProducts).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })
    : '$0.00',
  });

const columnsSummary = [
  {
    field: 'id',
    headerName: '',
    flex: isSmallScreen ? 0 : 0.5,
    minWidth: isSmallScreen ? 50 : 80,
  },
  {
    field: 'totalProducts',
    headerName: 'Total products',
    flex: isSmallScreen ? 0 : 1,
    minWidth: isSmallScreen ? 140 : 180,
  },
  {
    field: 'totalValue',
    headerName: 'Total Value',
    flex: isSmallScreen ? 0 : 1,
    minWidth: isSmallScreen ? 130 : 180,
  },
  {
    field: 'averagePrice',
    headerName: 'Average Price',
    flex: isSmallScreen ? 0 : 1,
    minWidth: isSmallScreen ? 150 : 200,
  },
];

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
