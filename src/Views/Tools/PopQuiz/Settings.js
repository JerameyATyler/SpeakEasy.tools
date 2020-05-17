import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Theme} from "../../../utils";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
    root: {},
    column: {},
    pad: {}
}));

export default () => {
    const classes = useStyles(Theme);
    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.column)}>
                <div className={clsx(classes.pad)}>
                </div>
            </div>
        </div>
    )
}