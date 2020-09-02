import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

/**
 * Authentication Screen Components
 */
import EmailReportScreen from '../../pages/Authentication/AuthenticationScreens/EmailReportScreen/EmailReportScreen';

import AuthHelper from '../../utils/AuthHelper';

import '../../pages/Authentication/authentication.scss';
/**
 * Authentication Screen Name Constants
 */

class EmailDialog extends React.PureComponent {
  componentDidMount() {
    const { history } = this.props;
    if (AuthHelper.isLoggedIn()) {
      history.push('/');
    }
  }

  /**
   * Dialog Methods
   */

  render() {
    const {
      emailScreen,
      handleEmailReport,
      email = '',
      handleCloseEmailDialog,
    } = this.props;
    return (
      <Dialog
        maxWidth="sm"
        fullWidth
        disableBackdropClick
        disableEscapeKeyDown
        style={{ padding: '0px', boxSizing: 'border-box', overflow: 'hidden' }}
        open={emailScreen}
        className="email-dialog"
      >
        <DialogContent
          className="authentication-containers"
          id="authentication-containers"
          style={{ padding: 0, boxSizing: 'border-box', display: 'flex' }}
        >
          <EmailReportScreen
            handleEmailReport={handleEmailReport}
            email={email}
            handleCloseEmailDialog={handleCloseEmailDialog}
          />
        </DialogContent>
      </Dialog>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EmailDialog),
);
