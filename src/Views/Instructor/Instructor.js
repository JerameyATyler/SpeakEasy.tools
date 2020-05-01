import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Theme} from "../../utils";
import clsx from "clsx";
import {ViewWrapper} from "../../Components/ViewWrapper";
import CoursesPanel from "./CoursesPanel";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: '100%',
        overflow: 'auto'
    },
    row: {
        width: '100%',
        display: 'flex',
        alignItems: 'center'
    },
    pad: {
        padding: theme.spacing(1),
    },
}));

export default () => {
    document.title = 'Instructor';
    const classes = useStyles(Theme);

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.row)}>
                <ViewWrapper
                />
            </div>
            <div className={clsx(classes.row)}>
                <div className={clsx(classes.pad)} style={{width: '90%'}}>
                    <CoursesPanel/>
                </div>
            </div>
        </div>
    );
};