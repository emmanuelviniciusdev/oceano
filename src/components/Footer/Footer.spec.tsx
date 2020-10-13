import { render, screen } from '@testing-library/react';
import React from 'react';
import Footer from './Footer';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(() => ({ pathname: '/minha-nota' })),
}));

describe('Footer', () => {
  it("should not render footer on 'my note' page", () => {
    render(<Footer />);
    expect(screen.queryByTestId('footer')).not.toBeInTheDocument();
  });
});
