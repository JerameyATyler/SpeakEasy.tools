import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Theme} from "../../../utils";
import clsx from "clsx";
import {ViewWrapper} from "../../../Components/ViewWrapper";

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
        display: 'flex',
        flexFlow: 'row wrap',
    },
    row: {
        flex: '1 1 100%'
    },
    column: {},
    content: {},
    pad: {
        margin: theme.spacing(1),
        flex: '1 1 100px',
    },
}));

export default () => {
    document.title = "Typing of the Dead";
    const classes = useStyles(Theme);
    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.row)}>
                <ViewWrapper
                />
            </div>
        </div>
    )
}