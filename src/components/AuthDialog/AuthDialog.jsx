import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import Otp from './Otp/Otp';
import CustIdLogin from './CustIdLogin/CustIdLogin';
import SetupAccount from './SetupAccount/SetupAccount';
import Login from './Login/Login';
import Authentication from './Authentication/Authentication';
import CustomerConsent from './CustomerConsent/CustomerConsent';
import SuccessCheck from '../SuccessCheck/SuccessCheck';

const styles = theme => ({
  root: {
    padding: '0px 0px',
    paddingTop: '0px',
    '&:first-child': {
      paddingTop: 0,
    },
  },
});

const SCREEN_TYPE = {
  LOGIN_SCREEN: 'LOGIN_SCREEN',
  ENTER_OTP_SCREEN: 'ENTER_OTP_SCREEN',
  SETUP_ACCOUNT_SCREEN: 'SETUP_ACCOUNT_SCREEN',
  CUST_ID_LOGIN_SCREEN: 'CUST_ID_LOGIN_SCREEN',
  OTP_VERIFIED_SCREEN: 'OTP_VERIFIED_SCREEN',
  AUTHENTICATION_SCREEN: 'AUTHENTICATION_SCREEN',
  CUSTOMER_CONSENT_SCREEN: 'CUSTOMER_CONSENT_SCREEN'
};

class AuthDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      whichScreen: SCREEN_TYPE.LOGIN_SCREEN,
      mobileNo: '',
      haveAuthorized: false,
    };
    this.toggleBetweenScreens = this.toggleBetweenScreens.bind(this);
    this.nextScreen = this.nextScreen.bind(this);
    this.setMobileNo = this.setMobileNo.bind(this);
    this.setHaveAuthorized = this.setHaveAuthorized.bind(this);
  }

  // Set mobile number and haveAuthorized to display in Login Screen

  setMobileNo = value => {
    this.setState({ mobileNo: value });
  };

  setHaveAuthorized = checked => {
    this.setState({ haveAuthorized: checked });
  };

  toggleBetweenScreens = currentScreen => {
    this.setState({ whichScreen: '' });
    setTimeout(() => {
      if (
        currentScreen === SCREEN_TYPE.ENTER_OTP_SCREEN ||
        currentScreen === SCREEN_TYPE.CUST_ID_LOGIN_SCREEN
      ) {
        this.setState({ whichScreen: SCREEN_TYPE.LOGIN_SCREEN });
      } else if (
        currentScreen === SCREEN_TYPE.LOGIN_SCREEN ||
        currentScreen === SCREEN_TYPE.AUTHENTICATION_SCREEN
      ) {
        this.setState({ whichScreen: SCREEN_TYPE.CUST_ID_LOGIN_SCREEN });
      }
    }, 0);
  };

  nextScreen = currentScreen => {
    const { deactivateAuthScreen } = this.props;
    this.setState({ whichScreen: '' });
    setTimeout(() => {
      if (currentScreen === SCREEN_TYPE.LOGIN_SCREEN) {
        this.setState({ whichScreen: SCREEN_TYPE.ENTER_OTP_SCREEN });
      } else if (currentScreen === SCREEN_TYPE.ENTER_OTP_SCREEN) {
        this.setState({ whichScreen: SCREEN_TYPE.SETUP_ACCOUNT_SCREEN });
      } else if (currentScreen === SCREEN_TYPE.SETUP_ACCOUNT_SCREEN) {
        // deactivateAuthScreen();
        this.setState({ whichScreen: SCREEN_TYPE.AUTHENTICATION_SCREEN });
      } else if (currentScreen === SCREEN_TYPE.AUTHENTICATION_SCREEN) {
        // deactivateAuthScreen();
        this.setState({ whichScreen: SCREEN_TYPE.OTP_VERIFIED_SCREEN });
      }
    }, 0);
  };

  _isDesktop = () => {
    const deviceWidth = localStorage.getItem('deviceWidth');
    return deviceWidth && Number(deviceWidth) >= 900;
  };

  render() {
    const { whichScreen, mobileNo, haveAuthorized } = this.state;
    const {
      classes,
      authDialogStatus,
      closeModal,
      deactivateAuthScreen,
    } = this.props;
    if (this._isDesktop()) {
      return (
        <Dialog
          maxWidth="xs"
          fullWidth
          style={{ padding: '0px' }}
          open={authDialogStatus}
          onClose={closeModal}
        >
          <DialogContent className={classes.root}>
            <Slide
              direction="right"
              in={whichScreen === SCREEN_TYPE.ENTER_OTP_SCREEN}
              mountOnEnter
              unmountOnExit
              timeout={200}
            >
              <Otp
                whichScreen={whichScreen}
                toggleBetweenScreens={this.toggleBetweenScreens}
                nextScreen={this.nextScreen}
                mobileNo={mobileNo}
              />
            </Slide>
            <Slide
              direction="right"
              in={whichScreen === SCREEN_TYPE.CUST_ID_LOGIN_SCREEN}
              mountOnEnter
              unmountOnExit
              timeout={200}
            >
              <CustIdLogin
                whichScreen={whichScreen}
                toggleBetweenScreens={this.toggleBetweenScreens}
              />
            </Slide>
            <Slide
              direction="right"
              in={whichScreen === SCREEN_TYPE.SETUP_ACCOUNT_SCREEN}
              timeout={200}
              mountOnEnter
              unmountOnExit
            >
              <SetupAccount
                whichScreen={whichScreen}
                nextScreen={this.nextScreen}
              />
            </Slide>
            <Slide
              direction="right"
              in={whichScreen === SCREEN_TYPE.LOGIN_SCREEN}
              mountOnEnter
              unmountOnExit
              timeout={200}
            >
              <Login
                whichScreen={whichScreen}
                toggleBetweenScreens={this.toggleBetweenScreens}
                nextScreen={this.nextScreen}
                setMobileNo={this.setMobileNo}
                setHaveAuthorized={this.setHaveAuthorized}
                mobileNo={mobileNo}
                haveAuthorized={haveAuthorized}
              />
            </Slide>
            <Slide
              direction="right"
              in={whichScreen === SCREEN_TYPE.OTP_VERIFIED_SCREEN}
              mountOnEnter
              unmountOnExit
              timeout={200}
            >
              <SuccessCheck />
            </Slide>
            <Slide
              direction="right"
              in={whichScreen === SCREEN_TYPE.AUTHENTICATION_SCREEN}
              mountOnEnter
              unmountOnExit
              timeout={200}
            >
              <Authentication
                whichScreen={whichScreen}
                nextScreen={this.nextScreen}
                toggleBetweenScreens={this.toggleBetweenScreens}
              />
            </Slide>
            <Slide
              direction="right"
              in={whichScreen === SCREEN_TYPE.CUSTOMER_CONSENT_SCREEN}
              mountOnEnter
              unmountOnExit
              timeout={200}
            >
              <CustomerConsent
                whichScreen={whichScreen}
                nextScreen={this.nextScreen}
                toggleBetweenScreens={this.toggleBetweenScreens}
              />
            </Slide>
          </DialogContent>
        </Dialog>
      );
    }
    return (
      <DialogContent className={classes.root}>
        <Slide
          direction="right"
          in={whichScreen === SCREEN_TYPE.ENTER_OTP_SCREEN}
          mountOnEnter
          unmountOnExit
          timeout={200}
        >
          <Otp
            whichScreen={whichScreen}
            toggleBetweenScreens={this.toggleBetweenScreens}
            nextScreen={this.nextScreen}
            mobileNo={mobileNo}
          />
        </Slide>
        <Slide
          direction="right"
          in={whichScreen === SCREEN_TYPE.CUST_ID_LOGIN_SCREEN}
          mountOnEnter
          unmountOnExit
          timeout={200}
        >
          <CustIdLogin
            whichScreen={whichScreen}
            toggleBetweenScreens={this.toggleBetweenScreens}
          />
        </Slide>
        <Slide
          direction="right"
          in={whichScreen === SCREEN_TYPE.SETUP_ACCOUNT_SCREEN}
          timeout={200}
          mountOnEnter
          unmountOnExit
        >
          <SetupAccount
            whichScreen={whichScreen}
            nextScreen={this.nextScreen}
          />
        </Slide>
        <Slide
          direction="right"
          in={whichScreen === SCREEN_TYPE.LOGIN_SCREEN}
          mountOnEnter
          unmountOnExit
          timeout={200}
        >
          <Login
            whichScreen={whichScreen}
            toggleBetweenScreens={this.toggleBetweenScreens}
            nextScreen={this.nextScreen}
            setMobileNo={this.setMobileNo}
            setHaveAuthorized={this.setHaveAuthorized}
            mobileNo={mobileNo}
            haveAuthorized={haveAuthorized}
          />
        </Slide>
        <Slide
          direction="right"
          in={whichScreen === SCREEN_TYPE.OTP_VERIFIED_SCREEN}
          mountOnEnter
          unmountOnExit
          timeout={200}
        >
          <SuccessCheck />
        </Slide>
        <Slide
          direction="right"
          in={whichScreen === SCREEN_TYPE.AUTHENTICATION_SCREEN}
          mountOnEnter
          unmountOnExit
          timeout={200}
        >
          <Authentication
            whichScreen={whichScreen}
            toggleBetweenScreens={this.toggleBetweenScreens}
          />
        </Slide>
        <Slide
          direction="right"
          in={whichScreen === SCREEN_TYPE.CUSTOMER_CONSENT_SCREEN}
          mountOnEnter
          unmountOnExit
          timeout={200}
        >
          <CustomerConsent
            nextScreen={this.nextScreen}
            toggleBetweenScreens={this.toggleBetweenScreens}
          />
        </Slide>
      </DialogContent>
    );
  }
}

export default withStyles(styles)(AuthDialog);
