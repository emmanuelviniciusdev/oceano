import React from 'react';

// Styles
import { Footer as StyledFooter } from './styles';

const Footer = () => {
  return (
    <StyledFooter>
      <p>
        Handcrafted with{' '}
        <span role="img" aria-label="love">
          ❤️️
        </span>{' '}
        by <b>Emmanuel</b>
      </p>
    </StyledFooter>
  );
};

export default Footer;
