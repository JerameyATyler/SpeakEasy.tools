import React from 'react';
import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {makeStyles} from "@material-ui/core/styles";
import Theme from "../Theme/Theme";
import {Typography} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    configBar: {
        zIndex: theme.zIndex.drawer + 1,
        flexDirection: 'row',
    },
    optionsBar: {
        display: 'flex',
        flexDirection: 'row',
        padding: theme.spacing(1),
    },
    appbar: {
        backgroundColor: theme.palette.accent.main,
    }
}));

export const ConfigBar = (props) => {
    const classes = useStyles(Theme);

    return (
        <div className={clsx(classes.configBar)}>
            <AppBar position="sticky" className={clsx(classes.appbar)}>
                <Toolbar>
                    <div>
                        <Typography
                            variant='h4'
                            >
                            Options
                        </Typography>
                    </div>
                    <div className={clsx((classes.optionsBar))}>
                        {props.children}
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
};
