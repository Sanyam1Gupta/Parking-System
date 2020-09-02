import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';

import RenderDialogByType from '../RenderDialogByType/RenderDialogByType';
import DIALOG_TYPE from '../../globals/constants/DialogTypes.constants';

import './dialog-content.scss';

const Transition = React.forwardRef(function Transition(props, ref) {
  return (
    <Slide
      direction="up"
      in
      mountOnEnter
      unmountOnExit
      ref={ref}
      {...props}
      timeout={200}
    />
  );
});

const DialogContents = props => {
  const { dialogStatus, whichDialog, handleClose } = props;
  return (
    <>
      {whichDialog &&
        (whichDialog === DIALOG_TYPE.DETAILED_SAVINGS ||
          whichDialog === DIALOG_TYPE.DETAILED_EXPENSE) && (
          <Dialog
            maxWidth="md"
            fullWidth
            disableBackdropClick
            disableEscapeKeyDown
            TransitionComponent={Transition}
            open={dialogStatus}
            onClose={handleClose}
            className="detailed-forms-dialog"
          >
            <RenderDialogByType {...props} />
          </Dialog>
        )}
      {whichDialog &&
        [
          DIALOG_TYPE.CONFIRMATION_RESET_BASIC_FORM,
          DIALOG_TYPE.CONFIRMATION_RESET_SAVINGS_FORM,
          DIALOG_TYPE.CONFIRMATION_RESET_EXPENSES_FORM,
          DIALOG_TYPE.SWITCH_BASIC_SAVINGS,
          DIALOG_TYPE.SWITCH_BASIC_EXPENSES,
          DIALOG_TYPE.CONFIRMATION_CLOSE_SAVINGS_FORM,
          DIALOG_TYPE.CONFIRMATION_CLOSE_EXPENSES_FORM,
        ].indexOf(whichDialog) > -1 && (
          <Dialog
            maxWidth="xs"
            disableBackdropClick
            disableEscapeKeyDown
            open={dialogStatus}
            onClose={handleClose}
          >
            <RenderDialogByType {...props} />
          </Dialog>
        )}
    </>
  );
};

export default DialogContents;
