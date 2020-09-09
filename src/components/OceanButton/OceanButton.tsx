import React from 'react';
import { SvgIconProps } from '@material-ui/core';
import { StyledOceanButton } from './styles';

type OceanButtonType = {
  /**
   * The button text
   */
  text?: string;

  /**
   * The component of a Material Icon.
   *
   * Example: icon={\<Language />}
   */
  icon?: React.ReactElement<SvgIconProps>;

  theme?: 'gray' | 'purple' | 'yellow';
};

const OceanButton: React.FunctionComponent<
  OceanButtonType & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ text, icon, theme = 'purple', ...props }) => {
  return (
    <>
      <StyledOceanButton {...props} styledTheme={theme}>
        <div className="button-content">
          <div className="icon">{icon}</div>
          <div className="text">{text}</div>
        </div>
      </StyledOceanButton>
    </>
  );
};

export default OceanButton;
