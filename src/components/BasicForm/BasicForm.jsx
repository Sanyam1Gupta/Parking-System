import React from 'react';
import { withRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';

import { Scrollbars } from 'react-custom-scrollbars';
import { getCurrencyFormat } from '../../utils/global';
import TextInput from '../TextInput/TextInput';
import SwitchButton from '../SwitchButton/SwitchButton';
import ConditionalWrapper from '../ConditionalWrapper';

import FButton from '../FButton/FButton';
import AuthHelper from '../../utils/AuthHelper';

import './basic-form.scss';

const BasicForm = props => {
  const {
    form,
    error,
    haveError,
    handleOnChange,
    handleOnBlur,
    toggledDetailedExpenseDialog,
    toggleDetailedIncomeDialog,
    toggleConfirmationDialogs,
    handleSwitchFields,
    handleOnClickCalculate,
    validateBasicFormFields,
    isResultAvail,
  } = props;

  const { deviceInfo = {} } = props;
  const { deviceWidth = window.outerWidth } = deviceInfo;

  const {
    monthlyIncome = '',
    haveDetailedIncome = false,
    monthlyExpense = '',
    haveDetailedExpense = false,
    existingSavings = '',
  } = form;

  const {
    monthlyIncome: monthlyIncomeError,
    monthlyExpense: monthlyExpenseError,
    existingSavings: existingSavingsError,
  } = error;

  const CONFIRMATION_RESET_BASIC_FORM = 'CONFIRMATION_RESET_BASIC_FORM';

  const checkIsDisabled = () => {
    const MAX_LIMIT = 999999999;
    if (
      monthlyIncome > MAX_LIMIT ||
      monthlyExpense > MAX_LIMIT ||
      existingSavings > MAX_LIMIT ||
      !Number(monthlyIncome || !Number(monthlyExpense))
    )
      return true;
    return false;
  };

  const checkIsResetDisabled = () => {
    if (
      monthlyIncome.length <= 0 &&
      monthlyExpense.length <= 0 &&
      existingSavings.length <= 0
    )
      return true;
    return false;
  };

  const confirmationHandler = () => {
    toggleConfirmationDialogs(CONFIRMATION_RESET_BASIC_FORM);
  };

  /**
   * setting up input field properties
   */
  const monthlyIncomeInputDetails = {
    error: monthlyIncomeError.length > 0,
    errorText: monthlyIncomeError,
    id: 'txt-monthly-income',
    label: 'Enter Monthly Income *',
    value: monthlyIncome,
    name: 'monthlyIncome',
    defaultValue: '',
    iconType: null,
    onChange: handleOnChange,
    onBlur: handleOnBlur,
    iconHelperText: null,
  };

  const monthlyExpenseInputDetails = {
    error: monthlyExpenseError.length > 0,
    errorText: monthlyExpenseError,
    id: 'txt-monthly-expense',
    label: 'Enter Monthly Expenses *',
    value: monthlyExpense,
    name: 'monthlyExpense',
    defaultValue: '',
    iconType: 'tooltip',
    onChange: handleOnChange,
    onBlur: handleOnBlur,
    iconHelperText: 'Enter your monthly Expenses, EMIs and Investments',
  };

  const existingSavingsInputDetails = {
    error: existingSavingsError.length > 0,
    errorText: existingSavingsError,
    id: 'txt-existing-savings',
    label: 'Enter Existing Savings',
    value: existingSavings,
    name: 'existingSavings',
    defaultValue: '',
    iconType: 'tooltip',
    onChange: handleOnChange,
    onBlur: handleOnBlur,
    iconHelperText:
      ' Please enter your existing savings account balance(across all banks)',
  };

  const desktopContainerStyle = {
    maxHeight: '614px',
    overflowY: 'auto',
    height: '580px',
  };

  const _isDesktop = () => {
    return deviceWidth && Number(deviceWidth) >= 900;
  };

  const handleOnClickLogin = () => {
    // handleOnClickCalculate();
    // // NOTE: fallback check
    // redirecting to login page if not logged in
    if (!AuthHelper.isLoggedIn()) {
      const { history } = props;
      history.push('/auth');
    }
  };

  const buttonText =
    AuthHelper.isLoggedIn() && isResultAvail ? 'Recalculate' : 'Calculate';

  return (
    <section id="basic-form-container">
      <div className="basic-form-title">Calculate Your Goal</div>
      <div
        className="calculator-form-card-container"
        style={_isDesktop() ? desktopContainerStyle : { overflow: 'auto' }}
      >
        <ConditionalWrapper
          condition={_isDesktop()}
          wrapper={children => <Scrollbars autoHide>{children}</Scrollbars>}
        >
          <>
            <Paper elevation={0} className="form-card-container">
              {!haveDetailedIncome && (
                <TextInput {...monthlyIncomeInputDetails} prefixNumberFormat />
              )}

              {haveDetailedIncome && (
                <div className="inner-card-container">
                  <Grid container justify="flex-start" className="inner-card">
                    <Grid
                      className="inner-card-header"
                      item
                      md={5}
                      style={{ padding: '0' }}
                    >
                      Total monthly detailed income
                      <div className="inner-card-sub-header">
                        {getCurrencyFormat(monthlyIncome)}
                      </div>
                    </Grid>
                    <Grid
                      item
                      md={5}
                      style={{ display: 'flex', justifyContent: 'flex-end' }}
                    >
                      <div className="update-block">
                        <Button
                          color="primary"
                          size="small"
                          onClick={toggleDetailedIncomeDialog}
                        >
                          UPDATE
                        </Button>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              )}

              <div className="inner-card-container">
                <Grid container justify="space-between" className="inner-card">
                  <Grid
                    className="inner-card-header"
                    item
                    md={7}
                    xs={7}
                    style={{ padding: '0' }}
                  >
                    Have Multiple incomes? Use the detailed section for
                    assitance
                  </Grid>
                  <Grid
                    item
                    md={5}
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      paddingLeft: '30px',
                    }}
                  >
                    <SwitchButton
                      handleOnChange={handleSwitchFields}
                      name="haveDetailedIncome"
                      value={haveDetailedIncome}
                      detailedView
                    />
                  </Grid>
                </Grid>
              </div>
            </Paper>
            <Paper elevation={0} className="form-card-container">
              {!haveDetailedExpense && (
                <TextInput {...monthlyExpenseInputDetails} prefixNumberFormat />
              )}

              {haveDetailedExpense && (
                <div className="inner-card-container">
                  <Grid container justify="flex-start" className="inner-card">
                    <Grid
                      className="inner-card-header"
                      item
                      md={5}
                      style={{ padding: '0' }}
                    >
                      Total monthly detailed expense
                      <div className="inner-card-sub-header">
                        {getCurrencyFormat(monthlyExpense)}
                      </div>
                    </Grid>
                    <Grid
                      item
                      md={5}
                      style={{ display: 'flex', justifyContent: 'flex-end' }}
                    >
                      <div className="update-block">
                        <Button
                          color="primary"
                          size="small"
                          onClick={toggledDetailedExpenseDialog}
                        >
                          UPDATE
                        </Button>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              )}

              <div className="inner-card-container">
                <Grid container justify="space-between" className="inner-card">
                  <Grid
                    className="inner-card-header"
                    item
                    md={7}
                    xs={7}
                    style={{ padding: '0' }}
                  >
                    Have Multiple expenses? Use the detailed section for
                    assitance
                  </Grid>
                  <Grid
                    item
                    md={5}
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      paddingLeft: '30px',
                    }}
                  >
                    <SwitchButton
                      handleOnChange={handleSwitchFields}
                      name="haveDetailedExpense"
                      value={haveDetailedExpense}
                      detailedView
                    />
                  </Grid>
                </Grid>
              </div>
            </Paper>
            <Paper elevation={0} className="existing-savings-card-container">
              <TextInput {...existingSavingsInputDetails} prefixNumberFormat />
            </Paper>
          </>
        </ConditionalWrapper>
      </div>
      <div id="action-block">
        <Grid container justify="space-between" spacing={2}>
          <Grid item xs={5}>
            <FButton
              disableElevation
              color="primary"
              id="btn-reset"
              name="g"
              onClick={confirmationHandler}
              disabled={checkIsResetDisabled()}
              style={{ backgroundColor: '#F9F9F9' }}
            >
              Reset
            </FButton>
          </Grid>
          <Grid item xs={7}>
            <FButton
              variant="contained"
              disableElevation
              color="primary"
              id="btn-update"
              onClick={handleOnClickCalculate}
            >
              {buttonText}
            </FButton>
          </Grid>
        </Grid>
      </div>
      {!AuthHelper.isLoggedIn() && (
        <div id="existing-member-block">
          Already registered? &nbsp;{' '}
          <ButtonBase className="log-in-btn-text" onClick={handleOnClickLogin}>
            LOG IN
          </ButtonBase>
        </div>
      )}
    </section>
  );
};

export default withRouter(BasicForm);
