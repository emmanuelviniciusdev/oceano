import { SvgIconProps } from '@material-ui/core';

export type OceanoButtonThemesType =
  | 'gray'
  | 'purple'
  | 'yellow'
  | 'transparent'
  | 'transparent-for-light-bg';

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
  theme?: OceanoButtonThemesType;

  /**
   * Loading state
   */
  isLoading?: boolean;
};
