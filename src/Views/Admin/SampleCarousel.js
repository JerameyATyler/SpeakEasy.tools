import React, {useEffect, useState} from 'react';
import {makeStyles, MobileStepper} from "@material-ui/core";
import {Theme} from "../../Components/Theme";
import clsx from "clsx";
import SwipeableViews from 'react-swipeable-views';
import {KeyboardArrowLeft, KeyboardArrowRight,} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import {ToneTrainerComponent} from "../ToneTrainer";

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.accent.main,
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    slide: {
        display: 'flex',
        flexGrow: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    pad: {
        padding: theme.spacing(1),
        margin: theme.spacing(1),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'spaceAround'
    },
    active: {
        backgroundColor: theme.palette.error.main,
    },
    native: {
        borderLeft: `thick solid ${theme.palette.accent.main}`,
    },
    student: {
        borderLeft: `thick solid ${theme.palette.error.main}`,
    },
    graph: {
        margin: theme.spacing(0),
        padding: theme.spacing(0),
    },
    toolbar: {
        margin: theme.spacing(0),
        padding: theme.spacing(0),
        color: theme.palette.primary.contrastText,
        display: 'flex',
        flexDirection: 'column',
    },
    icon: {
        color: theme.palette.primary.contrastText
    }
}));

export default ({samples}) => {
    const classes = useStyles(Theme);
    const [page, setPage] = useState(0);
    const [maxPages, setMaxPages] = useState(0);

    const nextPage = () => {
        setPage(prevState => prevState + 1);
    };
    const prevPage = () => {
        setPage(prevState => prevState - 1);
    };
    const handlePageChange = newPage => {
        setPage(newPage);
    };

    const [currentSample, setCurrentSample] = useState({wav: null, sampleRate: null});
    useEffect(() => {
        if (!samples) return;
        const s = samples[page];
        setCurrentSample(s);
    }, [samples, page]);

    return (
        <div
            className={clsx(classes.root)}
        >
            <SwipeableViews
                axis='x'
                index={page}
                onChangeIndex={handlePageChange}
                enableMouseEvents
            >
                <div className={clsx(classes.slide)}>
                    <ToneTrainerComponent
                        sampleNative={currentSample}

                    />
                </div>
            </SwipeableViews>
            <MobileStepper
                steps={maxPages}
                position='static'
                variant='text'
                activeStep={page}
                nextButton={
                    <Button size='small' onClick={nextPage} disabled={page === maxPages - 1}>
                        Next
                        <KeyboardArrowRight/>
                    </Button>
                }
                backButton={
                    <Button size='small' onClick={prevPage} disabled={page === 0}>
                        <KeyboardArrowLeft/>
                        Prev
                    </Button>}
            />
        </div>
    )
}