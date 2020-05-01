import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Avatar, Button, Typography} from "@material-ui/core";
import {Translate} from "@material-ui/icons";
import {Theme} from "../../utils";
import clsx from "clsx";
import {NavLink} from "react-router-dom";
import {Breadcrumbs} from "../Breadcrumbs";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: '100%',
        backgroundColor: theme.palette.secondary.main
    },
    row: {
        display: 'flex',
        flexFlow: 'row noWrap',
        alignItems: 'center'
    },
    pad: {
        padding: theme.spacing(1)
    }
}));

export default () => {
    const classes = useStyles(Theme);

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.row)}>
                <NavLink to='/home'
                         activeStyle={{
                             fontWeight: 'bold',
                             color: Theme.palette.secondary.contrastText
                         }}
                         style={{
                             color: Theme.palette.secondary.contrastText
                         }}>
                    <Button
                        style={{backgroundColor: Theme.palette.secondary.main}}
                    >
                        <div >
                            <Avatar style={{
                                backgroundColor: Theme.palette.secondary.main,
                            }}>
                                <Translate style={{
                                    color: Theme.palette.secondary.contrastText
                                }}/>
                            </Avatar>
                        </div>
                        <div >
                            <Typography
                                variant='h4'
                                style={{color: Theme.palette.secondary.contrastText}}
                            >
                                SpeakEasy.tools
                            </Typography>
                        </div>
                    </Button>
                </NavLink>
                <div >
                    <Breadcrumbs/>
                </div>
            </div>
        </div>
    );
};