import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FButton from '../FButton/FButton';
import { fetchPreviousCalculatedResult } from '../../globals/actions/AppState.actions';

import './confirmation.scss';

const OverwriteResultConfirmation = props => {
  const { handleClose, resetForm } = props;

  const handleOnConfirmYes = () => {
    const { actions, history } = props;
    // actions.fetchPreviousCalculatedResult();
    setTimeout(() => {
      history.push('/');
    }, 30);
  };

  const handleOnConfirmNo = () => {
    const { history, actions } = props;
    // history.push('/');
    actions.fetchPreviousCalculatedResult();
    setTimeout(() => {
      history.push('/');
    }, 30);
  };

  return (
    <>
      <DialogTitle className="dialog-title-wrapper">
        <div className="dialog-title">Alert!</div>
      </DialogTitle>
      <DialogContent className="dialog-content-wrapper">
        <Grid container justify="center">
          <Grid
            item
            xs={12}
            md={12}
            className="dialog-content-confirmation-text"
          >
            Do you want to delete the previous planned Emergency Savings Goal
            and save the new results?
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions id="dialog-actions">
        <Grid className="button-container" container justify="space-between">
          <FButton
            disableElevation
            color="primary"
            onClick={handleOnConfirmYes}
          >
            Yes
          </FButton>
          <FButton
            variant="contained"
            disableElevation
            color="primary"
            onClick={handleOnConfirmNo}
          >
            No
          </FButton>
        </Grid>
      </DialogActions>
    </>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  actions: {
    fetchPreviousCalculatedResult: () =>
      dispatch(fetchPreviousCalculatedResult()),
  },
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OverwriteResultConfirmation),
);
