import React from 'react';
import { SvgIconProps } from '@material-ui/core';
import { OceanoButton as StyledOceanoButton } from './styles';

type OceanoButtonType = {
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

const OceanoButton: React.FunctionComponent<
  OceanoButtonType & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ text, icon, theme = 'purple', ...props }) => {
  return (
    <>
      <StyledOceanoButton {...props} styledTheme={theme}>
        <div className="button-content">
          <div className="icon">{icon}</div>
          <div className="text">{text}</div>
        </div>
      </StyledOceanoButton>
    </>
  );
};

export default OceanoButton;
