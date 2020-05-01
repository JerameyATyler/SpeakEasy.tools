import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {ListItemIcon, ListItemText} from "@material-ui/core";
import {Theme} from "../../utils";
import clsx from "clsx";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import {useAuth0} from "../../react-auth0-spa";
import {
    AccountCircle,
    Apps,
    Casino,
    ExitToApp,
    ListAlt,
    MenuBook,
    ShowChart,
    SpeakerNotes,
    SupervisorAccount,
    Sync,
    ViewComfy,
    Visibility
} from "@material-ui/icons";
import Avatar from "@material-ui/core/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import {NavLink} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: '100%',
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
    },
    row: {
        display: 'flex',
        flexFlow: 'row noWrap'
    },
    column: {
        display: 'flex',
        flexFlow: 'column noWrap',
    },
    pad: {
        padding: theme.spacing(1),
    }
}));

export default ({userRole}) => {
    const classes = useStyles(Theme);

    const [userOpen, setUserOpen] = useState(false);
    const [gamesOpen, setGamesOpen] = useState(false);

    const {user, isAuthenticated, loginWithRedirect, logout} = useAuth0();

    const toggleUser = () => setUserOpen(prevState => !prevState);
    const toggleGames = () => setGamesOpen(prevState => !prevState);

    return (
        <div className={clsx(classes.root)}>
            <List component='nav' aria-label='user tools'>
                {isAuthenticated && user && (
                    <>
                        <ListItem
                            button
                            onClick={toggleUser}
                        >
                            <ListItemAvatar>
                                <Avatar>
                                    <img src={user.picture} alt='User avatar'/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary='User Menu'/>
                        </ListItem>
                        {userOpen && (
                            <ListItem style={{backgroundColor: Theme.palette.secondary.light}}>
                                <List>
                                    <NavLink to='/profile'
                                             activeStyle={{
                                                 fontWeight: 'bold',
                                                 color: Theme.palette.secondary.contrastText
                                             }}
                                             style={{
                                                 color: Theme.palette.secondary.contrastText
                                             }}>
                                        <ListItem button>
                                            <ListItemAvatar>
                                                <Avatar style={{backgroundColor: Theme.palette.secondary.light}}>
                                                    <AccountCircle
                                                        style={{color: Theme.palette.secondary.contrastText}}/>
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary='Profile'/>
                                        </ListItem>
                                    </NavLink>
                                    <ListItem button onClick={logout}>
                                        <ListItemAvatar>
                                            <Avatar style={{backgroundColor: Theme.palette.secondary.light}}>
                                                <ExitToApp style={{color: Theme.palette.secondary.contrastText}}/>
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary='Sign Out'/>
                                    </ListItem>
                                    {userRole && userRole === 'admin' && (
                                        <NavLink
                                            to='/instructor'
                                            activeStyle={{
                                                fontWeight: 'bold',
                                                color: Theme.palette.secondary.contrastText
                                            }}
                                            style={{
                                                color: Theme.palette.secondary.contrastText
                                            }}
                                        >
                                            <ListItem style={{borderTop: 'thin solid black'}} button>
                                                <ListItemAvatar>
                                                    <Avatar style={{backgroundColor: Theme.palette.secondary.light}}>
                                                        <SupervisorAccount
                                                            style={{color: Theme.palette.secondary.contrastText}}/>
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary='Instructor'/>
                                            </ListItem>
                                        </NavLink>
                                    )}
                                </List>
                            </ListItem>
                        )}
                    </>
                )}
                {!(isAuthenticated && user) && (
                    <>
                        <ListItem
                            button
                            onClick={loginWithRedirect}
                        >
                            <ListItemAvatar>
                                <Avatar style={{backgroundColor: Theme.palette.secondary.main}}>
                                    <AccountCircle style={{color: Theme.palette.secondary.contrastText}}/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary='Sign In'/>
                        </ListItem>
                    </>

                )}
                <ListItem
                    button
                    onClick={toggleGames}
                >
                    <ListItemIcon>
                        <Casino style={{color: Theme.palette.secondary.contrastText}}/>
                    </ListItemIcon>
                    <ListItemText primary='Tools and Games'/>
                </ListItem>
                {gamesOpen && (
                    <ListItem style={{backgroundColor: Theme.palette.secondary.light}}>
                        <List>
                            <NavLink to='/2048'
                                     activeStyle={{
                                         fontWeight: 'bold',
                                         color: Theme.palette.secondary.contrastText
                                     }}
                                     style={{
                                         color: Theme.palette.secondary.contrastText
                                     }}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar style={{backgroundColor: Theme.palette.secondary.light}}>
                                            <Apps style={{color: Theme.palette.secondary.contrastText}}/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary='2048'/>
                                </ListItem>
                            </NavLink>
                            <NavLink to='/dictionary'
                                     activeStyle={{
                                         fontWeight: 'bold',
                                         color: Theme.palette.secondary.contrastText
                                     }}
                                     style={{
                                         color: Theme.palette.secondary.contrastText
                                     }}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar style={{backgroundColor: Theme.palette.secondary.light}}>
                                            <MenuBook style={{color: Theme.palette.secondary.contrastText}}/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary='Dictionary'/>
                                </ListItem>
                            </NavLink>
                            <NavLink to='/eyespy'
                                     activeStyle={{
                                         fontWeight: 'bold',
                                         color: Theme.palette.secondary.contrastText
                                     }}
                                     style={{
                                         color: Theme.palette.secondary.contrastText
                                     }}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar style={{backgroundColor: Theme.palette.secondary.light}}>
                                            <Visibility style={{color: Theme.palette.secondary.contrastText}}/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary='Eye-Spy'/>
                                </ListItem>
                            </NavLink>
                            <NavLink to='/memory'
                                     activeStyle={{
                                         fontWeight: 'bold',
                                         color: Theme.palette.secondary.contrastText
                                     }}
                                     style={{
                                         color: Theme.palette.secondary.contrastText
                                     }}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar style={{backgroundColor: Theme.palette.secondary.light}}>
                                            <ViewComfy style={{color: Theme.palette.secondary.contrastText}}/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary='Memory'/>
                                </ListItem>
                            </NavLink>
                            <NavLink to='/popquiz'
                                     activeStyle={{
                                         fontWeight: 'bold',
                                         color: Theme.palette.secondary.contrastText
                                     }}
                                     style={{
                                         color: Theme.palette.secondary.contrastText
                                     }}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar style={{backgroundColor: Theme.palette.secondary.light}}>
                                            <SpeakerNotes style={{color: Theme.palette.secondary.contrastText}}/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary='Pop Quiz'/>
                                </ListItem>
                            </NavLink>
                            <NavLink to='/timeseries'
                                     activeStyle={{
                                         fontWeight: 'bold',
                                         color: Theme.palette.secondary.contrastText
                                     }}
                                     style={{
                                         color: Theme.palette.secondary.contrastText
                                     }}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar style={{backgroundColor: Theme.palette.secondary.light}}>
                                            <ListAlt style={{color: Theme.palette.secondary.contrastText}}/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary='Time Series Analyzer'/>
                                </ListItem>
                            </NavLink>
                            <NavLink to='/tonetrainer'
                                     activeStyle={{
                                         fontWeight: 'bold',
                                         color: Theme.palette.secondary.contrastText
                                     }}
                                     style={{
                                         color: Theme.palette.secondary.contrastText
                                     }}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar style={{backgroundColor: Theme.palette.secondary.light}}>
                                            <ShowChart style={{color: Theme.palette.secondary.contrastText}}/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary='Tone Trainer'/>
                                </ListItem>
                            </NavLink>
                            <NavLink to='/uno'
                                     activeStyle={{
                                         fontWeight: 'bold',
                                         color: Theme.palette.secondary.contrastText
                                     }}
                                     style={{
                                         color: Theme.palette.secondary.contrastText
                                     }}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar style={{backgroundColor: Theme.palette.secondary.light}}>
                                            <Sync style={{color: Theme.palette.secondary.contrastText}}/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary='Uno'/>
                                </ListItem>
                            </NavLink>
                        </List>
                    </ListItem>
                )}
            </List>
        </div>
    )
}