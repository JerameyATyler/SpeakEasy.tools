/* A button to login using the authentication service. */
import React, {useState} from "react";
import clsx from "clsx";
import {Avatar, Button, makeStyles, Menu, MenuItem, Typography} from "@material-ui/core";
import {KeyboardArrowLeft, Settings} from '@material-ui/icons';

import {Theme} from "../../utils";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: '100%',
        color: theme.palette.secondary.contrastText,
    },
    row: {
        display: 'flex',
        flexFlow: 'row noWrap',
        alignItems: 'center'
    },
    pad: {
        padding: theme.spacing(1),
    },
}));

export default ({settings, setSelectedSettings}) => {
    const classes = useStyles(Theme);

    const [anchorE1, setAnchorE1] = useState(null);

    const handleOpen = e => {
        setAnchorE1(e.currentTarget);
    };
    const handleClose = () => {
        setAnchorE1(null);
    };

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.row)}>
                <Button
                    onClick={handleOpen}
                    style={{backgroundColor: Theme.palette.secondary.main}}
                >
                    <Avatar style={{backgroundColor: Theme.palette.secondary.main}}>
                        <Settings style={{color: Theme.palette.secondary.contrastText}}/>
                    </Avatar>
                    <Typography style={{color: Theme.palette.secondary.contrastText}}>
                        Settings
                    </Typography>
                </Button>
                <div>
                    <Menu
                        anchorEl={anchorE1}
                        open={Boolean(anchorE1)}
                        onClose={handleClose}
                    >
                        <MenuItem
                            button
                            onClick={handleClose}
                            style={{backgroundColor: Theme.palette.primary.dark}}
                        >
                            <Avatar
                                style={{backgroundColor: Theme.palette.primary.dark}}>
                                <KeyboardArrowLeft
                                    style={{color: Theme.palette.primary.contrastText}}/>
                            </Avatar>
                            <Typography
                                style={{color: Theme.palette.primary.contrastText}}
                            >
                                Close
                            </Typography>
                        </MenuItem>
                        <MenuItem>
                            <div className={clsx(classes.pad)}>
                                {settings && settings()}
                            </div>
                        </MenuItem>
                    </Menu>
                </div>
            </div>
        </div>
    );
};