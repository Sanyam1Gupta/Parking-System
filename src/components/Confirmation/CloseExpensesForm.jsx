import React from 'react';
import Grid from '@material-ui/core/Grid';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FButton from '../FButton/FButton';
import DIALOG_TYPE from '../../globals/constants/DialogTypes.constants';

import './confirmation.scss';

const CloseExpensesForm = props => {
  const { toggleConfirmationDialogs, closeCloseExpensesForm } = props;

  const closeCloseConfirmation = () => {
    toggleConfirmationDialogs(DIALOG_TYPE.DETAILED_EXPENSE);
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
            Are you sure you want to go back? All your entered monthly expense
            details will be lost.
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions id="dialog-actions">
        <Grid className="button-container" container justify="space-between">
          <FButton
            disableElevation
            color="primary"
            onClick={closeCloseExpensesForm}
          >
            Yes
          </FButton>
          <FButton
            variant="contained"
            disableElevation
            color="primary"
            onClick={closeCloseConfirmation}
          >
            No
          </FButton>
        </Grid>
      </DialogActions>
    </>
  );
};

export default CloseExpensesForm;
