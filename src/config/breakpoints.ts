const fontSize = 16;

/**
 * CAUTION: There is a double source of truth in regards to the breakpoints, as
 * the css variables for breakpoints are defined in a file apart. Please, update
 * values in both files if any change is made here. The breakpoints are set in
 * rem to make it easier to update it from the css variables
 */

const BREAKPOINTS = {
  /** 380px */
  small: 23.75 * fontSize,

  /** 668px */
  smallMedium: 41.75 * fontSize,

  /** 960px */
  medium: 50 * fontSize,

  /** 1.200px */
  big: 75 * fontSize,

  /** 1.440px */
  large: 90 * fontSize,
};

export default BREAKPOINTS;
