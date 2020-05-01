import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Theme} from "../../utils";
import clsx from "clsx";
import {ViewWrapper} from "../../Components/ViewWrapper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import {useAuth0} from "../../react-auth0-spa";

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
    },
    content: {
        padding: theme.spacing(1),
        flex: '1 1 100%',
        height: '100%',
        display: 'flex',
        flexFlow: 'column noWrap',
    },
    row: {
        width: '100%',
        display: 'flex',
    },
    pad: {
        padding: theme.spacing(1),
    },
    input: {
        color: theme.palette.secondary.contrastText
    }
}));

export default () => {
    document.title = 'Home';
    const classes = useStyles(Theme);

    const {user, isAuthenticated} = useAuth0();

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.row)}>
                <ViewWrapper
                />
            </div>
            <div className={clsx(classes.row)}>
                <div className={clsx(classes.pad)}>
                    <Typography
                        style={{color: Theme.palette.primary.contrastText}}
                        variant='h4'
                    >
                        Welcome to SpeakEasy.tools!
                    </Typography>
                    <Divider/>
                </div>
            </div>
            <div className={clsx(classes.row)}>
                <div className={clsx(classes.pad)}>
                    {user && isAuthenticated && (
                        <Typography
                            style={{color: Theme.palette.primary.contrastText}}
                        >
                            Open the user menu to go to your profile or sign out. Open the 'Tools and Games' menu to go play around or explore.
                        </Typography>
                    )}
                    {!(user && isAuthenticated) && (
                        <Typography
                            style={{color: Theme.palette.primary.contrastText}}
                        >
                            Sign in using the 'Sign In' button or open the 'Tools and Games' menu to use our tools anonymously.
                        </Typography>
                    )}
                </div>
            </div>
        </div>
    )
}