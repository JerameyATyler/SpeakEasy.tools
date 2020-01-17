import {AppBar, Toolbar} from "@material-ui/core";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTools} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import {Theme} from "../Theme";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({
    footer: {
        top: 'auto',
        bottom: 0,
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: 'yellow',
        color: 'black',
    },
}));

export default () => {
    const classes = useStyles(Theme);
    return (
        <AppBar
            position='fixed'
            className={clsx(classes.footer)}
        >
            <Toolbar>
                <FontAwesomeIcon icon={faTools}/>
                &nbsp;
                <Typography
                    variant='subtitle1'
                >
                    Please excuse the mess while we're working. You can report bugs at
                    &nbsp;
                    <a
                        href='https://github.com/JerameyATyler/SpeakEasy.tools/issues/new/'
                        rel='noopener'
                    >
                        this link.
                    </a>
                </Typography>
                &nbsp;
                <FontAwesomeIcon icon={faTools}/>
            </Toolbar>
        </AppBar>
    )
}