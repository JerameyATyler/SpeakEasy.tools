import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Theme} from "../../../utils";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
        display: 'flex',
        flexFlow: 'row wrap',
        backgroundColor: theme.palette.primary.main,
        borderRadius: 10,
    },
    column: {
        width: '100%',
        flex: '1 1 100%',
        display: 'flex',
        flexFlow: 'column noWrap',
    },
    pad: {
        padding: theme.spacing(1),
        flex: '1 1 18%',

    },
    top: {
        color: theme.palette.secondary.contrastText,
        backgroundColor: theme.palette.secondary.main,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
        borderTop: 'double',
        borderRight: 'double',
    },
    bottom: {
        color: theme.palette.secondary.contrastText,
        backgroundColor: theme.palette.secondary.main,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottom: 'double',
        borderLeft: 'double',
    },
    middle: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
        borderLeft: 'double',
        borderRight: 'double'
    },
    flipped: {
        backgroundColor: theme.palette.secondary.contrastText,
        color: theme.palette.secondary.main
    }
}));

export default ({topText, middleText, bottomText, flipped}) => {
    const classes = useStyles(Theme);

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.column)}>
                <div className={clsx(classes.pad, classes.top, {[classes.flipped]: flipped})}>
                    <Typography
                        align='center'
                        variant='h6'
                    >
                        {flipped ? topText : ''}
                    </Typography>
                </div>
                <div className={clsx(classes.pad, classes.middle)}>
                    <Typography
                        align='center'
                        variant='h6'
                    >
                        {flipped ? middleText : '?'}
                    </Typography>
                </div>
                <div className={clsx(classes.pad, classes.bottom, {[classes.flipped]:flipped})}>
                    <Typography
                        align='center'
                        variant='h6'
                    >
                        {flipped ? bottomText : '' }
                    </Typography>
                </div>
            </div>
        </div>
    )
}