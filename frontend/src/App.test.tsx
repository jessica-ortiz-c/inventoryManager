import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

const mockProducts = [
  {
    id: '1',
    name: 'Smartphone',
    category: ['Electronics'],
    stock: 10,
    price: 499.99,
    expirationDate: '2025-12-31',
  },
];

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockProducts),
    })
  ) as jest.Mock;
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('App Component', () => {
  it('renders ProductManager and loads products', async () => {
    render(<App />);

    //Since is asyn it need to wait to be shown
    await waitFor(() => {
      expect(screen.getByText(/smartphone/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/new product/i)).toBeInTheDocument();
  });
});
