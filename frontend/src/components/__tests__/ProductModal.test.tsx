import { render, screen, fireEvent } from '@testing-library/react';
import ProductModal from '../ProductModal';
import { CategoryProvider } from '../../context/CategoryContext';

describe('ProductModal', () => {
 
  beforeAll(() => {
    window.alert = jest.fn();
  });

  it('renders modal with inputs', () => {
    render(
      <CategoryProvider>
        <ProductModal open={true} onClose={() => {}} onSave={() => {}} />
      </CategoryProvider>
  );

    expect(screen.getByText(/name/i)).toBeInTheDocument();
    expect(screen.getAllByText(/category/i).length).toBeGreaterThan(0);

    expect(screen.getByText(/stock/i)).toBeInTheDocument();
    expect(screen.getByText(/unit price/i)).toBeInTheDocument();
    expect(screen.getByText(/expiration date/i)).toBeInTheDocument();

    expect(screen.getByText(/save/i)).toBeInTheDocument();
    expect(screen.getByText(/cancel/i)).toBeInTheDocument();
  });

});
