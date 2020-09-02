import React from 'react';
import ButtonBase from '@material-ui/core/ButtonBase';
import './footer.scss';

const Footer = props => {
  const { whichScreen = '', toggleBetweenScreens } = props;
  if (!whichScreen) {
    return null;
  }
  return (
    <>
      {[
        'LOGIN_SCREEN',
        'AUTHENTICATION_SCREEN',
        'LOGIN_BY_MOBILE_SCREEN',
        'REGISTRATION_SCREEN',
      ].indexOf(whichScreen) > -1 && (
        <div className="authentication-screen-footer">
          Already an customer? Login using your &#8239;
          <ButtonBase
            className="customer-id-btn-text"
            onClick={() => {
              toggleBetweenScreens(whichScreen);
            }}
          >
            Customer Id
          </ButtonBase>
        </div>
      )}
      {[
        'LOGIN_SCREEN',
        'AUTHENTICATION_SCREEN',
        'LOGIN_BY_MOBILE_SCREEN',
        'REGISTRATION_SCREEN',
      ].indexOf(whichScreen) === -1 && (
        <div className="authentication-screen-footer">
          <ButtonBase
            className="go-back-btn-text"
            onClick={() => {
              toggleBetweenScreens(whichScreen);
            }}
          >
            Go Back
          </ButtonBase>
        </div>
      )}
    </>
  );
};

export default Footer;
