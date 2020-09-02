import React from 'react';

import MonthlySavingsForm from '../MonthlySavingsForm/MonthlySavingsForm';
import MonthlyExpenseForm from '../MonthlyExpenseForm/MonthlyExpenseForm';
import ResetBasicForm from '../Confirmation/ResetBasicForm';
import ResetSavingsForm from '../Confirmation/ResetSavingsForm';
import ResetExpensesForm from '../Confirmation/ResetExpensesForm';
import CloseSavingsForm from '../Confirmation/CloseSavingsForm';
import CloseExpensesForm from '../Confirmation/CloseExpensesForm';
import SwitchBasicSavings from '../Confirmation/SwitchBasicSavings';
import SwitchBasicExpenses from '../Confirmation/SwitchBasicExpenses';

import DIALOG_TYPE from '../../globals/constants/DialogTypes.constants';

const RenderDialogByType = props => {
  const { whichDialog } = props;
  switch (whichDialog) {
    case DIALOG_TYPE.DETAILED_SAVINGS:
      return <MonthlySavingsForm {...props} />;
    case DIALOG_TYPE.DETAILED_EXPENSE:
      return <MonthlyExpenseForm {...props} />;
    case DIALOG_TYPE.CONFIRMATION_RESET_BASIC_FORM:
      return <ResetBasicForm {...props} />;
    case DIALOG_TYPE.CONFIRMATION_RESET_SAVINGS_FORM:
      return <ResetSavingsForm {...props} />;
    case DIALOG_TYPE.CONFIRMATION_RESET_EXPENSES_FORM:
      return <ResetExpensesForm {...props} />;
    case DIALOG_TYPE.SWITCH_BASIC_SAVINGS:
      return <SwitchBasicSavings {...props} />;
    case DIALOG_TYPE.SWITCH_BASIC_EXPENSES:
      return <SwitchBasicExpenses {...props} />;
    case DIALOG_TYPE.CONFIRMATION_CLOSE_SAVINGS_FORM:
      return <CloseSavingsForm {...props} />;
    case DIALOG_TYPE.CONFIRMATION_CLOSE_EXPENSES_FORM:
      return <CloseExpensesForm {...props} />;
    default:
      return null;
  }
};

export default RenderDialogByType;
