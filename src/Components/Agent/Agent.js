import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Mood} from '@material-ui/icons';
import IconButton from "@material-ui/core/IconButton";
import clsx from "clsx";
import {Theme} from "../../utils";

const useStyles = makeStyles(theme => ({
    root: {

    }
}))

export default () => {
    const classes = useStyles(Theme);

    return (
        <div className={clsx(classes.root)}>
            <IconButton>
                <Mood style={{color: Theme.palette.secondary.contrastText, filter: 'drop-shadow(0 0 10px red)'}}/>
            </IconButton>
        </div>
    )
}