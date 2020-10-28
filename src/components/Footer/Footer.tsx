import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Styles
import { Footer as StyledFooter } from './styles';

// Utils
import { doesRouteMatch } from '../../utils';

const Footer = () => {
  const currentLocation = useLocation();

  /**
   * Routes where footer will not be rendered.
   *
   * Regular expressions generated at:
   * https://forbeslindesay.github.io/express-route-tester/
   */
  const blockedRouteRegExps = [
    /**
     * /minha-nota/:noteId
     */
    /^\/minha-nota\/(?:([^\/]+?))\/?$/i,

    /**
     * /termos/:termsType
     */
    /^\/termos\/(?:([^\/]+?))\/?$/i,

    /**
     * /offline
     */
    /^\/offline\/?$/i,
  ];

  return (
    <>
      {!doesRouteMatch(currentLocation.pathname, blockedRouteRegExps) && (
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
