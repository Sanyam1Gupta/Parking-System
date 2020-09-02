import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import CakeIcon from '@material-ui/icons/Cake';
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import './dateInput.scss';

const useStyles = makeStyles(theme => {
  return {
    root: () => ({
      '& .MuiTextField-root': {
        height: '58px',
      },
      '& .MuiFormControl-marginNormal': {
        marginTop: '0px',
        marginBottom: '0px',
      },
      '& .MuiInputLabel-filled.MuiInputLabel-shrink': {
        transform: 'translate(12px, 10px) scale(0.75)',
      },
      '& .MuiInputBase-input': {
        height: '26px',
        paddingBottom: '0px',
      },
      '& .MuiInputLabel-shrink': {
        paddingTop: '10px',
        transform: 'translate(12px, 10px) scale(0.75)',
      },
      '& .MuiInputLabel-formControl': {
        top: 0,
        left: 0,
      },
      '& .MuiInputLabel-root': {
        color: theme.palette.extraColors.smoke.main,
        paddingTop: '0px',
        zIndex: 0,
      },
      '& .MuiFormLabel-root.Mui-focused': {
        color: theme.palette.secondary.main,
      },
      '& .MuiFormLabel-root.Mui-error': {
        color: theme.palette.error.main,
      },
      '& .MuiFormLabel-root.Mui-error.Mui-focused': {
        color: theme.palette.error.main,
      },
      '& .MuiInputLabel-filled': {
        fontWeight: '400',
        transform: 'translate(12px, 20px) scale(1)',
      },
      '& label.Mui-focused': {
        color: theme.palette.extraColors.smoke.main,
        paddingLeft: '0px',
      },
      '& label': {
        transform: 'translate(12px, 20px) scale(1)',
      },
      '& .MuiInput-root': {
        height: '58px',
      },
      '& label + .MuiInput-formControl': {
        marginTop: '0px',
      },
      '& .MuiInput-input': {
        paddingTop: '22px',
        paddingLeft: '10px',
        paddingBottom: '8px',
        color: theme.palette.extraColors.charcoal.main,
        fontFamily: 'Lato',
        fontWeight: '700',
        fontSize: '16px',
      },
      '& .MuiInput-underline:hover:before': {
        border: '0',
        borderBottom: `1px solid ${theme.palette.extraColors.smoke.main}`,
      },
      '& .MuiInput-underline:after': {
        border: '0',
        borderBottomColor: 'none',
      },
      '& .MuiInput-underline:before': {
        border: '0',
        borderBottom: `1px solid ${theme.palette.extraColors.smoke.main}`,
      },
      '& .MuiInput-underline.Mui-focused:before': {
        borderBottom: `2px solid ${theme.palette.secondary.main}`,
      },
      '& .MuiInput-underline.Mui-error:after': {
        transform: 'scaleX(1)',
        borderBottom: `2px solid ${theme.palette.error.main}`,
      },
      '& .MuiFormControl-root': {
        height: '56px',
        paddingBottom: '0px',
        borderRadius: '4px',
        border: `1px solid ${theme.palette.extraColors.inputBorder.main}`,
        background: theme.palette.extraColors.inputBackground.main,
      },
      '& .MuiFormHelperText-root': {
        position: 'absolute',
        fontSize: '10px',
        bottom: -20,
      },
      '& .MuiFormHelperText-root.Mui-error': {
        fontSize: '10px',
        fontFamily: 'Lato',
        // lineHeight: '12px',
        // margin: '4px 14px 0',
        // position: 'absolute',
        // top: '56px',
      },
      '& .MuiFormHelperText-contained': {
        fontSize: '10px',
        lineHeight: '12px',
        fontFamily: 'Lato',
      },
      '& .MuiInputAdornment-positionStart': {
        marginRight: '0',
        marginTop: '17.2px !important',
        '& .MuiTypography-colorTextSecondary': {
          color: theme.palette.extraColors.charcoal.main,
        },
      },
    }),
  };
});

const DateInput = props => {
  const {
    id,
    errorText,
    type,
    defaultValue,
    value = null,
    min,
    iconType,
    iconHelperText,
    iconHelperTitle,
    inputStyles,
    startAdornment,
    startAdornmentValue,
    openInfoStagger,
    inputProperties,
    helperText = '',
    dobPicker = false,
    ...otherProps
  } = props;
  const classes = useStyles(inputStyles);
  return (
    <Grid
      item
      container
      alignItems="center"
      xs={12}
      className="text-input__layout"
    >
      <FormControl fullWidth variant="filled" className={classes.root}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <div>
            <KeyboardDatePicker
              helperText={helperText}
              margin="normal"
              disableFuture
              openTo="year"
              format="dd/MM/yyyy"
              views={['year', 'month', 'date']}
              value={value}
              {...otherProps}
              {...(errorText.length > 0 ? { error: true } : { error: false })}
              {...(errorText.length > 0 && { helperText: errorText })}
              style={{ width: '100%' }}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              keyboardIcon={<CakeIcon />}
            />
          </div>
        </MuiPickersUtilsProvider>
      </FormControl>
    </Grid>
  );
};

export default DateInput;
