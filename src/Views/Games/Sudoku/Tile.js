import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Theme} from "../../../utils";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
    root: {
        width: 30,
    },
    focused: {
        backgroundColor: theme.palette.secondary.light
    },
}));

export default ({val, onClick}) => {
    const classes = useStyles(Theme);

    return (
        <div className={clsx(classes.root)} onClick={onClick}>
            <Typography
                variant='h4'
            >
                {val}
            </Typography>
        </div>
    );
};