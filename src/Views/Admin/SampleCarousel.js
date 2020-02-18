import React, {useState} from 'react';
import {ListItemIcon, ListItemText, makeStyles, Menu, MobileStepper} from "@material-ui/core";
import {Theme} from "../../Components/Theme";
import clsx from "clsx";
import SwipeableViews from 'react-swipeable-views';
import {KeyboardArrowLeft, KeyboardArrowRight} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import {F0FromBuffer, F0FromMic} from "../../Components/FeatureExtraction";
import {ToneGraph} from "../../Visualizations";
import {AudioPlayer} from "../../Components/AudioPlayer";
import Typography from "@material-ui/core/Typography";
import HearIcon from '@material-ui/icons/Hearing';
import SpeakIcon from '@material-ui/icons/RecordVoiceOver';
import ApproveIcon from '@material-ui/icons/Check';
import RejectIcon from '@material-ui/icons/Clear';
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.primary.main,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    row: {
        flexGrow: 1,
        width: '100%',
        margin: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        flexGrow: 1,
        width: '100%',
        height: '100%',
        margin: 'auto',
    },
    pad: {
        padding: theme.spacing(1),
        margin: theme.spacing(1),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'spaceAround'
    },
    menuItem: {
        color: theme.palette.primary.contrastText
    },
    recording: {
        backgroundColor: theme.palette.error.main,
        color: theme.palette.accent.main,
    },
    native: {
        backgroundColor: theme.palette.accent.main,
        color: theme.palette.primary.contrastText,
    },
    student: {
        backgroundColor: theme.palette.error.main,
        color: theme.palette.primary.contrastText,
    }
}));

export default ({samples}) => {
    const classes = useStyles(Theme);
    const [page, setPage] = useState(0);
    const maxPages = samples.length;
    const [anchorE1, setAnchorE1] = useState(null);
    const nextPage = () => {
        setPage(prevState => prevState + 1);
    };

    const prevPage = () => {
        setPage(prevState => prevState - 1);
    };

    const handlePageChange = newPage => {
        setPage(newPage);
    };

    const handleClick = e => {
        setAnchorE1(e.currentTarget);
    };
    const handleClose = () => {
        setAnchorE1(null);
    };

    return (
        <div
            className={clsx(classes.root)}
        >
            <SwipeableViews
                axis='x'
                index={page}
                onChangeIndex={handlePageChange}
                enableMouseEvents
                slideClassName={clsx(classes.slide)}
            >
                {samples ? samples.map((s, index) => {
                        const [f0Native, tNative] = F0FromBuffer({
                            buffer: s.wav,
                            sampleRate: s.sampleRate,
                            scaleAxes: true
                        });
                        const [playNative, progressNative] = AudioPlayer({wav: s.wav, sampleRate: s.sampleRate});
                        const round = x => Math.round((x + Number.EPSILON) * 100) / 100;
                        const joinAxes = (x, y, label) => {
                            return x.map((xi, index) => {
                                return {t: round(xi), [label]: round(y[index])}
                            });
                        };

                        const pMin = Math.min(...s.phonemes.map(p => p.xmin));
                        const pMax = Math.max(...s.phonemes.map(p => p.xmax));
                        const scalePhoneme = p => {
                            const scale = 1 / (pMax - pMin);
                            return (scale * p) - (pMin * scale);
                        };

                        const [
                            running,
                            setRunning,
                            buffer,
                            sampleRate,
                            f0Student,
                            tStudent] = F0FromMic();

                        const toggleRunning = () => setRunning(prevState => !prevState);
                        const [playStudent, progressStudent] = AudioPlayer({wav: buffer, sampleRate: sampleRate});
                        return <div className={clsx(classes.content)} key={s.id}>
                            {Math.abs(page - index) <= 1 ?
                                <>
                                    <div className={clsx(classes.row)}>
                                        <div className={clsx(classes.pad)}>
                                            <Typography
                                                variant='h6'
                                                color='secondary'>
                                                {s.graphemes}
                                            </Typography>
                                        </div>
                                        <div className={clsx(classes.pad)}>
                                            <Typography
                                                variant='h4'
                                                color='secondary'>
                                                {s.pinyin}
                                            </Typography>
                                        </div>
                                        <div className={clsx(classes.pad)}>
                                            <Typography
                                                variant='h6'
                                                color='secondary'>
                                                {s.english}
                                            </Typography>
                                        </div>
                                    </div>
                                    <div className={clsx(classes.row)}>
                                        <div className={clsx(classes.pad)}>
                                            <ToneGraph
                                                t1={joinAxes(tNative, f0Native, 'native')}
                                                t2={joinAxes(tStudent, f0Student, 'student')}
                                                p1={s.phonemes.map(p => {
                                                    return {
                                                        xmin: round(scalePhoneme(p.xmin)),
                                                        xmax: round(scalePhoneme(p.xmax)),
                                                        text: p.text
                                                    }
                                                })}
                                                progress1={progressNative}
                                                progress2={progressStudent}
                                            />
                                            <List aria-label='listen speak approve reject'>
                                                <ListItem button onClick={handleClick}>
                                                    <ListItemIcon>
                                                        <HearIcon className={clsx(classes.menuItem)}/>
                                                    </ListItemIcon>
                                                    <ListItemText className={clsx(classes.menuItem)} primary='Listen'/>
                                                </ListItem>
                                                <Menu
                                                    id='audio samples menu'
                                                    anchorEl={anchorE1}
                                                    keepMounted
                                                    open={Boolean(anchorE1)}
                                                    onClose={handleClose}
                                                >
                                                    <List aria-label='audio sample list'>
                                                        <ListItem button onClick={playNative}
                                                                  className={clsx(classes.native)}>
                                                            <ListItemIcon>
                                                                <HearIcon/>
                                                            </ListItemIcon>
                                                            <ListItemText primary='Native Speaker'/>
                                                        </ListItem>
                                                        <ListItem
                                                            button
                                                            onClick={playStudent}
                                                            className={clsx(classes.student)}>
                                                            <ListItemIcon>
                                                                <HearIcon/>
                                                            </ListItemIcon>
                                                            <ListItemText primary='Your Attempt'/>
                                                        </ListItem>
                                                    </List>
                                                </Menu>
                                                <ListItem button onClick={toggleRunning}
                                                          className={clsx(classes.menuItem, {[classes.recording]: running})}>
                                                    <ListItemIcon>
                                                        <SpeakIcon/>
                                                    </ListItemIcon>
                                                    <ListItemText className={clsx(classes.menuItem)} primary='Speak'/>
                                                </ListItem>
                                                <ListItem button>
                                                    <ListItemIcon>
                                                        <ApproveIcon className={clsx(classes.menuItem)}/>
                                                    </ListItemIcon>
                                                    <ListItemText className={clsx(classes.menuItem)} primary='Approve'/>
                                                </ListItem>
                                                <ListItem button>
                                                    <ListItemIcon>
                                                        <RejectIcon className={clsx(classes.menuItem)}/>
                                                    </ListItemIcon>
                                                    <ListItemText className={clsx(classes.menuItem)} primary='Reject'/>
                                                </ListItem>
                                            </List>
                                        </div>
                                    </div>
                                </>
                                :
                                null
                            }
                        </div>
                    }
                ) : null}
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