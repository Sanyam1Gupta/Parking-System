import React from 'react';
import Grid from '@material-ui/core/Grid';
import './dialog-header.scss';

const DialogHeader = props => {
  const { title = '', subtitle = '', children } = props;
  return (
    <Grid
      className="dialog-header-container"
      container
      justify="center"
      alignItems="center"
    >
      {title && (
        <Grid item xs={12} className="dialog-header-container__title">
          {title}
        </Grid>
      )}
      {subtitle && (
        <Grid item xs={12} className="dialog-header-container__subtitle">
          {subtitle}
        </Grid>
      )}
      {children}
    </Grid>
  );
};

export default DialogHeader;
