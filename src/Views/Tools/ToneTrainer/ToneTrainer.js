import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Theme} from "../../../utils";
import clsx from "clsx";
import {ViewWrapper} from "../../../Components/ViewWrapper";
import ToneCard from "./ToneCard";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: '100%',
    },
    row: {
        flex: '1 1 100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center'
    },
    pad: {
        margin: theme.spacing(1),
    }
}));

export default () => {
    document.title = 'Tone Trainer';
    const classes = useStyles(Theme);

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.row)}>
                <ViewWrapper
                    settings={() => null}
                    instructions={() => null}
                    score={() => null}
                    time={() => null}
                />
            </div>
            <div className={clsx(classes.row)}>
                    <ToneCard/>
            </div>
        </div>
    )
}