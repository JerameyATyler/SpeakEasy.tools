import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Typography} from "@material-ui/core";
import {Translate} from "@material-ui/icons";
import {Theme} from "../../utils";
import clsx from "clsx";
import {Breadcrumbs} from "../Breadcrumbs";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText
    },
    row: {
        width: '100%',
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
                <div className={clsx(classes.pad)}>
                    <Button
                        component={Link}
                        to='/'
                        style={{
                            backgroundColor: Theme.palette.secondary.main,
                            color: Theme.palette.secondary.contrastText
                        }}
                    >
                        <Translate/> SpeakEasy.tools
                    </Button>
                </div>
                <div>
                    <Breadcrumbs/>
                </div>
            </div>
        </div>
    );
};