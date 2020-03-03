import React from 'react';
import clsx from "clsx";

import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ToneTrainerIcon from '@material-ui/icons/ShowChart';
import MemoryIcon from '@material-ui/icons/ViewComfy';
import FlashCardIcon from '@material-ui/icons/CreditCard';
import PopQuizIcon from '@material-ui/icons/SpeakerNotes';
import T48Icon from '@material-ui/icons/GridOn';
import UnoIcon from '@material-ui/icons/FlipCameraAndroid';
import {Theme} from "../Theme";
import {NavLink} from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    drawerPaper: {
        width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    icon: {
        color: theme.palette.secondary.contrastText,
    },
    activeLink: {
        color: 'green',
    }
}));

export default (props) => {
    const classes = useStyles(Theme);
    const open = props.open;
    const setOpen = props.setOpen;

    return (
        <Drawer
            className={clsx(classes.drawer, {
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
            })}
            variant="permanent"
            classes={{
                paper: clsx({
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                }),
            }}
        >
            <div className={classes.toolbar}/>
            <List>
                <ListItem button key={'menu'} onClick={() => setOpen(!open)}>
                    <ListItemIcon>
                        {
                            open
                                ?
                                <ChevronLeftIcon className={clsx(classes.icon)}/>

                                :
                                <MenuIcon className={clsx(classes.icon)}/>
                        }
                    </ListItemIcon>
                    <ListItemText primary='Game Menu' className={clsx(classes.icon)}/>
                </ListItem>
                <Divider/>
                <NavLink to='/tonetrainer'
                         activeClassName={clsx(classes.activeLink)}
                >
                    <ListItem button key={'toneTrainer'}>
                        <ListItemIcon><ToneTrainerIcon className={clsx(classes.icon)}/></ListItemIcon>
                        <ListItemText primary='Tone Trainer' className={clsx(classes.icon)}/>
                    </ListItem>
                </NavLink>
                <NavLink to='/memory'
                         activeClassName={clsx(classes.activeLink)}
                >
                    <ListItem button key={'memory'}>
                        <ListItemIcon><MemoryIcon className={clsx(classes.icon)}/></ListItemIcon>
                        <ListItemText primary='Memory' className={clsx(classes.icon)}/>
                    </ListItem>
                </NavLink>
                <NavLink to='/flashcards'
                         activeClassName={clsx(classes.activeLink)}
                >
                    <ListItem button key={'flashCards'}>
                        <ListItemIcon><FlashCardIcon className={clsx(classes.icon)}/></ListItemIcon>
                        <ListItemText primary='Flash Cards' className={clsx(classes.icon)}/>
                    </ListItem>
                </NavLink>
                <NavLink to='/popquiz'
                         activeClassName={clsx(classes.activeLink)}
                >
                    <ListItem button key={'popQuiz'}>
                        <ListItemIcon><PopQuizIcon className={clsx(classes.icon)}/></ListItemIcon>
                        <ListItemText primary='Pop Quiz' className={clsx(classes.icon)}/>
                    </ListItem>
                </NavLink>
                <NavLink to='/2048'
                         activeClassName={clsx(classes.activeLink)}
                >
                    <ListItem button key={'2048'}>
                        <ListItemIcon><T48Icon className={clsx(classes.icon)}/></ListItemIcon>
                        <ListItemText primary='2048' className={clsx(classes.icon)}/>
                    </ListItem>
                </NavLink>
                <NavLink to='/uno'
                         activeClassName={clsx(classes.activeLink)}
                >
                    <ListItem button key={'Uno'}>
                        <ListItemIcon><UnoIcon className={clsx(classes.icon)}/></ListItemIcon>
                        <ListItemText primary='Uno' className={clsx(classes.icon)}/>
                    </ListItem>
                </NavLink>
                <Divider/>
            </List>
        </Drawer>
    );
}