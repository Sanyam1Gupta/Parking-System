// NOTE: if you want to excess more colors add to the `extract:` directive and use in javascript file
// extract colors from the below given scss file
import colorPallete from '../../globals/styles/modules/base/_color.scss';

const buttonStyle = {
  margin: {
    margin: 0,
    borderRadius: '8px',
    padding: '12px',
    textTransform: 'capitalize',
    fontFamily: 'Lato, sans-serif',
  },
  contained: {
    fontSize: '0.4rem',
  },
};

const dialogContainerStyle = {
  paper: {
    backgroundColor: colorPallete.primaryBackgroundColor,
  },
  paperAnchorBottom: {
    minHeight: '50%',
    borderRadius: '20px 20px 0px 0px',
    maxHeight: window.innerHeight < 640 ? '70%' : '80%',
    padding: '48px 16px 24px 16px',
  },
};

export { buttonStyle, dialogContainerStyle };
