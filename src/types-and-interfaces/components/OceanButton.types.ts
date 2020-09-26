import { SvgIconProps } from '@material-ui/core';

export type OceanoButtonType = {
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

  /**
   * The button theme
   */
  theme?: 'gray' | 'purple' | 'yellow' | 'transparent';
};
