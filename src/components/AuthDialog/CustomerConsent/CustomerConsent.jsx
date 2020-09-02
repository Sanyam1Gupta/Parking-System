import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import { CSSTransition } from 'react-transition-group';
import Slide from '@material-ui/core/Slide';
import TextInput from '../../TextInput/TextInput';
import Footer from '../../Footer/Footer';
import CustomerConsentImage from '../../../globals/images/customer_consent.svg';
import { getMaskedCardNumber } from '../../../utils/global';
import './customer-consent.scss';

const styles = theme => ({
    root: {
        '& .MuiButton-root': {
            borderRadius: '8px',
            height: '56px',
            marginTop: '144px',
            textTransform: 'inherit',
            paddingLeft: '28px',
            paddingRight: '28px',
        },
    },
});

class CustomerConsent extends React.Component {
    constructor(props) {
        super(props);
        console.log("in customer consent");
    }

    render() {
        const { classes, whichScreen, toggleBetweenScreens } = this.props;
        return (
            <div className="auth-layout__container">
                <Grid container direction="column" className="customer-consent-container">
                    <img src={CustomerConsentImage} alt="website logo" />
                    <Grid item xs={9} style={{ paddingTop: '16px' }}>
                        <div className="consent-awaited-text">
                            Customer &apos; s consent awaited. Kindly wait.
                        </div>
                    </Grid>
                    <Grid item xs={8} style={{ paddingTop: '16px' }}>
                        <div className="sms-sent-text">
                            AN SMS ASKING THE CUSTOMER&apos;S CONSENT HAS BEEN SENT TO {getMaskedCardNumber("7080864810")}
                        </div>
                    </Grid>
                    <Grid item xs={8} className={classes.root}>
                        <Button
                            className="cancel__button"
                            variant="contained"
                        >
                            Cancel
                        </Button>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(CustomerConsent);
