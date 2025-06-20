import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductSummary from '../ProductSummary';
import { Product } from '../../types/Product';

const products: Product[] = [
  { id: '1', name: 'Apple', category: ['Food'], stock: 10, price: 2, expirationDate: '2025-01-01' },
  { id: '2', name: 'TV', category: ['Electronics'], stock: 2, price: 500, expirationDate: '2026-01-01' },
];

describe('ProductSummary', () => {
  it('renders summary rows for each category and overall', () => {
    render(<ProductSummary products={products} />);

    expect(screen.getByText('Food')).toBeInTheDocument();
    expect(screen.getByText('Electronics')).toBeInTheDocument();
    expect(screen.getByText('Overall')).toBeInTheDocument();

    expect(screen.getByText('10')).toBeInTheDocument(); // stock food
    expect(screen.getByText('20.00')).toBeInTheDocument(); // value food
    expect(screen.getByText('2.00')).toBeInTheDocument(); // avg food
  });
});
