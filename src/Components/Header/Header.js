import React, {useState} from "react";
import {useAuth0} from "../../react-auth0-spa";
import {AppBar, Avatar, ListItemIcon, ListItemText, makeStyles, Menu, Toolbar} from "@material-ui/core";
import clsx from "clsx";
import {faAddressCard, faMask, faSignOutAlt, faUserShield} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Theme} from "../Theme";
import {HomeButton} from "../HomeButton";
import MenuItem from "@material-ui/core/MenuItem";
import {KeyboardArrowLeft} from "@material-ui/icons";
import Divider from "@material-ui/core/Divider";
import {NavLink} from "react-router-dom";
import {Breadcrumbs} from "../Breadcrumbs";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.primary.main,
        zIndex: theme.zIndex.drawer + 1,
    },
    menu: {

    },
    menuItem: {
        color: theme.palette.secondary.contrastText,
    },
    avatar: {
        width: '60px',
        height: '60px'
    },
    maskIcon: {
        color: theme.palette.secondary.contrastText,
        backgroundColor: theme.palette.secondary.main,
    }
}));

const Header = (props) => {
    const classes = useStyles(Theme);
    const userRole = props.userRole;
    const [anchorE1, setAnchorE1] = useState(null);
    const handleOpen = event => setAnchorE1(event.currentTarget);
    const handleClose = () => setAnchorE1(null);

    const {user, isAuthenticated, loginWithRedirect, logout} = useAuth0();
    return (
        <div className={clsx(classes.root)}>
            <AppBar>
                <Toolbar>
                    {isAuthenticated && user ? (
                        <>
                            <Avatar
                                onClick={handleOpen}
                            >
                                <img
                                    className={clsx(classes.avatar)}
                                    src={user.picture}
                                    alt='User Profile'
                                />
                            </Avatar>
                            <Menu
                                id='user-menu'
                                anchorEl={anchorE1}
                                keepMounted
                                open={Boolean(anchorE1)}
                                onClose={handleClose}
                            >
                                <MenuItem
                                    onClick={handleClose}
                                    className={clsx(classes.menuItem)}
                                >
                                    <ListItemIcon
                                        className={clsx(classes.menuItem)}>
                                        <KeyboardArrowLeft/>
                                    </ListItemIcon>
                                    <ListItemText primary='Back'/>
                                </MenuItem>
                                <Divider/>
                                <NavLink to='/profile'>
                                    <MenuItem
                                        className={clsx(classes.menuItem)}>
                                        <ListItemIcon
                                            className={clsx(classes.menuItem)}>
                                            <FontAwesomeIcon icon={faAddressCard}/>
                                        </ListItemIcon>
                                        <ListItemText primary='Profile'/>
                                    </MenuItem>
                                </NavLink>
                                <Divider/>
                                {userRole === 'admin' &&
                                <NavLink to='/admin'>
                                    <MenuItem
                                        className={clsx(classes.menuItem)}>
                                        <ListItemIcon
                                            className={clsx(classes.menuItem)}>
                                            <FontAwesomeIcon icon={faUserShield}/>
                                        </ListItemIcon>
                                        <ListItemText primary='Admin'/>
                                    </MenuItem>
                                </NavLink>
                                }
                                <Divider/>
                                <MenuItem
                                    onClick={logout}
                                    className={clsx(classes.menuItem)}
                                >
                                    <ListItemIcon
                                        className={clsx(classes.menuItem)}>
                                        <FontAwesomeIcon icon={faSignOutAlt}/>
                                    </ListItemIcon>
                                    <ListItemText primary='Sign out'/>
                                </MenuItem>
                            </Menu>
                        </>
                    ) : (
                        <IconButton
                            className={clsx(classes.menuItem)}
                            onClick={() => loginWithRedirect({})}
                        >
                            <FontAwesomeIcon icon={faMask}/>
                        </IconButton>
                    )}
                    <HomeButton/>
                    <Breadcrumbs/>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Header;