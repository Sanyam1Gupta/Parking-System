import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const buttonStyle = {
  margin: {
    margin: 0,
    borderRadius: '8px',
    padding: '12px',
    textTransform: 'capitalize',
    fontFamily: 'Lato, sans-serif',
  },
  contained: {
    fontSize: '0.4rem',
  },
};

const useStyles = makeStyles(() => ({
  ...buttonStyle,
}));

const FButton = props => {
  const useClasses = useStyles();
  const { className = '' } = props;
  const classNameAppend = className
    ? `${useClasses.margin} ${className}`
    : `${useClasses.margin}`;
  return <Button {...props} className={`${classNameAppend}`} />;
};

export default FButton;
