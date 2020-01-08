import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Theme from "../Theme/Theme";
import {ConfigBar} from '../ConfigBar';
import clsx from "clsx";
import {InstructionsPanel} from "../InstructionsPanel";

const useStyles = makeStyles(theme => ({
    gameWrapper: {
        display: 'flex',
        flexDirection: 'column',
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.light,
        height: '80vh',
        width: '80vw',
        padding: theme.spacing(1)
    },
    content: {
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'row',
    },
    header: {},
    toolbar: theme.mixins.toolbar,
    game: {
        padding: theme.spacing(1),
        height: '100%',
        width: '100%',
        backgroundColor: theme.palette.secondary.dark,
    },
}));

export const GameWrapper = (props) => {
    const classes = useStyles(Theme);


    return (

        <div className={clsx(classes.gameWrapper)}>
            <ConfigBar>
                {props.children[0]}
            </ConfigBar>
            <div className={clsx(classes.content)}>
                <div className={clsx(classes.instructions)}>
                    <InstructionsPanel>
                        {props.children[1]}
                    </InstructionsPanel>
                </div>
                <div className={clsx(classes.game)}>
                    {props.children[2]}
                </div>
            </div>
        </div>
    )
};
