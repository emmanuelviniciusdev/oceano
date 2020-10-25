const colors = {
  /**
   * Primary defaults
   */
  primary: '#003049',
  strongPrimary: '#011F2F',

  /**
   * Secondary defaults
   */
  secondary: '#525174',

  /**
   * Colors defaults
   */
  gray: '#BCBCBC',
  slightlySoftYellow: '#FEFFDD',
  yellow: '#EDEEC9',
  slightlyStrongYellow: '#E1E2C0',
  strongYellow: '#C2C2A4',
  orange: '#FF9F2E',
  clownfishOrange: '#C96717',
  clownfishBlack: '#0B0F16',
  red: '#DB4437',
  strongRed: '#8D241B',
  white: '#FFFFFF',
  black: '#000000',
};

const borderRadius = '5px';

const predefinedThemes = {
  clownfish: {
    backgroundColor: colors.clownfishBlack,
    borderColor: colors.clownfishOrange,
    color: colors.white,
  },
  warning: {
    backgroundColor: colors.orange,
    borderColor: colors.clownfishOrange,
    color: colors.white,
  },
  error: {
    backgroundColor: colors.red,
    borderColor: colors.strongRed,
    color: colors.white,
  },
};

export default {
  colors,

  borderRadius,

  predefinedThemes,
};
