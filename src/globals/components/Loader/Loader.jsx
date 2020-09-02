import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Fade from '@material-ui/core/Fade';
import Lottie from 'react-lottie';
import * as loaderData from '../../animations/loader.json';
import './loader.scss';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: loaderData.default,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const Loader = props => {
  const [isStopped, setIsStopped] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const loaderStore = useSelector(state => state?.loaderStore || {});
  const { status } = loaderStore;
  const { loaderStatus = false } = props;

  return (
    <Fade in={status || loaderStatus}>
      <div className="loader-container">
        <Lottie
          className="loader"
          options={defaultOptions}
          height={400}
          width={400}
          isStopped={isStopped}
          isPaused={isPaused}
        />
      </div>
    </Fade>
  );
};

export default Loader;
