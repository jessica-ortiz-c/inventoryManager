export interface Product {
  id?: string;
  name: string;
  category: string;     
  price: number;
  stock: number;
  expirationDate: string | null; //could be null
}

export interface ProductTableProps {
    products: Product[];
    onEdit: (product: Product) => void;
    onDelete: (product: Product) => void;
    onStockChange: (product: Product) => void; 
}


export interface ProductModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
  product?: Product;
}

export interface ProductSummaryProps {
  products: Product[];
}

export interface PaginatedResponse {
  content: Product[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}
