import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Theme from "../Theme/Theme";
import {ConfigBar} from '../ConfigBar';
import clsx from "clsx";
import {InstructionsPanel} from "../InstructionsPanel";

const useStyles = makeStyles(theme => ({
    root: {
        flex: '1 1 100%',
        padding: theme.spacing(1),
        display: 'flex',
        flexFlow: 'column',
    },
    row: {
        flex: '1 1 100%',
        display: 'flex',
        alignItems: 'stretch'
    },
    game: {
        flex: '1 1 100%',
    }
}));

export const GameWrapper = (props) => {
    const classes = useStyles(Theme);


    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.configBar)}>
                <ConfigBar>
                    {props.children[0]}
                </ConfigBar>
            </div>
            <div className={clsx(classes.row)}>
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
