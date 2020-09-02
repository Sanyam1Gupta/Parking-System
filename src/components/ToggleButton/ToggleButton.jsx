import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

const useStyles = makeStyles(theme => {
  return {
    toggleContainer: props => ({
      '& .MuiToggleButton-root': {
        color: theme.palette.extraColors.switchColor.main,
        borderColor: theme.palette.extraColors.switchColor.main,
        fontSize: '0.75rem',
        padding: '8px 16px',
      },
      '& .MuiToggleButton-root.Mui-selected': {
        backgroundColor: theme.palette.extraColors.switchColor.main,
        color: theme.palette.common.white,
      },
    }),
  };
});

const ToggleButtonNotEmpty = props => {
  const { value, type, handleSwitchFields } = props;
  const trueValue = true;
  const falseValue = false;
  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      handleSwitchFields({
        name: type,
        value: newAlignment,
      });
    }
  };

  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      <Grid item sm={12} md={6}>
        <div className={classes.toggleContainer}>
          <ToggleButtonGroup
            value={value}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
          >
            <ToggleButton value={trueValue} aria-label="left aligned">
              Yes
            </ToggleButton>
            <ToggleButton value={falseValue} aria-label="centered">
              No
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </Grid>
    </Grid>
  );
};

export default ToggleButtonNotEmpty;
