import React from 'react';
import { isPast } from 'date-fns';
import styled from 'styled-components';

const CarouselIndicatorContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 24px;
  margin-bottom: 12px;
  box-sizing: border-box;
  min-height: 20px;
`;

const Indicator = styled.div`
  height: 4px;
  width: 4px;
  background-color: #d8d8d8;
  transition: 0.3s all ease-in-out;
  margin-right: 10px;
  border-radius: 50%;
  &.active {
    transition: 0.3s all ease-in-out;
    height: 12px;
    width: 12px;
  }
  &:last-child {
    margin-right: 0px;
  }
`;

const CarouselIndicator = props => {
  const { activeStep, max } = props;
  const indicatorGroup = [];
  for (let i = 0; i < max; i += 1) {
    const activeClass = activeStep === i ? 'active' : '';
    const dotId = `dot-${i + 1}`;
    const indicator = (
      <Indicator key={dotId} className={`indicator ${activeClass}`} />
    );
    indicatorGroup.push(indicator);
  }
  return (
    <CarouselIndicatorContainer>{indicatorGroup}</CarouselIndicatorContainer>
  );
};

export default CarouselIndicator;
