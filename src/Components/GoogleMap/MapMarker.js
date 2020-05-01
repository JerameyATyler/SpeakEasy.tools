import React from "react";
import clsx from "clsx";
import {makeStyles} from "@material-ui/core/styles";
import {Theme} from "../../utils";

const K_WIDTH = 20;
const K_HEIGHT = 20;

const useStyles = makeStyles(theme => ({
    root: {
        position: 'absolute',
        width: K_WIDTH,
        height: K_HEIGHT,
        left: -K_WIDTH / 2,
        top: -K_HEIGHT / 2,

        border: `thick solid ${theme.palette.secondary.main}`,
        borderRadius: K_HEIGHT,
        backgroundColor: theme.palette.primary.main,
        padding: theme.spacing(1)
    }
}));

export default () => {
    const classes = useStyles(Theme);

    return (
        <div className={clsx(classes.root)}/>
    )
}