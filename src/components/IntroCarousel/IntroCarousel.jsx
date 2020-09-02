import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Lottie from 'react-lottie';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

import * as financialImmunityData from '../../globals/animations/financial_immunity.json';
import * as whyFinancialImmunityData from '../../globals/animations/why_financial_immunity.json';
import * as calculateFinancialImmunityData from '../../globals/animations/calculate_financial_immunity.json';
import * as trackYourGoalData from '../../globals/animations/track_your_goal.json';

import { setBannerCookie } from '../../utils/Storage.util';
import { isDesktop } from '../../utils/StoreAccessHelper';

import CarouselIndicator from '../CarouselIndicator';
import './intro-carousel.scss';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const buttonStyle = {
  margin: {
    margin: 0,
    borderRadius: '8px',
    padding: '12px',
    textTransform: 'capitalize',
    fontFamily: 'Lato, sans-serif',
    width: '200px',
  },
  contained: {
    fontSize: '0.5rem',
  },
};

const useStyles = makeStyles(() => ({
  ...buttonStyle,
}));

const defaultOptions = {
  loop: true,
  autoplay: true,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid meet',
  },
};

const financialImmunityDataOptions = {
  ...defaultOptions,
  animationData: financialImmunityData.default,
};

const whyFinancialImmunityDataOptions = {
  ...defaultOptions,
  animationData: whyFinancialImmunityData.default,
};

const calculateFinancialImmunityOptions = {
  ...defaultOptions,
  animationData: calculateFinancialImmunityData.default,
};

const trackYourGoalDataOptions = {
  ...defaultOptions,
  animationData: trackYourGoalData.default,
};

const IntroCarousel = props => {
  const { handleClose } = props;
  const [isAnimationPaused, setAnimationPauseState] = useState(false);
  const [isAnimationStopped, setAnimationStopState] = useState(false);

  const [activeStep, setActiveStep] = React.useState(0);
  const useClasses = useStyles();
  const maxSteps = 4;
  const lastElementIndex = maxSteps - 1;

  const handleNext = () => {
    if (activeStep === lastElementIndex) {
      setBannerCookie();
      handleClose();
    } else {
      setActiveStep(prevActiveStep =>
        prevActiveStep + 1 >= maxSteps ? maxSteps - 1 : prevActiveStep + 1,
      );
    }
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep =>
      prevActiveStep - 1 <= 0 ? 0 : prevActiveStep - 1,
    );
  };

  const handleStepChange = step => {
    setActiveStep(step);
  };

  const handleOnClickGetStarted = () => {
    setBannerCookie();
    handleClose();
  };

  return (
    <article id="intro-carousel-container">
      <section id="auto-play-swipable-view-container">
        <div className="carousel-nav left-icon">
          <ArrowBackIcon
            onClick={handleBack}
            disabled={activeStep === lastElementIndex}
          />
        </div>
        <div className="carousel-nav right-icon">
          <ArrowForwardIcon disabled={activeStep === 0} onClick={handleNext} />
        </div>
        <AutoPlaySwipeableViews
          autoplay={false}
          axis="x"
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
          style={{ height: 'auto' }}
        >
          <section className="image-container">
            <div className="carousel-header">
              {/* What Is Financial Immunity? */}
              What are Emergency Savings?
            </div>
            <Lottie
              className="animated-image-container"
              options={financialImmunityDataOptions}
              width={isDesktop() ? 320 : '100%'}
              style={{
                textAlign: 'center',
                marginTop: isDesktop() ? '64px' : '50px',
              }}
              isStopped={isAnimationStopped}
              isPaused={isAnimationPaused}
            />
            <div className="carousel-description">
              {/* Savings for a rainy DAY that can help you navigate through a
              medical emergency, job loss, natural calamities or home repair. */}
              Savings for an unexpected situation like medical emergency, job
              loss or natural calamity which covers 3-6 months of your expenses
            </div>
          </section>
          <section className="image-container">
            <div className="carousel-header">
              {/* Why do you need Financial Immunity? */}
              Why do you need Emergency Savings?
            </div>
            <Lottie
              className="animated-image-container"
              options={whyFinancialImmunityDataOptions}
              viewBoxSize="0 0 400 450"
              width={isDesktop() ? 320 : '100%'}
              style={{
                textAlign: 'center',
                marginTop: isDesktop() ? '64px' : '50px',
              }}
              isStopped={isAnimationStopped}
              isPaused={isAnimationPaused}
            />
            <div className="carousel-description">
              {/* Keeping an Emergency corpus can help reduce stress, keep debt in
              control, curb spending and ensure the financial well being of your
              loved ones! */}
              To help you reduce stress Keeping an Emergency corpus can help
              reduce stress, keep debt in control, curb spending and ensure the
              financial well being of your loved ones!
            </div>
          </section>
          <section className="image-container">
            <div className="carousel-header">
              Calculate your Financial Immunity Goal
            </div>
            <Lottie
              className="animated-image-container"
              options={calculateFinancialImmunityOptions}
              viewBoxSize="0 0 400 450"
              width={isDesktop() ? 320 : '100%'}
              style={{
                textAlign: 'center',
                marginTop: isDesktop() ? '64px' : '50px',
              }}
              isStopped={isAnimationStopped}
              isPaused={isAnimationPaused}
            />
            <div className="carousel-description">
              {/* Just enter 4 fields to view how much you need to save to achieve
              Financial Immunity. Get a complete savings plan along with
              personalised insights to achieve your goal! */}
              Just enter 3 fields and get to know how much you need to keep in
              your savings account to be emergency ready.
            </div>
          </section>
          <section className="image-container">
            <div className="carousel-header">
              {/* Track Your Goal */}
              Track your Progress
            </div>
            <Lottie
              className="animated-image-container"
              options={trackYourGoalDataOptions}
              viewBoxSize="0 0 400 450"
              width={isDesktop() ? 320 : '100%'}
              style={{
                textAlign: 'center',
                marginTop: isDesktop() ? '64px' : '50px',
              }}
              isStopped={isAnimationStopped}
              isPaused={isAnimationPaused}
            />
            <div className="carousel-description">
              {/* Through a quick sign up save and track your progress. Achieve your
              goal as per the plan and be ready for any rainy day! */}
              Log in anytime to check your progress. Achieve your goal and be
              worry free.
            </div>
          </section>
        </AutoPlaySwipeableViews>
      </section>

      <div className="carousel-action-container">
        <Button
          color="primary"
          variant="contained"
          disableElevation
          size="large"
          className={`${useClasses.margin}`}
          onClick={handleOnClickGetStarted}
        >
          Get Started
        </Button>
        <CarouselIndicator activeStep={activeStep} max={maxSteps} />
      </div>
    </article>
  );
};

export default IntroCarousel;
