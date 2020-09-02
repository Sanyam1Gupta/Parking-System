import React from 'react';
import Lottie from 'react-lottie';
import Grid from '@material-ui/core/Grid';
import * as usersGrowthIcon from '../../globals/animations/Growth.json';

const defaultOptions = {
  loop: true,
  autoplay: true,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid meet',
  },
};

const usersGrowthDataOptions = {
  ...defaultOptions,
  animationData: usersGrowthIcon.default,
};

const CurrentActiveUser = props => {
  const { _isDesktop } = props;
  if (_isDesktop()) {
    return null;
  }

  return (
    !_isDesktop() && (
      <div className="active-users-outer-layout">
        <Grid container className="active-users-layout">
          <Grid item>
            <Lottie
              options={usersGrowthDataOptions}
              style={{
                textAlign: 'center',
              }}
              isStopped={false}
              isPaused={false}
            />
          </Grid>
          <Grid item xs={9} style={{ paddingLeft: '12px' }}>
            <div className="users-checked-text">
              <span style={{ fontWeight: 900 }}>3000+ users </span>
              have checked their immunity in the last week.
            </div>
          </Grid>
        </Grid>
      </div>
    )
  );
};

export default CurrentActiveUser;
