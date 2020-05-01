import React from "react";
import {Theme} from "../../utils";
import clsx from "clsx";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {SettingsButton} from "../SettingsButton";
import {InstructionsButton} from "../InstructionsButton";
import {HomeButton} from "../HomeButton";
import {ScoreBoard} from "../ScoreBoard";
import {Timer} from "../Timer";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.secondary.main
    },
    row: {
        display: 'flex'
    },
    pad: {
        padding: theme.spacing(1)
    },
}));

export default ({settings, setSelectedSettings, instructions, score, timer}) => {
    const classes = useStyles(Theme);
    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.row)}>
                <HomeButton/>
                {
                    score && (score() !== null) && (
                        <ScoreBoard score={score}/>
                    )
                }
                {
                    timer && (
                        <Timer />
                    )
                }
                {
                    settings && (
                        <div className={clsx(classes.pad)}>
                            <SettingsButton settings={settings} setSelectedSettings={setSelectedSettings}/>
                        </div>
                    )
                }
                {
                    instructions && (
                        <div className={clsx(classes.pad)}>
                            <InstructionsButton instructions={instructions}/>
                        </div>
                    )
                }
            </div>
        </div>
    )
}