import React from 'react';
import { SvgIconProps } from '@material-ui/core';
import { Button } from './styles';

type PurpledButtonType = {
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
};

const PurpledButton: React.FunctionComponent<
  PurpledButtonType & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ text, icon, ...props }) => {
  return (
    <>
      <Button {...props}>
        <div className="button-content">
          <div className="icon">{icon}</div>
          <div className="text">{text}</div>
        </div>
      </Button>
    </>
  );
};

export default PurpledButton;
