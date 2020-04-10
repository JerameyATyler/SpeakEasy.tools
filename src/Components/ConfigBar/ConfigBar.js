import React from 'react';
import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {makeStyles} from "@material-ui/core/styles";
import Theme from "../Theme/Theme";
import {Typography} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        zIndex: theme.zIndex.drawer + 1,
        flexDirection: 'row',

    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
    },
    column: {},
    grow: {
        width: '100%',
        flexGrow: 1,
    },
    pad: {
        padding: theme.spacing(1),
        margin: theme.spacing(1),
    },
    appbar: {
        backgroundColor: theme.palette.accent.main,
    }
}));

export const ConfigBar = (props) => {
    const classes = useStyles(Theme);

    return (
        <div className={clsx(classes.root)}>
            <AppBar position="sticky" className={clsx(classes.appbar)}>
                <Toolbar>
                    <div className={clsx(classes.pad)}>
                        <Typography
                            variant='h4'
                        >
                            Options
                        </Typography>
                    </div>
                    <div className={clsx(classes.grow)}>
                        <div className={clsx((classes.optionsBar))}>
                            {props.children}
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
};
