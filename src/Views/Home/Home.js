import React from "react";
import clsx from "clsx";
import {makeStyles} from "@material-ui/core";
import {Theme} from "../../Components/Theme";
import Typography from "@material-ui/core/Typography";
import {useAuth0} from "../../react-auth0-spa";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles(theme => ({
    root: {}
}));

export default () => {
    const classes = useStyles(Theme);
    const {user, isAuthenticated} = useAuth0();

    return (
        <div className={clsx(classes.root)}>
            {!isAuthenticated &&
            <>
                <Typography
                    color='primary'
                    variant='h4'
                >
                    Welcome to SpeakEasy.tools
                </Typography>
                <Divider/>
                <Typography
                    color='primary'
                    variant='h6'>
                        Click on the mask to sign in/register or click on the
                    icons to the left explore SpeakEasy anonymously.
                </Typography>
            </>
            }
            {isAuthenticated && user && (
                <>
                <Typography
                    color='primary'
                    variant='h4'
                >
                    Welcome back {user.given_name}
                </Typography>
                    <Divider/>
                <Typography
                color='primary'
                variant='h6'>
                Click on your profile picture to sign out or click on the
                icons to the left explore SpeakEasy.
                </Typography>
                </>
            )}
        </div>
    )
}