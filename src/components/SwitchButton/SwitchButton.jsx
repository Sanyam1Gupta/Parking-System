import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import './switch-button.scss';

const CustomSwitch = withStyles((theme) => ({
    root: {
        width: 36,
        height: 18,
        padding: 1,
        display: 'flex',
    },
    switchBase: {
        padding: 2,
        color: theme.palette.common.white,
        '&$checked': {
            paddingLeft: 6,
            transform: 'translateX(12px)',
            color: theme.palette.common.white,
            '& + $track': {
                opacity: 1,
                backgroundColor: theme.palette.secondary.main,
                borderColor: theme.palette.secondary.main,
            },
        },
    },
    thumb: {
        width: 16,
        height: 15,
        boxShadow: 'none',
    },
    track: {
        border: `1px solid ${theme.palette.grey[500]}`,
        borderRadius: 19 / 2,
        opacity: 1,
        backgroundColor: theme.palette.grey[500],
    },
    checked: {},
}))(Switch);

const CustomDetailedViewSwitch = withStyles((theme) => ({
    root: {
        width: 36,
        height: 19,
        padding: 2,
        display: 'flex',
    },
    switchBase: {
        padding: 3,
        paddingRight: 0,
        color: theme.palette.common.white,
        '&$checked': {
            paddingLeft: 5,
            transform: 'translateX(12px)',
            color: theme.palette.common.white,
            '& + $track': {
                opacity: 1,
                backgroundColor: theme.palette.extraColors.switchColor.main,
                borderColor: theme.palette.extraColors.switchColor.main,
            },
        },
    },
    thumb: {
        width: 16,
        height: 15,
        boxShadow: 'none',
    },
    track: {
        border: `1px solid ${theme.palette.grey[500]}`,
        borderRadius: 19 / 2,
        opacity: 1,
        backgroundColor: theme.palette.grey[500],
    },
    checked: {},
}))(Switch);

const SwitchButton = props => {
    const {
        handleOnChange,
        name,
        value,
        falseField,
        trueField,
        detailedView = false,
    } = props;

    return (
        <FormGroup>
            <Typography component="div">

                {!detailedView && (
                    <Grid component="label" container alignItems="center" spacing={1}>
                        <Grid item>
                            <CustomSwitch checked={value} onChange={handleOnChange} name={name} />
                        </Grid>
                    </Grid>
                )}
                {detailedView && (
                    <Grid component="label" container alignItems="center" spacing={1}>
                        <Grid item>
                            <CustomDetailedViewSwitch checked={value} onChange={handleOnChange} name={name} />
                        </Grid>
                    </Grid>
                )}
            </Typography>
        </FormGroup >
    );
}

export default SwitchButton;