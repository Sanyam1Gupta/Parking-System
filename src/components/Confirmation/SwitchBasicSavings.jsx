import React from 'react';
import Grid from '@material-ui/core/Grid';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FButton from '../FButton/FButton';

import './confirmation.scss';

const SwitchBasicSavings = props => {
  const { toggleBasicSavings, handleClose } = props;

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
            Are you sure you don’t want to use the Detailed Income section? All
            fields entered will be lost.
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions id="dialog-actions">
        <Grid className="button-container" container justify="space-between">
          <FButton
            disableElevation
            color="primary"
            id="btn-reset"
            onClick={toggleBasicSavings}
          >
            Yes
          </FButton>

          <FButton
            variant="contained"
            disableElevation
            color="primary"
            id="btn-update"
            onClick={handleClose}
          >
            No
          </FButton>
        </Grid>
      </DialogActions>
    </>
  );
};

export default SwitchBasicSavings;
