import React from "react";
import { useAuth0 } from "../../react-auth0-spa";
import {makeStyles} from "@material-ui/core";
import clsx from "clsx";
import {Theme} from "../../Components/Theme";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(1),
    },
    image: {
        width: 300,
        height: 300,
    }
}));

const Profile = () => {
    const classes = useStyles(Theme);
    const { loading, user } = useAuth0();

    if (loading || !user) {
        return <div>Loading...</div>;
    }

    return (
        <div className={clsx(classes.root)}>
            <img className={clsx(classes.image)} src={user.picture} alt="Profile" />
            <div className={clsx(classes.content)}>
                <Typography
                    variant='h4'
                    color='primary'>
                    {user.name}
                </Typography>
                <Divider/>
                <Typography
                    variant='subtitle1'
                    color='primary'>
                    {user.email}
                </Typography>
            </div>
        </div>
    );
};

export default Profile;