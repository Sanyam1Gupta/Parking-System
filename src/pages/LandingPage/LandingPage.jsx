import React from 'react';
import styled from 'styled-components';
import Container from '@material-ui/core/Container';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import IntroCarousel from '../../components/IntroCarousel/IntroCarousel';
import Banner from '../../components/Banner/Banner';
import TextInput from '../../components/TextInput/TextInput';
import FButton from '../../components/FButton/FButton';
import '../Home/home.scss';

const LandingPageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  width: 100%;

  margin: 0px auto;
  padding: 16px;
  box-sizing: border-box;
  background-color: #f3f3f3;
`;

class LandingPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ind: false,
    };
  }

  handleDetails = () => {
    // history.push('/kr');

    console.log('sd');
  };

  render() {
    const { ind } = this.state;
    return (
      <section id="calculator-form-container">
        <Container
          maxWidth="md"
          disableGutters
          className="banner-box-container"
        >
          <Banner />
          <FButton
            variant="contained"
            disableElevation
            color="primary"
            id="btn-update"
            onClick={this.handleDetails}
          >
            <Link to="/kr">Enter</Link>;
          </FButton>
        </Container>
      </section>
    );
  }
}

export default LandingPage;
