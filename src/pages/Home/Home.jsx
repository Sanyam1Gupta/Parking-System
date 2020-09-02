import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ButtonBase from '@material-ui/core/ButtonBase';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import moment from 'moment';
import Banner from '../../components/Banner/Banner';
import TextInput from '../../components/TextInput/TextInput';
import FButton from '../../components/FButton/FButton';
import SwitchButton from '../../components/SwitchButton/SwitchButton';
import BasicForm from '../../components/BasicForm/BasicForm';

import calculateAndSave from './Calculator.actions';
import getTestimonialAndFaq from '../../globals/actions/TestimonialFaq.actions';
import { showLoader, hideLoader } from '../../globals/actions/Loader.actions';

import CustomLogger from '../../utils/CustomLogger';
import Api from '../../utils/Api';
import {
  setFormState,
  resetFormState,
} from '../../globals/actions/AppState.actions';

import {
  enqueueSnackbar,
  closeSnackbar,
} from '../../globals/actions/Snackbar.actions';

import './home.scss';

class Home extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dialogStatus: false,
      countriesList: '',
      parkingLotsList: '',
      country: '',
      parkingLot: '',
      selectedParkingLot: '',
      user: '',
      name: '',
      vehicleNo: '',
      is2wh: false,
      loginOrRegister: false,
      registeredMessage: '',
      loggedInMessage: '',
      loggedInErrorMessage: '',
      ticket4w: '',
      ticket2w: '',
      fees: '',
    };
    this.applyForParking2W = this.applyForParking2W.bind(this);
  }

  /* async componentDidMount() {
    const { history, appStateStore, actions, customerStore = {} } = this.props;

    // NOTE: fetch testimonials and faq
    // call only if data is not present
    const options = {
      url: '/countries',
      method: 'GET',
    };

    const apiInstance = new Api({
      reqEncryption: 'NONE',
      resDecryption: 'NONE',
    });

    const response = await apiInstance.request(options);
    console.log(response.data.countries);

    this.setState({
      countriesList: response.data.countries,
    });
  } */

  getCountriesList = async id => {
    const options = {
      url: '/countries',
      method: 'GET',
    };

    const apiInstance = new Api({
      reqEncryption: 'NONE',
      resDecryption: 'NONE',
    });

    const response = await apiInstance.request(options);
    console.log(response.data.countries);

    this.setState({
      countriesList: response.data.countries,
    });
  };

  handleOnChange = event => {
    const { name } = event.target;
    const { value } = event.target;
    const { countriesList, parkingLotsList } = this.state;
    console.log(event.target);

    this.setState({
      [name]: value,
    });
    if (name === 'country') {
      let i;
      let id;
      for (i = 0; i < countriesList.length; i += 1) {
        if (countriesList[i].name === value) id = countriesList[i]._id;
      }
      this.getCountryById(id);
      console.log(id);
    }
    if (name === 'selectedParkingLot') {
      let i;
      let id;
      for (i = 0; i < parkingLotsList.length; i += 1) {
        if (parkingLotsList[i].zipcode === value) id = parkingLotsList[i]._id;
      }
      this.getParkingLotById(id);
      console.log(id);
    }

    // SAVING
  };

  getCountryById = async id => {
    const str = `/countries/${id}`;
    const options = {
      url: str,
      method: 'GET',
    };

    const apiInstance = new Api({
      reqEncryption: 'NONE',
      resDecryption: 'NONE',
    });

    const response = await apiInstance.request(options);
    console.log(response);
    this.setState({
      parkingLotsList: response.data.country.parkingLots,
    });
  };

  getParkingLotById = async id => {
    const str = `/parkingLots/${id}`;
    const options = {
      url: str,
      method: 'GET',
    };

    const apiInstance = new Api({
      reqEncryption: 'NONE',
      resDecryption: 'NONE',
    });

    const response = await apiInstance.request(options);
    console.log(response.data.parkingLot);
    this.setState({
      parkingLot: response.data.parkingLot,
    });
  };

  applyForParking2W = async () => {
    const { parkingLot, name: n, vehicleNo: v, user, ticket2w } = this.state;
    const { wheel2TC, _id } = parkingLot;
    const str = `/parkingLots/${_id}`;
    const a = {
      countTotal: parkingLot.countW2,
      countFilled: parkingLot.wheel2TC.length,
      name: n,
      vehicleNo: v,
    };
    const options = {
      url: '/wheel2TC',
      method: 'POST',
      data: a,
    };

    const apiInstance = new Api({
      reqEncryption: 'NONE',
      resDecryption: 'NONE',
    });

    const response = await apiInstance.request(options);
    console.log(response);
    this.setState({
      ticket2w: response.data.createdwheel2t,
    });
    wheel2TC.push(response.data.createdwheel2t._id);
    const b = [
      {
        propName: 'wheel2TC',
        value: wheel2TC,
      },
    ];
    const options1 = {
      url: str,
      method: 'Patch',
      data: b,
    };

    const apiInstance1 = new Api({
      reqEncryption: 'NONE',
      resDecryption: 'NONE',
    });

    const response1 = await apiInstance1.request(options1);
    console.log(response1);
    this.patchUser();
  };

  applyForParking4W = async () => {
    const { parkingLot, name: n, vehicleNo: v, user, ticket4w } = this.state;
    const { wheel4TC, _id } = parkingLot;
    const str = `/parkingLots/${_id}`;
    const a = {
      countTotal: parkingLot.countW4,
      countFilled: parkingLot.wheel4TC.length,
      name: n,
      vehicleNo: v,
    };
    const options = {
      url: '/wheel4TC',
      method: 'POST',
      data: a,
    };

    const apiInstance = new Api({
      reqEncryption: 'NONE',
      resDecryption: 'NONE',
    });

    const response = await apiInstance.request(options);
    console.log(response);
    this.setState({
      ticket4w: response.data.createdwheel4t,
    });
    wheel4TC.push(response.data.createdwheel4t._id);
    const b = [
      {
        propName: 'wheel4TC',
        value: wheel4TC,
      },
    ];
    const options1 = {
      url: str,
      method: 'Patch',
      data: b,
    };

    const apiInstance1 = new Api({
      reqEncryption: 'NONE',
      resDecryption: 'NONE',
    });

    const response1 = await apiInstance1.request(options1);
    console.log(response1);
    this.patchUser();
  };

  patchUser = async () => {
    const {
      parkingLot,
      name: n,
      vehicleNo: v,
      user,
      ticket4w,
      ticket2w,
    } = this.state;
    const { wheel4TC, _id } = parkingLot;
    const { _id: id } = user;
    const str = `/registration/${id}`;
    let a;
    if (ticket4w !== '') {
      a = [
        {
          propName: 'wh4tc_id',
          value: ticket4w._id,
        },
        {
          propName: 'parkingLot_id',
          value: _id,
        },
      ];
    } else {
      a = [
        {
          propName: 'wh2tc_id',
          value: ticket2w._id,
        },
        {
          propName: 'parkingLot_id',
          value: _id,
        },
      ];
    }
    const options1 = {
      url: str,
      method: 'Patch',
      data: a,
    };

    const apiInstance1 = new Api({
      reqEncryption: 'NONE',
      resDecryption: 'NONE',
    });

    const response1 = await apiInstance1.request(options1);
    console.log(response1);
  };

  handleSwitchFields = event => {
    const { name, checked } = event.target;
    this.setState({
      [name]: checked,
    });
  };

  handleLoginOrRegister = async () => {
    const {
      parkingLot,
      name: n,
      vehicleNo: v,
      is2wh: i,
      loginOrRegister,
    } = this.state;
    const { wheel2TC, _id } = parkingLot;
    const str = `/parkingLots/${_id}`;
    if (loginOrRegister) {
      const a = {
        name: n,
        vehicleNo: v,
        is2wh: i,
      };
      const options = {
        url: '/registration/register/',
        method: 'POST',
        data: a,
      };

      const apiInstance = new Api({
        reqEncryption: 'NONE',
        resDecryption: 'NONE',
      });

      const response = await apiInstance.request(options);
      console.log(response);
      this.setState({
        registeredMessage: 'You are registered successfully',
        user: response.data.registration,
      });
      this.getCountriesList();
    } else {
      const a = {
        name: n,
        vehicleNo: v,
      };
      const options = {
        url: '/registration/login/',
        method: 'POST',
        data: a,
      };

      const apiInstance = new Api({
        reqEncryption: 'NONE',
        resDecryption: 'NONE',
      });

      const response = await apiInstance.request(options);
      console.log(response);
      if (!response.data.error) {
        this.getCountriesList();
        this.setState({
          loggedInMessage: 'You are logged in successfully',
          loggedInErrorMessage: '',
          user: response.data.registeredUsers[0].user,
        });
      } else
        this.setState({
          loggedInErrorMessage: response.data.message,
          loggedInMessage: '',
        });
    }
  };

  handleSignOut = async () => {
    const { ticket2w, ticket4w, user, parkingLot } = this.state;
    const { wheel2TC, id5, wheel4TC } = parkingLot;
    const str5 = `/parkingLots/${id5}`;
    let d1;
    let fee;
    console.log(user);
    if (user.is2wh) {
      const id = user.wh2tc_id;
      const str = `/wheel2TC/${id}`;
      const options = {
        url: str,
        method: 'GET',
      };

      const apiInstance = new Api({
        reqEncryption: 'NONE',
        resDecryption: 'NONE',
      });
      const response = await apiInstance.request(options);
      console.log(response);
      d1 = response.data.wh2tc.createdAt;
      const options1 = {
        url: str,
        method: 'DELETE',
      };
      const response1 = await apiInstance.request(options1);
      const currentDate = moment(new Date());
      d1 = moment(d1);
      const duration = moment.duration(currentDate.diff(d1));
      const hours = duration.asHours();
      if (hours <= 1) fee = 30;
      else if (hours > 1 && hours <= 2) fee = 50;
      else if (hours > 2) fee = 100;
      /* const i = wheel2TC.indexOf(id);
      wheel2TC.splice(i, 1);
      const z = [
        {
          propName: 'wheel2TC',
          value: wheel2TC,
        },
      ];
      const options5 = {
        url: str5,
        method: 'PATCH',
        data: z,
      };

      const apiInstance5 = new Api({
        reqEncryption: 'NONE',
        resDecryption: 'NONE',
      });
      const response5 = await apiInstance5.request(options5);
      console.log(response5); */
    } else {
      const id = user.wh4tc_id;
      const str = `/wheel4TC/${id}`;
      const options = {
        url: str,
        method: 'GET',
      };

      const apiInstance = new Api({
        reqEncryption: 'NONE',
        resDecryption: 'NONE',
      });
      const response = await apiInstance.request(options);
      console.log(response);
      d1 = response.data.wh4tc.createdAt;
      const options1 = {
        url: str,
        method: 'DELETE',
      };
      const response1 = await apiInstance.request(options1);
      const currentDate = moment(new Date());
      d1 = moment(d1);
      const duration = moment.duration(currentDate.diff(d1));
      const hours = duration.asHours();
      if (hours <= 1) fee = 40;
      else if (hours > 1 && hours <= 2) fee = 60;
      else if (hours > 2) fee = 150;
      /* const i = wheel4TC.indexOf(id);
      wheel4TC.splice(i, 1);
      const z = [
        {
          propName: 'wheel4TC',
          value: wheel4TC,
        },
      ];
      const options5 = {
        url: str5,
        method: 'PATCH',
        data: z,
      };

      const apiInstance5 = new Api({
        reqEncryption: 'NONE',
        resDecryption: 'NONE',
      });
      const response5 = await apiInstance5.request(options5);
      console.log(response5); */
    }
    const fdata = [
      {
        propName: 'wh2tc_id',
        value: null,
      },
      {
        propName: 'wh4tc_id',
        value: null,
      },
      {
        propName: 'parkingLot_id',
        value: null,
      },
    ];
    const id = user._id;
    const str = `/registration/${id}`;
    const options = {
      url: str,
      method: 'PATCH',
      data: fdata,
    };

    const apiInstance = new Api({
      reqEncryption: 'NONE',
      resDecryption: 'NONE',
    });
    const response = await apiInstance.request(options);
    console.log(response);
    console.log(fee);
    this.setState({
      fees: fee,
    });
  };

  render() {
    const {
      dialogStatus,
      countriesList,
      country,
      parkingLotsList,
      parkingLot,
      selectedParkingLot,
      user,
      name,
      vehicleNo,
      is2wh,
      loginOrRegister,
      registeredMessage,
      loggedInMessage,
      loggedInErrorMessage,
      ticket4w,
      ticket2w,
      fees,
    } = this.state;
    console.log(user);
    const nameInputDetails = {
      error: false,
      id: 'txt-name',
      label: 'Enter Name',
      value: name,
      name: 'name',
      defaultValue: '',
      iconType: 'tooltip',
      onChange: this.handleOnChange,
      iconHelperText: 'Enter your name',
    };

    const vehicleNoInputDetails = {
      error: false,

      id: 'txt-vehicleNo',
      label: 'Enter vehicle No',
      value: vehicleNo,
      name: 'vehicleNo',
      defaultValue: '',
      iconType: 'tooltip',
      onChange: this.handleOnChange,
      iconHelperText: ' Please enter your vehicle No',
    };
    const countryInputDetails = {
      error: false,
      id: 'txt-country',
      label: 'Country',
      value: country,
      name: 'country',
      defaultValue: '',
      iconType: null,
      onChange: this.handleOnChange,
      iconHelperText: null,
    };
    const parkingLotInputDetails = {
      error: false,
      id: 'txt-parking-lot',
      label: 'Parking lot by zipcode',
      value: selectedParkingLot,
      name: 'selectedParkingLot',
      defaultValue: '',
      iconType: null,
      onChange: this.handleOnChange,
      iconHelperText: null,
    };
    return (
      <section id="calculator-form-container">
        <Container
          maxWidth="md"
          disableGutters
          className="banner-box-container"
        >
          <Banner />
        </Container>

        <Container
          maxWidth="md"
          disableGutters
          className="check-immunity-container"
        >
          <Grid container>
            <Grid item>Login</Grid>
            <Grid item>
              <SwitchButton
                handleOnChange={this.handleSwitchFields}
                name="loginOrRegister"
                value={loginOrRegister}
              />
            </Grid>
            <Grid item>Register</Grid>
          </Grid>
          <TextInput {...nameInputDetails} />
          <TextInput {...vehicleNoInputDetails} />
          {loginOrRegister && (
            <SwitchButton
              handleOnChange={this.handleSwitchFields}
              name="is2wh"
              value={is2wh}
              detailedView
            />
          )}
          <FButton
            variant="contained"
            disableElevation
            color="primary"
            id="btn-update"
            onClick={this.handleLoginOrRegister}
          >
            Enter
          </FButton>
          {registeredMessage !== '' && <div>{registeredMessage}</div>}
          {loggedInMessage !== '' && <div>{loggedInMessage}</div>}
          {loggedInErrorMessage !== '' && <div>{loggedInErrorMessage}</div>}
          {(user === '' ||
            user.parkingLot_id === null ||
            user.parkingLot_id === undefined) && (
            <>
              {countriesList.length > 0 && (
                <TextInput
                  selectBox
                  {...countryInputDetails}
                  selectOptions={countriesList}
                />
              )}
            </>
          )}
          {user !== '' &&
            user.parkingLot_id !== null &&
            user.parkingLot_id !== undefined && (
              <FButton
                variant="contained"
                disableElevation
                color="primary"
                id="btn-update"
                disabled={fees !== ''}
                onClick={this.handleSignOut}
              >
                Calculate fee and release spot
              </FButton>
            )}
          {parkingLotsList.length > 0 && (
            <TextInput
              selectBox1
              {...parkingLotInputDetails}
              selectOptions={parkingLotsList}
            />
          )}
          {parkingLot && (
            <>
              <div>
                The selected parking lot has a 2 wheeler capacity of{' '}
                {parkingLot.countW2}
              </div>
              <div>
                The selected parking lot has a 4 wheeler capacity of{' '}
                {parkingLot.countW4}
              </div>
              <Grid container>
                {user.is2wh && (
                  <Grid item xs={6}>
                    <FButton
                      variant="contained"
                      disableElevation
                      color="primary"
                      id="btn-update"
                      onClick={this.applyForParking2W}
                    >
                      Apply for a parking spot for a 2 wheeler
                    </FButton>
                  </Grid>
                )}
                {!user.is2wh && (
                  <Grid item xs={6}>
                    <FButton
                      variant="contained"
                      disableElevation
                      color="primary"
                      id="btn-update"
                      onClick={this.applyForParking4W}
                    >
                      Apply for a parking spot for a 4 wheeler
                    </FButton>
                  </Grid>
                )}
              </Grid>
            </>
          )}
          {fees !== '' && <div>Your Parking fee is {fees}.</div>}
        </Container>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  appStateStore: state?.appStateStore || {},
  authStore: state?.authStore || {},
});

const mapDispatchToProps = dispatch => ({
  actions: {
    calculateAndSave: data => dispatch(calculateAndSave(data)),
    getTestimonialAndFaq: () => dispatch(getTestimonialAndFaq()),
    setFormState: data => dispatch(setFormState(data)),
    resetFormState: () => dispatch(resetFormState()),
    showLoader: () => dispatch(showLoader()),
    hideLoader: () => dispatch(hideLoader()),
    enqueueSnackbar: (...data) => dispatch(enqueueSnackbar(...data)),
    closeSnackbar: (...data) => dispatch(closeSnackbar(...data)),
    logout: () => dispatch(logout()),
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
