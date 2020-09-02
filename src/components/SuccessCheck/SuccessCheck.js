import React from 'react';
import Lottie from 'react-lottie';
import * as loaderData from 'globals/animations/successMark.json';
import './SuccessCheck.scss';

export default class SuccessCheck extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isStopped: false, isPaused: false };
  }

  render() {
    const buttonStyle = {
      display: 'block',
      margin: '10px auto',
    };

    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: loaderData.default,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
      },
    };

    const { isStopped, isPaused } = this.state;

    return (
      <div className="loader-wrapper">
        <Lottie
          className="loader"
          options={defaultOptions}
          height={560}
          width={379}
          isStopped={isStopped}
          isPaused={isPaused}
        />
      </div>
    );
  }
}
