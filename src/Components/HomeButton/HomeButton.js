import {NavLink} from 'react-router-dom';
import LogoIcon from "@material-ui/icons/Translate";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Theme} from "../Theme";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(1),
    }
}));

export const HomeButton = () => {
    const classes = useStyles(Theme);

    return (
        <NavLink to='/home'>
            <div className={clsx(classes.root)}>
                <LogoIcon fontSize='large' color='secondary'/>
                <Typography
                    variant='h4'
                    color='secondary'
                >
                    SpeakEasy.tools
                </Typography>
            </div>
        </NavLink>
    )
};