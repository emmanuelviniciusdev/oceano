import { render, screen } from '@testing-library/react';
import React from 'react';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
}));

describe('Footer', () => {
  it('should not render footer on blocked routes', () => {
    const blockedRoutes = ['/minha-nota', '/offline'];

    blockedRoutes.forEach((pathname) => {
      (useLocation as jest.Mock).mockImplementation(() => ({
        pathname,
      }));
      render(<Footer />);
      expect(screen.queryByTestId('footer')).not.toBeInTheDocument();
    });
  });
});
