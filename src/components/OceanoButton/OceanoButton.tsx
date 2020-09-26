import React from 'react';
import { OceanoButton as StyledOceanoButton } from './styles';

// Types
import { OceanoButtonType } from '../../types-and-interfaces/components/OceanButton.types';

const OceanoButton: React.FunctionComponent<
  OceanoButtonType & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ text, icon, theme = 'purple', ...props }) => {
  return (
    <>
      <StyledOceanoButton {...props} styledTheme={theme}>
        <div className="button-content" data-testid="ocean-button-content">
          <div className="icon">{icon}</div>
          <div className="text">{text}</div>
        </div>
      </StyledOceanoButton>
    </>
  );
};

export default OceanoButton;
