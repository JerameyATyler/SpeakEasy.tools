import React from 'react';
import {makeStyles} from "@material-ui/core";
import {Theme} from "../Theme";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import {NativePlayer} from "../NativePlayer";
import {CartesianGrid, Line, LineChart, XAxis, YAxis} from "recharts";

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(3),
        width: 700,
        height: 400,
        backgroundColor: theme.palette.primary.main,
    },
    row: {
        display: 'flex',
        flexDirection: 'column',
    }
}));

export default ({native}) => {
    const classes = useStyles(Theme);

    return (
        <div
            className={clsx(classes.root)}
        >
            <NativePlayer
                native={native}
            />

        </div>
    )
}