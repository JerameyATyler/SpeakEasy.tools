import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Theme} from "../../../utils";
import clsx from "clsx";
import {Card} from "../../../Components/Card";
import Typography from "@material-ui/core/Typography";
import {IconButton} from "@material-ui/core";
import {MoreHoriz, ArrowForward} from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: '100%',
    },
    content: {
        width: '100%',
        display: 'flex',
        flexFlow: 'column noWrap'
    },
    column: {
        flex: '1 1 100%',
        display: 'flex',
        flexFlow: 'column noWrap',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    pad: {
        padding: theme.spacing(1),
    },
}));

export default ({poi}) => {
    const {
        type,
        title,
        body,
    } = poi

    const classes = useStyles(Theme);

    const getTitle = () => {
        return (
            title &&
            <div className={clsx(classes.content)}>
                <div className={clsx(classes.column)}>
                    <div className={clsx(classes.pad)}>
                        <Typography variant='h6'>
                            {title}
                        </Typography>
                    </div>
                </div>
            </div>
        )
    }

    const getBody = () => {
        return (
            body &&
            <div className={clsx(classes.content)}>
                <div className={clsx(classes.column)}>
                    <div className={clsx(classes.pad)}>
                        <Typography variant='h6'>
                            {body}
                        </Typography>
                    </div>
                </div>
            </div>
        )
    };

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.pad)}>
                <Card
                    darkMode={true}
                    // stayOpen={type === "narrate"}
                    title={getTitle}
                    body={getBody}
                />
            </div>
        </div>
    )
}
