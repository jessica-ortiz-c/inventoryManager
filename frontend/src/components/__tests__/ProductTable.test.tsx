import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductTable from '../ProductTable';
import { Product } from '../../types/Product';

const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Laptop',
    category: ['Electronics'],
    stock: 5,
    price: 1200,
    expirationDate: '2025-12-31',
  },
];

describe('ProductTable', () => {
  it('renders product data', () => {
    render(
      <ProductTable
        products={sampleProducts}
        onEdit={() => {}}
        onDelete={() => {}}
      />
    );

    expect(screen.getByText('Laptop')).toBeInTheDocument();
    expect(screen.getByText('Electronics')).toBeInTheDocument();
    expect(screen.getByText('1200')).toBeInTheDocument();
  });

  it('calls onEdit when Edit is clicked', () => {
    const mockEdit = jest.fn();
    render(
      <ProductTable
        products={sampleProducts}
        onEdit={mockEdit}
        onDelete={() => {}}
      />
    );

    fireEvent.click(screen.getByText(/edit/i));
    expect(mockEdit).toHaveBeenCalledTimes(1);
  });

    it('calls onDelete when Delete is clicked', () => {
        const mockDelete = jest.fn();
        window.confirm = jest.fn(() => true); 

        render(
            <ProductTable
            products={sampleProducts}
            onEdit={() => {}}
            onDelete={mockDelete}
            />
        );

        const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
        fireEvent.click(deleteButtons[0]); 

        expect(mockDelete).toHaveBeenCalledTimes(1);
        });

});
 