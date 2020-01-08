import React, {useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Theme from "../Theme/Theme";
import clsx from "clsx";
import {Typography} from "@material-ui/core";
import {ChevronLeft, ChevronRight} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";

const width = '300px';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        backgroundColor: theme.palette.accent.light,
        color: theme.palette.primary.contrastText,
        height: '100%',
        width: `${width}`,
        overflow: 'hidden',
    },
    open: {
        width: width,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    closed: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: '62px',
    },
    icon: {
        width: 50,
        height: 50,
        marginRight: 'auto',
        padding: theme.spacing(1),
        left: 12,
        color: theme.palette.primary.contrastText,
    },
    instructions: {
        flexGrow: 1,
        height: 50,
        padding: theme.spacing(1),
        marginLeft: 20,
    },
    spacer: {
        height: '100%',
        marginLeft: 'auto',
        width: 50,
        padding: theme.spacing(1),
        left: 12,
    }
}));

export default (props) => {
    const classes = useStyles(Theme);
    const [open, setOpen] = useState(true);
    return (
        <div className={clsx(classes.root, {
            [classes.open]: open,
            [classes.closed]: !open,
        })}>
            <div className={clsx(classes.spacer)}>
                <IconButton
                    className={clsx(classes.icon)}
                    onClick={() => setOpen(!open)}
                    edge='start'
                >
                    {open ? <ChevronLeft/> : <ChevronRight/>}
                </IconButton>
            </div>
            <Divider/>
            <div className={clsx(classes.instructions)}>
                <Typography
                    variant='h4'
                    color='secondary'
                    className={clsx(classes.title)}
                >
                    Instructions
                </Typography>
                <Divider/>
                {props.children}
            </div>
        </div>
    )
};