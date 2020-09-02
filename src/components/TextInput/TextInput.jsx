import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import CheckCircle from '@material-ui/icons/CheckCircle';
import HighlightOff from '@material-ui/icons/HighlightOff';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FilledInput from '@material-ui/core/FilledInput';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import NumberFormat from 'react-number-format';
import './TextInput.scss';

const useStyles = makeStyles(theme => {
  return {
    root: props => ({
      '& .MuiFormLabel-root.Mui-focused': {
        color: theme.palette.secondary.main,
        fontFamily: 'Lato',
      },
      '& .MuiFormLabel-root.Mui-error': {
        color: theme.palette.error.main,
      },
      '& .MuiFormLabel-root.Mui-error.Mui-focused': {
        color: theme.palette.error.main,
      },
      '& .MuiFormHelperText-root.Mui-error': {
        color: theme.palette.extraColors.smoke.main,
        fontFamily: 'Lato',
      },
      '& .MuiFormHelperText-contained': {
        color: theme.palette.extraColors.smoke.main,
        fontSize: '10px',
        lineHeight: '12px',
        fontFamily: 'Lato',
      },
      '& .MuiInputLabel-filled': {
        fontWeight: '400',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
      '& label.Mui-focused': {
        color: theme.palette.extraColors.smoke.main,
      },
      '& .MuiFilledInput-input': {
        color: theme.palette.extraColors.charcoal.main,
        fontFamily: 'Lato',
        fontWeight: '700',
        fontSize: '16px',
      },
      '& .MuiFilledInput-underline:hover:before': {
        border: '0px solid none',
      },
      '& .MuiFilledInput-underline:after': {
        border: '0',
        borderBottomColor: 'none',
      },
      '& .MuiFilledInput-underline:before': {
        border: '0',
        borderBottom: `1px solid ${theme.palette.extraColors.smoke.main}`,
      },
      '& .MuiFilledInput-underline.Mui-focused:before': {
        borderBottom: `2px solid ${theme.palette.secondary.main}`,
      },
      '& .MuiFilledInput-underline.Mui-error:after': {
        transform: 'scaleX(1)',
        borderBottom: `2px solid ${theme.palette.error.main}`,
      },
      '& .MuiFilledInput-root': {
        border: `1px solid ${theme.palette.extraColors.inputBorder.main}`,
        background: theme.palette.extraColors.inputBackground.main,
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

const getStartAdornment = startAdornmentValue => {
  if (startAdornmentValue) {
    return (
      <InputAdornment position="start">{startAdornmentValue}</InputAdornment>
    );
  }
  return false;
};

function NumberFormatCustom(props) {
  const { inputRef, onChange, onBlur, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      onBlur={() => {
        onBlur({
          target: {
            name: props.name,
            value: props.value,
          },
        });
      }}
      thousandSeparator
      allowNegative={false}
      thousandsGroupStyle="lakh"
      isNumericString
      decimalSeparator={false}
      prefix="₹"
    />
  );
}

function MobileNumberFormatCustom(props) {
  const { inputRef, onChange, onBlur, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      onBlur={() => {
        onBlur({
          target: {
            name: props.name,
            value: props.value,
          },
        });
      }}
      allowNegative={false}
      isNumericString
      format="+91 ##########"
      allowEmptyFormatting={false}
    />
  );
}

const getIconComponent = (
  iconType,
  iconHelperText,
  iconHelperTitle,
  openInfoStagger,
) => {
  const theme = useTheme();
  if (iconType === 'tooltip' && iconHelperText !== null) {
    return (
      <InputAdornment position="end">
        <Tooltip
          title={iconHelperText}
          arrow
          placement="top"
          enterTouchDelay={50}
        >
          <IconButton aria-label="add">
            <InfoOutlinedIcon
              style={{
                color: theme.palette.extraColors.inputBottomBorder.main,
                fontSize: 24,
              }}
            />
          </IconButton>
        </Tooltip>
      </InputAdornment>
    );
  }
  if (iconType === 'tooltip' && iconHelperText === null) {
    return (
      <InputAdornment position="end">
        <Tooltip title={iconHelperText}>
          <IconButton aria-label="add">
            <InfoOutlinedIcon
              style={{
                color: theme.palette.extraColors.inputBorder.main,
                fontSize: 24,
              }}
            />
          </IconButton>
        </Tooltip>
      </InputAdornment>
    );
  }
  if (iconType === 'check') {
    return (
      <InputAdornment position="end">
        <IconButton aria-label="add">
          <CheckCircle
            style={{
              color: theme.palette.extraColors.success.main,
              fontSize: 24,
            }}
          />
        </IconButton>
      </InputAdornment>
    );
  }
  if (iconType === 'cross') {
    return (
      <InputAdornment position="end">
        <IconButton aria-label="add">
          <HighlightOff
            style={{
              color: theme.palette.extraColors.error.main,
              fontSize: 24,
            }}
          />
        </IconButton>
      </InputAdornment>
    );
  }
  return null;
};
const TextInput = props => {
  const {
    id,
    error,
    errorText,
    helperText,
    label,
    type,
    defaultValue,
    value,
    min,
    max,
    iconType,
    iconHelperText,
    iconHelperTitle,
    inputStyles,
    startAdornment,
    startAdornmentValue,
    openInfoStagger,
    inputProperties,
    prefixNumberFormat = false,
    mobileNumberFormat = false,
    selectBox = false,
    selectBox1 = false,
    dateInput = false,
    selectOptions,
    inputProps = {},
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
      <FormControl
        fullWidth
        variant="filled"
        error={error}
        className={classes.root}
      >
        {!prefixNumberFormat &&
          !mobileNumberFormat &&
          !selectBox &&
          !dateInput &&
          !selectBox1 && (
            <>
              <InputLabel htmlFor="component-filled">{label}</InputLabel>
              <FilledInput
                id={id}
                className="text-input__input"
                {...otherProps}
                error={error}
                value={value}
                type={type}
                min={min}
                startAdornment={getStartAdornment(startAdornmentValue)}
                endAdornment={getIconComponent(
                  iconType,
                  iconHelperText,
                  iconHelperTitle,
                  openInfoStagger,
                )}
                inputProps={{ maxLength: max }}
              />
            </>
          )}

        {prefixNumberFormat &&
          !mobileNumberFormat &&
          !selectBox &&
          !selectBox1 && (
            <TextField
              id={id}
              className="text-input__input"
              label={label}
              error={error}
              {...otherProps}
              value={value}
              type={type}
              min={min}
              variant="filled"
              InputProps={{
                inputComponent: NumberFormatCustom,
                maxLength: max,
                startAdornment: getStartAdornment(startAdornmentValue),
                endAdornment: getIconComponent(
                  iconType,
                  iconHelperText,
                  iconHelperTitle,
                  openInfoStagger,
                ),
              }}
              InputLabelProps={{}}
            />
          )}

        {!prefixNumberFormat && !mobileNumberFormat && selectBox1 && (
          <TextField
            id={id}
            className="text-input__input"
            label={label}
            error={error}
            {...otherProps}
            value={value}
            select
            type={type}
            min={min}
            variant="filled"
            InputProps={{
              startAdornment: getStartAdornment(startAdornmentValue),
              endAdornment: getIconComponent(
                iconType,
                iconHelperText,
                iconHelperTitle,
                openInfoStagger,
              ),
            }}
          >
            {selectOptions.map(option => (
              <MenuItem
                key={option.zipcode}
                value={option.zipcode}
                style={{ paddingTop: '2px', paddingBottom: '3px' }}
              >
                {option.zipcode}
              </MenuItem>
            ))}
          </TextField>
        )}
        {!prefixNumberFormat && !mobileNumberFormat && selectBox && (
          <TextField
            id={id}
            className="text-input__input"
            label={label}
            error={error}
            {...otherProps}
            value={value}
            select
            type={type}
            min={min}
            variant="filled"
            InputProps={{
              startAdornment: getStartAdornment(startAdornmentValue),
              endAdornment: getIconComponent(
                iconType,
                iconHelperText,
                iconHelperTitle,
                openInfoStagger,
              ),
            }}
          >
            {selectOptions.map(option => (
              <MenuItem
                key={option.name}
                value={option.name}
                style={{ paddingTop: '2px', paddingBottom: '3px' }}
              >
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        )}

        {error && (
          <FormHelperText id="component-error-text" style={{ color: 'red' }}>
            {errorText}
          </FormHelperText>
        )}
        {!error && helperText && (
          <FormHelperText id="component-error-text">
            {helperText}
          </FormHelperText>
        )}
      </FormControl>
    </Grid>
  );
};

export default TextInput;
