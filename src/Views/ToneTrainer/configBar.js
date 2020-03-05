import React, {useEffect, useState} from 'react';
import {makeStyles,} from "@material-ui/core";
import {Theme} from "../../Components/Theme";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import {Cached, KeyboardArrowLeft, KeyboardArrowRight} from "@material-ui/icons";
import {Corpus, LessonsPage} from "../../Queries";
import uuid from "uuid/v4";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
    },
    wordBar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        color: theme.palette.primary.contrastText,
    },
    pad: {
        margin: theme.spacing(1),
        padding: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    typography: {
        fontSize: 24,
    },
    selected: {
        boxShadow: `0px 0px 12px ${theme.palette.accent.main}`,
        border: `thick solid ${theme.palette.primary.main}`
    },
    glow: {
        textShadow: `0px 0px 12px ${theme.palette.primary.contrastText}`
    },
    button: {
        backgroundColor: theme.palette.accent.main,
        '&:hover': {
            backgroundColor: theme.palette.primary.light,
            border: `thick solid ${theme.palette.accent.main}`
        }
    }
}));

export default ({setSelectedSample, setSelectedLesson}) => {
    const classes = useStyles(Theme);

    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentSamplePageIndex, setCurrentSamplePageIndex] = useState(0);

    const [countPages, setCountPages] = useState(0);
    const [countSamplePages, setCountSamplePages] = useState(0);

    const [currentLesson, setCurrentLesson] = useState(null);
    const [currentSample, setCurrentSample] = useState(null);
    const [currentGraphemes, setCurrentGraphemes] = useState(null);

    const wordsPerPage = 5;
    const samplesPerWord = 1;

    const [lessons, totalPages] = LessonsPage({
        lessonLimit: wordsPerPage,
        lessonPage: currentPageIndex,
    });

    useEffect(() => {
        if(!lessons)return;

        setCurrentSample(null);
        setCurrentSamplePageIndex(0);
        setCurrentGraphemes('');

        setCurrentWordIndex(0);
        setCurrentLesson(lessons[0]);

    }, [lessons]);

    useEffect(() => {
        if(totalPages === null) return;
        setCountPages(totalPages);
    }, [totalPages]);

    useEffect(() => {
        if(!currentLesson)return;
        setCurrentGraphemes(currentLesson.chinese);
    }, [currentLesson]);

    const [samples, totalSamples] = Corpus({
        sampleLimit: samplesPerWord,
        samplePage: currentSamplePageIndex,
        graphemes: currentGraphemes,
    });
    useEffect(() => {
        if(!samples) return;
        setCurrentSample(samples[0]);
    }, [samples]);

    useEffect(() => {
        if(!totalSamples)return;
        setCountSamplePages(totalSamples);
    }, [totalSamples]);
    const handleSampleChange = () => {
        setCurrentSamplePageIndex(prevState => (prevState + 1 < countSamplePages) ? prevState + 1 : 0);
    };

    useEffect(() => {
        if(!(currentWordIndex && lessons)) return;
        setCurrentLesson(lessons[currentWordIndex]);

    }, [currentWordIndex, lessons]);
    const handleWordChange = newValue => {
        if(newValue === null) return;
        setCurrentWordIndex(newValue);
    };

    const handlePageLeft = () => {
        setCurrentPageIndex(prevState => prevState - 1);
    };
    const handlePageRight = () => {
        setCurrentPageIndex(prevState => prevState + 1);
    };

    useEffect(() => {
        if(!currentSample) return;
        setSelectedSample(currentSample)
    }, [currentSample, setSelectedSample]);
    useEffect(() => {
        if(!currentLesson)return;
        setSelectedLesson(currentLesson);
    }, [currentLesson, setSelectedLesson]);

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.row)}>
                <div className={clsx(classes.pad)}>
                    <IconButton
                        className={clsx(classes.icon)}
                        onClick={handlePageLeft}
                        disabled={currentPageIndex <= 0}
                    >
                        <KeyboardArrowLeft/>
                    </IconButton>
                    <Typography
                        variant='h6'
                        color='secondary'>
                        Prev.
                    </Typography>
                </div>
                <div className={clsx(classes.wordBar)}>
                    {lessons && lessons.map((l, index) =>
                        <div
                            className={clsx(classes.pad)}
                            key={uuid()}
                        >
                            <Button
                                variant='contained'
                                className={clsx(classes.button, {
                                    [classes.selected]: currentWordIndex === index
                                })}
                                onClick={() => handleWordChange(index)}
                            >
                                <Typography
                                    variant='h6'
                                    color='secondary'
                                    className={clsx({
                                        [classes.glow]: currentWordIndex === index
                                    })}
                                >
                                    {l.pinyin}
                                </Typography>
                            </Button>
                        </div>
                    )}
                </div>
                <div className={clsx(classes.pad)}>
                    <IconButton
                        className={clsx(classes.icon)}
                        disabled={countPages <= currentPageIndex}
                        onClick={() => handlePageRight()}
                    >
                        <KeyboardArrowRight/>
                    </IconButton>
                    <Typography
                        variant='h6'
                        color='secondary'>
                        Next
                    </Typography>
                </div>
            </div>
            <div className={clsx(classes.row)}>
                <div className={clsx(classes.pad)}>
                    <Typography
                        variant='h6'
                        color='secondary'>
                        Different
                    </Typography>
                    <IconButton
                        className={clsx(classes.icon)}
                        onClick={() => handleSampleChange()}
                        disabled={countPages <= currentPageIndex}
                    >
                        <Cached/>
                    </IconButton>
                    <Typography
                        variant='h6'
                        color='secondary'>
                        example
                    </Typography>
                </div>
            </div>
        </div>
    );
}