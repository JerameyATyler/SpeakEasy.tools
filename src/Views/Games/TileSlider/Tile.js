import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Theme} from "../../../utils";
import clsx from "clsx";
import {Card} from "../../../Components/Card";
import Typography from "@material-ui/core/Typography";

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
        backgroundColor: theme.palette.secondary.light,
        border: `1px solid ${theme.palette.secondary.contrastText}`
    },
}));

export default ({value}) => {
    const classes = useStyles(Theme);

    const getText = tile => {
        return tile;
    };

    const getBody = () => {
        return (
            <div className={clsx(classes.content, classes[value])}>
                <div className={clsx(classes.column)}>
                    <div>
                        <Typography variant='h4'>
                            {getText(value)}
                        </Typography>
                    </div>
                </div>
            </div>
        )
    };

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.pad)}>
                {getBody()}
            </div>
        </div>
    )
}