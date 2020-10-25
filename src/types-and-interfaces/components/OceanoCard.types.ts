import { SvgIconProps } from '@material-ui/core';

export type OceanoCardThemesType = 'clownfish' | 'warning' | 'error';

export type OceanoCardType = {
  /**
   * The component of a Material Icon.
   *
   * Example: icon={\<Language />}
   */
  icon?: React.ReactElement<SvgIconProps>;

  /**
   * The card text
   */
  text?: string;

  /**
   * The button theme
   */
  theme?: OceanoCardThemesType;
};
