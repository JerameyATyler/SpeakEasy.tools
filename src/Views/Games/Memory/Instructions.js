import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Theme} from "../../../utils";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
    root: {

    },
    column: {

    },
    pad: {

    }
}));

export default () => {
    const classes = useStyles(Theme);

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.column)}>
                <div className={clsx(classes.pad)}>
                    <Typography>asdfaf</Typography>
                </div>
                <div className={clsx(classes.pad)}>
                    <Typography>awesrf</Typography>
                </div>
            </div>
        </div>
    )
}