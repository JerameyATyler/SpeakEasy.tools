import React from "react";
import {makeStyles, Typography} from "@material-ui/core";
import clsx from "clsx";
import {Theme} from "../../Components/Theme";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    pad: {
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
    }
}));

export default () => {
    const classes = useStyles(Theme);
    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.pad)}>
                <Typography
                    variant='subtitle1'
                    color='secondary'
                    tabIndex='0'
                >
                    Practice on randomly generated multiple choice questions.
                </Typography>
            </div>
        </div>
    )
};