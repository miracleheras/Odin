import { render, screen } from '@testing-library/react';
import { Header } from './index';

describe('Header Component', () => {
  it('renders the ODIN logo', () => {
    render(<Header />);
    expect(screen.getByText('ODIN')).toBeInTheDocument();
  });

  it('renders the header container', () => {
    render(<Header />);
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });
}); 