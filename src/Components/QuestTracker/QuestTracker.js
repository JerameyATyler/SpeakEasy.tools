import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Theme} from "../../utils";
import clsx from "clsx";
import {Check, Close, PlaylistAddCheck} from "@material-ui/icons";
import {Button, List, ListItem, ListItemIcon, ListItemText, Typography} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexFlow: 'column noWrap',
        overflow: 'auto'
    },
    row: {
        display: 'flex',
        flexFlow: 'row noWrap',
        alignItems: 'center',
    },
    pad: {
        padding: theme.spacing(1)
    },
    list: {
        backgroundColor: theme.palette.primary.dark,
        padding: theme.spacing(1)
    },
    listItem: {
        backgroundColor: theme.palette.primary.main,
        borderBottom: `thick solid ${theme.palette.primary.dark}`,
    },
    listItemIcon: {
        border: `thin solid ${theme.palette.primary.contrastText}`
    }
}));

export default ({inventory}) => {
    const classes = useStyles(Theme);

    const [open, setOpen] = useState(null);
    const handleClick = () => {
        setOpen(prevState => !prevState);
    };

    return (
        <div
            className={clsx(classes.root)}
        >
            <div className={clsx(classes.row)}>
                <div className={clsx(classes.pad)}>
                    <Button
                        color='secondary'
                        variant='contained'
                        onClick={handleClick}
                        disabled={!Boolean(inventory)}
                    >
                        {open ? <Close/> : <PlaylistAddCheck/>}
                        <div className={clsx(classes.pad)}>
                            <Typography>
                                {open ? 'Close' : 'Open'} Inventory
                            </Typography>
                        </div>
                    </Button>
                    {open && (
                        <List
                            id='inventory-menu'
                            className={clsx(classes.list)}
                        >
                            {inventory && inventory.map((j, index) => (
                                <ListItem
                                    key={index}
                                    className={clsx(classes.listItem)}
                                >
                                    <ListItemIcon>
                                        {j.complete
                                            ? <Check
                                                style={{
                                                    color: Theme.palette.primary.dark,
                                                }}
                                                className={clsx(classes.listItemIcon)}
                                            />
                                            : <Close
                                                style={{
                                                    color: Theme.palette.primary.dark,
                                                }}
                                                className={clsx(classes.listItemIcon)}
                                            />
                                        }
                                    </ListItemIcon>
                                    <ListItemText primary={j.text}/>
                                </ListItem>
                            ))}
                        </List>
                    )}
                </div>
            </div>
        </div>);
}