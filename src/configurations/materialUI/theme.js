import { createMuiTheme } from '@material-ui/core/styles';
import colorPallete from '../../globals/styles/modules/base/_color.scss';

// const themeType = 'light';
// const primaryColor = '#97144D';
// const secondaryColor = '#ED1164';
const cloudColor = '#F9F9F9';
const charcoalColor = '#323232';
const steelColor = '#bebfc0';
const smokeColor = '#696b6f';
const whisperColor = '#e5e5e5';
const successColor = '#00cb48';
const errorColor = '#ff0000';
const quartzColor = '#e1e1e2';
const lightGrayColor = '#e1e1e2';
const redColor = '#ff0000';

/**
 * variables declared for default theme colors,
 * also note this default colors are extracted from _color.scss file(do not set the color code here)
 * color colors are maintained at single location(inside _color.scss file)
 */
const themeType = 'light';
const {
  primaryColor,
  secondaryColor,
  primaryBrightColor,
  accentColor,
} = colorPallete;

/**
 * [defaultThemeConfig - used as fallback color pallete when colors are not defined]
 * @type {Object}
 */
const defaultThemeConfig = {
  palette: {
    type: themeType,
    primary: { main: primaryColor, light: primaryBrightColor },
    secondary: { main: secondaryColor },
    error: { main: redColor },
    extraColors: {
      cloud: { main: cloudColor },
      charcoal: { main: charcoalColor },
      steel: { main: steelColor },
      smoke: { main: smokeColor },
      whisper: { main: whisperColor },
      success: { main: successColor },
      error: { main: errorColor },
      inputBorder: { main: '#D1E8FF' },
      inputBottomBorder: { main: '#A9A9A9' },
      inputBackground: { main: '#F2F7F6' },
      quartz: { main: quartzColor },
      lightGray: { main: lightGrayColor },
      switchColor: { main: accentColor },
    },
  },
  overrides: {
    MuiDialog: {
      paperWidthSm: {
        '@media (min-width: 780px)': {
          padding: '48px 42px',
          minWidth: 380,
          maxWidth: 380,
          minHeight: 560,
          maxHeight: 560,
          boxSizing: 'border-box',
        },
      },
    },
  },
};

const applyTheme = theme => {
  return createMuiTheme(theme || defaultThemeConfig);
};
export default applyTheme;
