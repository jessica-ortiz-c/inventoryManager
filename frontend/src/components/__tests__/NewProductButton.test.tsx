//render mounts the component for testing
//screen search elements in the screen
//fireevent to simulate events
import { render, screen, fireEvent } from '@testing-library/react';
import NewProductButton from '../NewProductButton';


describe('NewProductButton', () => {
    //The button appears on the screen
  it('should render the button with text "New product"', () => {
    render(<NewProductButton onClick={() => {}} />);
    expect(screen.getByRole('button', { name: /new product/i })).toBeInTheDocument();
  });
    //The event On Click is called by the button
  it('should call onClick when the button is clicked', () => {
    const handleClick = jest.fn();
    render(<NewProductButton onClick={handleClick} />);
    const button = screen.getByRole('button', { name: /new product/i });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
