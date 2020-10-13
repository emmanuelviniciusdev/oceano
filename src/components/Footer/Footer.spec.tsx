import { render, screen } from '@testing-library/react';
import React from 'react';
import Footer from './Footer';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(() => ({ pathname: '/minha-nota' })),
}));

describe('TopBar', () => {
  it("should not be rendered on 'my note' page", () => {
    render(<Footer />);
    expect(screen.queryByTestId('footer')).not.toBeInTheDocument();
  });
});
