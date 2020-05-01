import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {IconButton} from "@material-ui/core";
import {Close} from "@material-ui/icons";
import {Theme} from "../../utils";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
    root: {
        overflow: 'hidden',
        backgroundColor: theme.palette.primary.main,
    },
    top: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    bottom: {
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    open: {
        borderRadius: 10,
    },
    close: {
        width: 30,
        height: 30,
    },
    darkTop: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.secondary.main,
    },
    lightTop: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
        borderBottomRightRadius: 10,
    },
    darkBottom: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
        borderTopLeftRadius: 10,
    },
    lightBottom: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.secondary.main,
    },
    button: {
        padding: theme.spacing(0),
        margin: theme.spacing(0)
    }
}));
/*
 * Title and body should both be functions that return a React component. This way you can render
 * more complex components inside of the card than just text. darkMode toggles the background of the card
 */
export default ({title, body, darkMode = false, stayOpen = false, defaultOpen = false}) => {
    const classes = useStyles(Theme);

    const [open, setOpen] = useState(false);
    useEffect(() => {
        if (stayOpen) setOpen(true);
        if (defaultOpen) setOpen(true);
    }, [stayOpen, defaultOpen]);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        if (stayOpen) return;
        setOpen(false);
    };

    return (
        <div
            className={clsx(classes.root, {
                [classes.open]: open,
                [classes.close]: !open,
            })}
        >
            <div
                className={clsx(classes.top, {
                    [classes.darkTop]: darkMode && open,
                    [classes.lightTop]: !darkMode && open,
                    [classes.close]: !open,
                })}
            >
                {!stayOpen && (
                    <IconButton
                        onClick={open ? handleClose : handleOpen}
                        className={clsx(classes.button)}
                    >
                        <Close/>
                    </IconButton>
                )}
                {open && title()}
            </div>
            {open && (
                <div className={clsx(classes.bottom, {
                    [classes.darkBottom]: darkMode && open,
                    [classes.lightBottom]: !darkMode && open
                })}>
                    {body()}
                </div>
            )}
        </div>
    )
}