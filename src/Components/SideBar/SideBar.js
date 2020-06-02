import React, {useState, useEffect} from 'react';
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
    Build,
    Cached,
    Casino,
    Contacts,
    ExitToApp,
    GridOn,
    GridOff,
    Help,
    HelpOutline,
    Info,
    Keyboard,
    ListAlt,
    MenuBook,
    Message,
    Notes,
    QuestionAnswer,
    RecentActors,
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
    const [infoOpen, setInfoOpen] = useState(false);
    const [toolsOpen, setToolsOpen] = useState(false);
    const [sideBarOpen, setSideBarOpen] = useState(false)

    const {user, isAuthenticated, loginWithRedirect, logout} = useAuth0();

    const toggleUser = () => setUserOpen(prevState => !prevState);
    const toggleGames = () => setGamesOpen(prevState => !prevState);
    const toggleInfo = () => setInfoOpen(prevState => !prevState);
    const toggleTools = () => setToolsOpen(prevState => !prevState);

    // to minimize the sidebar a bit out of the playing area when not in use
    useEffect(() => {
        return setSideBarOpen(userOpen || gamesOpen || infoOpen 
                                || toolsOpen || !isAuthenticated)
    }, [userOpen, gamesOpen, infoOpen, toolsOpen])

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
                                    <img src={user.picture} style={{ maxWidth: "100%" }} alt='User avatar'/>
                                </Avatar>
                            </ListItemAvatar>
                            {sideBarOpen && <ListItemText primary='User Menu'/>}
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
                                                {sideBarOpen && <ListItemText primary='Instructor'/>}
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
                    {sideBarOpen && <ListItemText primary='Games'/>}
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
                            <NavLink to='/jeopardy'
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
                                            <QuestionAnswer style={{color: Theme.palette.secondary.contrastText}}/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary='Jeopardy'/>
                                </ListItem>
                            </NavLink>
                            <NavLink to='/kakuro'
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
                                            <GridOn style={{color: Theme.palette.secondary.contrastText}}/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary='Kakuro'/>
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
                            <NavLink to='/simonsays'
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
                                            <Message style={{color: Theme.palette.secondary.contrastText}}/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary='Simon Says'/>
                                </ListItem>
                            </NavLink>
                            <NavLink to='/sudoku'
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
                                            <GridOn style={{color: Theme.palette.secondary.contrastText}}/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary='Sudoku'/>
                                </ListItem>
                            </NavLink>
                            <NavLink to='/tileslider'
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
                                            <GridOff style={{color: Theme.palette.secondary.contrastText}}/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary='Tile Slider'/>
                                </ListItem>
                            </NavLink>
                            <NavLink to='/totd'
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
                                            <Keyboard style={{color: Theme.palette.secondary.contrastText}}/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary='Typing of the Dead'/>
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
                            <NavLink to='/wof'
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
                                            <Cached style={{color: Theme.palette.secondary.contrastText}}/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary='Wheel of Fortune'/>
                                </ListItem>
                            </NavLink>
                        </List>
                    </ListItem>
                )}
                <ListItem
                    button
                    onClick={toggleTools}
                >
                    <ListItemIcon>
                        <Build style={{color: Theme.palette.secondary.contrastText}}/>
                    </ListItemIcon>
                    {sideBarOpen && <ListItemText primary='Tools'/>}
                </ListItem>
                {toolsOpen && (
                    <ListItem style={{backgroundColor: Theme.palette.secondary.light}}>
                        <List>
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
                            <NavLink to='/flashcards'
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
                                            <Notes style={{color: Theme.palette.secondary.contrastText}}/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary='Flash Cards'/>
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
                        </List>
                    </ListItem>
                )}
                <ListItem
                    button
                    onClick={toggleInfo}
                >
                    <ListItemIcon>
                        <Info style={{color: Theme.palette.secondary.contrastText}}/>
                    </ListItemIcon>
                    {sideBarOpen &&  <ListItemText primary='Information'/>}
                </ListItem>
                {infoOpen && (
                    <ListItem style={{backgroundColor: Theme.palette.secondary.light}}>
                        <List>
                            <NavLink to='/about'
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
                                            <RecentActors style={{color: Theme.palette.secondary.contrastText}}/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary='About Us'/>
                                </ListItem>
                            </NavLink>
                            <NavLink to='/contact'
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
                                            <Contacts style={{color: Theme.palette.secondary.contrastText}}/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary='Contact'/>
                                </ListItem>
                            </NavLink>
                            <NavLink to='/faq'
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
                                            <HelpOutline style={{color: Theme.palette.secondary.contrastText}}/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary='FAQs'/>
                                </ListItem>
                            </NavLink>
                            <NavLink to='/help'
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
                                            <Help style={{color: Theme.palette.secondary.contrastText}}/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary='Help'/>
                                </ListItem>
                            </NavLink>
                        </List>
                    </ListItem>
                )}
            </List>
        </div>
    )
}