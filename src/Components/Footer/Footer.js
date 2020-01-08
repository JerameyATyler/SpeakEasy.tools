import React from 'react';
import clsx from "clsx";

import {makeStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";


import {Theme} from "../index";

import sponsors from "./sponsors";
import personnel from "./personnel";
import Avatar from "@material-ui/core/Avatar";

const localStyles = makeStyles(theme => ({
    footer: {
        top: 'auto',
        bottom: 0,
        zIndex: theme.zIndex.drawer + 1,
    },
    logo: {
        height: 50,
    }
}));

export default () => {

    const localClasses = localStyles(Theme);

    return (
        <AppBar
            position='fixed'
            className={clsx(localClasses.footer)}
        >
            <Toolbar>
                <Grid container alignItems='center' justify='center' direction='row'>
                    {personnel.slice(0, Math.floor(personnel.length / 2))
                        .map(person =>
                            <Grid item
                                key={person.name}
                            >
                                <Avatar alt={person.name}
                                        src={person.avatar}
                                />
                            </Grid>)}
                    {sponsors.map(sponsor =>
                        <Grid item
                              key={sponsor.name}
                        >
                            <Button>
                                <img
                                    src={sponsor.logo}
                                    alt={`${sponsor.name} logo`}
                                    className={clsx(localClasses.logo)}
                                />
                            </Button>
                        </Grid>)}
                    {personnel.slice(Math.floor(personnel.length / 2))
                        .map(person =>
                            <Grid item
                                  key={person.name}
                            >
                                <Avatar alt={person.name}
                                        src={person.avatar}
                                />
                            </Grid>)}
                </Grid>
            </Toolbar>
        </AppBar>
    )
}