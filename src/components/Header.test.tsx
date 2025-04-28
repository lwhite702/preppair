import { render, screen } from '@testing-library/react';
import Header from './Header';

test('renders the header component', () => {
  render(<Header />);
  expect(screen.getByText(/header/i)).toBeInTheDocument();
});