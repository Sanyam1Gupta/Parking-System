import React, { PureComponent } from 'react';
import Grid from '@material-ui/core/Grid';
import CalcBannerImage from '../../globals/images/calc_banner.png';
import './Banner.scss';

class Banner extends PureComponent {
  render() {
    return (
      <Grid
        container
        spacing={0}
        alignItems="center"
        className="banner-container"
        id="banner-container"
      >
        <Grid item xs={9}>
          <div className="reach-your-money-goa">Take parking spot</div>
          <div className="faster-with-immunity">Calculate your fee</div>
        </Grid>
        <Grid item xs={3} className="banner-right-section">
          <img src={CalcBannerImage} alt="website logo" />
        </Grid>
      </Grid>
    );
  }
}

export default Banner;
