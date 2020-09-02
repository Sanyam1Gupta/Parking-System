import React from 'react';
import styled from 'styled-components';
import Fade from '@material-ui/core/Fade';

const OflineBackDropContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9999999;
`;

const OfflineModeBackDrop = props => {
  const { isOnline } = props;
  return (
    <Fade in={!isOnline}>
      <OflineBackDropContainer id="offline-mode-backdrop" />
    </Fade>
  );
};

export default OfflineModeBackDrop;
