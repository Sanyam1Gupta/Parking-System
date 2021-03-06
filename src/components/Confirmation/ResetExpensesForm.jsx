import React from 'react';
import Grid from '@material-ui/core/Grid';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FButton from '../FButton/FButton';
import DIALOG_TYPE from '../../globals/constants/DialogTypes.constants';

import './confirmation.scss';

const ResetExpensesForm = props => {
  const { closeResetConfirmationDialogs, resetMonthlyExpenseForm } = props;

  const closeConfirmation = () => {
    closeResetConfirmationDialogs(DIALOG_TYPE.DETAILED_EXPENSE);
  };
  return (
    <>
      <DialogTitle className="dialog-title-wrapper">
        <div className="dialog-title">Alert!</div>
      </DialogTitle>
      <DialogContent className="dialog-content-wrapper">
        <Grid container justify="center">
          <Grid
            className="dialog-content-confirmation-text"
            item
            xs={12}
            md={12}
          >
            Are you sure you want to reset your changes?
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions id="dialog-actions">
        <Grid className="button-container" container justify="space-between">
          <FButton
            disableElevation
            color="primary"
            onClick={resetMonthlyExpenseForm}
          >
            Yes
          </FButton>
          <FButton
            variant="contained"
            disableElevation
            color="primary"
            onClick={closeConfirmation}
          >
            No
          </FButton>
        </Grid>
      </DialogActions>
    </>
  );
};

export default ResetExpensesForm;
