import React, {Fragment, useEffect, useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {GameWrapper, Theme, WordPicker} from "../../Components";
import clsx from "clsx";
import {ToneTrainerComponent} from "./index";
import {ConfigBar} from './index';

const useStyles = makeStyles(theme => ({
    root: {

    },
}));

export default () => {
    const classes = useStyles(Theme);

    const [nativeSample, setNativeSample] = useState(null);
    const [lesson, setLesson] = useState(null);

    useEffect(() => {
        if (!nativeSample) return;
    }, [nativeSample]);

    return (
        <GameWrapper>
            <ConfigBar
                setSelectedSample={setNativeSample}
                setSelectedLesson={setLesson}
            />
            <Fragment/>
            <div className={clsx(classes.root)}>
                {nativeSample &&
                <ToneTrainerComponent
                    sampleNative={nativeSample}
                    lesson={lesson}
                />
                }
            </div>
        </GameWrapper>
    );
};
