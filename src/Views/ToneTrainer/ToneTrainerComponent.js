import {VoiceRecorder} from "../../Components/VoiceRecorder";
import React, {useEffect, useState} from "react";
import uuid from 'uuid/v4';
import clsx from "clsx";
import {List, ListItem, ListItemIcon, ListItemText, makeStyles} from "@material-ui/core";
import {Hearing, RecordVoiceOver} from "@material-ui/icons";
import {Theme} from "../../Components/Theme";
import {F0, F0FromBuffer} from "../../Components/FeatureExtraction";
import {MinMaxScaler} from "machinelearn/preprocessing";
import Typography from "@material-ui/core/Typography";
import {ToneGraph} from "./index";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        margin: theme.spacing(3),
        backgroundColor: theme.palette.primary.contrastText
    },
    row: {
        display: 'flex',
        flexGrow: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(1)
    },
    column: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    graph: {
        flexGrow: 1,
        width: '100%',
        height: 300,
    },
    list: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.contrastText
    },
    icon: {
        color: theme.palette.primary.contrastText
    },
    selected: {
        border: `thin solid ${theme.palette.primary.contrastText}`,
        backgroundColor: theme.palette.primary.light
    },
    glow: {
        textShadow: `0px 0px 4px ${theme.palette.primary.contrastText}`,
    },
    title: {
        flexGrow: 1,
        width: '100%',
    },
    pad: {
        padding: theme.spacing(1),
        margin: theme.spacing(1),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'spaceAround'
    }
}));

export default ({sampleNative, lesson}) => {
    const classes = useStyles(Theme);

    const [recording, toggle, blob, sampleRate] = VoiceRecorder();

    const [audioBlobs, setAudioBlobs] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(null);

    const [playing, setPlaying] = useState(false);
    const [progress, setProgress] = useState(null);

    const [currentBuffer, setCurrentBuffer] = useState(null);
    const f0Student = F0FromBuffer(currentBuffer);

    const [bufferNative, setBufferNative] = useState(null);
    const [sampleRateNative, setSampleRateNative] = useState(null);
    const f0Native = F0(bufferNative, sampleRateNative);

    const [progressNative, setProgressNative] = useState(null);

    const [phonemesNative, setPhonemesNative] = useState(null);
    const [phonemesStudent, setPhonemesStudent] = useState(null);

    useEffect(() => {
        if (!(sampleNative && sampleNative.wav && sampleNative.sampleRate)) return;
        setBufferNative(sampleNative.wav);
        setSampleRateNative(sampleNative.sampleRate);
        if (sampleNative.phonemes) setPhonemesNative(sampleNative.phonemes);
    }, [sampleNative]);

    const playAudio = (blob, index) => {
        const a = new Audio(URL.createObjectURL(blob));
        a.onended = () => setPlaying(false);
        a.arrayBuffer = blob.arrayBuffer;

        setPlaying(true);
        a.ontimeupdate = e => setProgress(e.target.currentTime / e.target.duration);
        setCurrentIndex(index);
        setProgress(a.currentTime);

        a.play();
    };

    const playNative = () => {
        if (!(sampleNative && sampleNative.wav && sampleNative.sampleRate)) return;
        setPlaying(true);
        const float32Array = new Float32Array(sampleNative.wav);
        const context = new AudioContext();
        const stream = context.createMediaStreamDestination();
        const source = context.createBufferSource();
        const buffer = context.createBuffer(1, sampleNative.wav.length, sampleNative.sampleRate);

        buffer.copyToChannel(float32Array, 0, 0);
        source.buffer = buffer;
        source.onended = () => {
            source.stop(0);
            setPlaying(false);
            a.pause();
            stream.stream.getTracks().forEach(t => t.enabled = false);
        };

        source.start(0);
        source.connect(stream);
        const a = new Audio();
        a.srcObject = stream.stream;
        a.ontimeupdate = e => setProgressNative(Math.min(e.target.currentTime * sampleNative.sampleRate / float32Array.length, 1));

        a.play();
    };

    useEffect(() => {
        if (!blob) return;
        setAudioBlobs(prevState => [...prevState, blob]);
    }, [blob]);

    useEffect(() => {
        if (audioBlobs.length <= 0) return;
        setCurrentIndex(audioBlobs.length - 1);
    }, [audioBlobs]);

    useEffect(() => {
        if (currentIndex === null || audioBlobs.length <= 0) return;
        setCurrentBuffer(audioBlobs[currentIndex].slice());
    }, [audioBlobs, currentIndex]);

    const data = (s, name) => {
        if(!(s && name)) return [];
        let d = [];
        const scaler = () => {
            const scale = new MinMaxScaler({featureRange: [0, 1]});
            const f0 = scale.fit_transform(s.flatMap((f, index) => f ? f : []));
            const t = scale.fit_transform(s.flatMap((f, index) => f ? index : []));
            d = d.concat(f0.map((f, index) => {
                return {[name]: f, t: t[index]}
            }));
        };
        scaler(s, name);
        return d;
    };

    const phonemes = (phones, name) => {
        if(!(phones && name))return [];
        let ps = [];
        const scaler = s => {
            const scale = new MinMaxScaler({featureRange: [0, 1]});
            return scale.fit_transform(s);
        };
        let scaled = scaler(phones.map(p => [p.xmin, p.xmax]).flat());
        for (let i = 0; i < scaled.length; i += 2) {
            const p = {xmin: scaled[i], xmax: scaled[i + 1], text: phones[i / 2].text, speaker: name}
            ps.push(p)
        }
        return ps;
    };
    return (
        <div
            className={clsx(classes.root)}
        >
            <div className={clsx(classes.row)}>
                <div className={clsx(classes.pad)}>
                    <Typography
                        variant='h6'
                        color='primary'
                    >
                        {sampleNative.graphemes}
                    </Typography>
                </div>

                <div className={clsx(classes.pad)}>
                    <Typography
                        variant='h2'
                        color='primary'
                    >
                        {lesson.pinyin}
                    </Typography>
                </div>

                <div className={clsx(classes.pad)}>
                    <Typography
                        variant='h6'
                        color='primary'
                    >
                        {lesson.english}
                    </Typography>
                </div>
            </div>
            <div className={clsx(classes.row)}>
                <ToneGraph
                    native={data(f0Native, 'native')}
                    student={data(f0Student, 'student')}
                    nativeProgress={progressNative}
                    studentProgress={progress}
                    nativePhones={phonemes(phonemesNative, 'native')}
                    studentPhones={phonemes(phonemesStudent, 'student')}
                />
                <div
                    className={clsx(classes.column)}
                >
                    <List className={clsx(classes.list)}>
                        <ListItem
                            button
                            disabled={playing || recording}
                            onClick={() => playNative()}
                        >
                            <ListItemIcon className={clsx(classes.icon)}>
                                <Hearing/>
                            </ListItemIcon>
                            <ListItemText primary="Listen"/>
                        </ListItem>
                        <ListItem
                            button
                            onClick={toggle}
                            disabled={playing}
                            className={clsx({
                                [classes.selected]: recording,
                                [classes.glow]: recording
                            })}
                        >
                            <ListItemIcon className={clsx(classes.icon)}>
                                <RecordVoiceOver/>
                            </ListItemIcon>
                            <ListItemText primary="Practice"/>
                        </ListItem>
                        {audioBlobs && audioBlobs.map((a, index) =>
                            <ListItem
                                key={uuid()}
                                button
                                onClick={() => playAudio(a, index)}
                                disabled={recording || playing}
                                className={clsx({
                                    [classes.selected]: index === currentIndex,
                                    [classes.glow]: index === currentIndex && playing
                                })}
                            >
                                <ListItemIcon className={clsx(classes.icon)}>
                                    <Hearing/>
                                </ListItemIcon>
                                <ListItemText primary={`Attempt ${index + 1}`}/>
                            </ListItem>
                        )}
                    </List>
                </div>
            </div>
        </div>
    )
}