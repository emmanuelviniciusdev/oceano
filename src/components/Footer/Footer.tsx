import React from 'react';
import { useLocation } from 'react-router-dom';

// Styles
import { Footer as StyledFooter } from './styles';

const Footer = () => {
  const currentLocation = useLocation();

  /**
   * Routes that footer is not rendered
   */
  const blockedRoutes = ['/minha-nota', '/offline'];

  return (
    <>
      {!blockedRoutes.includes(currentLocation.pathname) && (
        <StyledFooter data-testid="footer">
          <p>
            Handcrafted with{' '}
            <span role="img" aria-label="love">
              ❤️️
            </span>{' '}
            by <b>Emmanuel</b>
          </p>
        </StyledFooter>
      )}
    </>
  );
};

export default Footer;
