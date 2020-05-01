import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Theme} from "../../utils";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import {useStopwatch} from "react-timer-hook";

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
        width: '100%',
    },
    row: {
        display: 'flex',
        flex: 'row noWrap',
        justifyContent: 'space-around'
    },
    pad: {
        margin: theme.spacing(1),
        borderRadius: 10,
    }
}));

export default () => {
    const classes = useStyles(Theme);

    const {
        seconds,
        minutes,
        hours,
        start,
    } = useStopwatch({autoStart: false});

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.row)}>
                <div className={clsx(classes.pad)}>
                    <Typography
                        variant='h4'
                        style={{color: Theme.palette.secondary.contrastText}}
                    >
                        Time:
                    </Typography>
                </div>
            </div>
        </div>
    );
};