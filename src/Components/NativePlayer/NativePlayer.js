import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core";
import clsx from "clsx";
import Play from '@material-ui/icons/PlayCircleFilled';
import Stop from '@material-ui/icons/Stop';
import {Theme} from "../Theme";
import IconButton from "@material-ui/core/IconButton";
import PitchFinder from 'pitchfinder';
import {Area, AreaChart, ReferenceLine, XAxis, YAxis} from "recharts";

const useStyles = makeStyles(theme => ({
    root: {
        color: theme.palette.secondary.main,
    },
    icon: {
        width: 60,
        height: 60
    }
}));

export default ({native}) => {
    const classes = useStyles(Theme);
    const f0 = [];
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const [playing, setPlaying] = useState(false);
    const arrayBuffer = audioContext.createBuffer(1, native.wav.data.length, native.wav.samplerate);
    const source = audioContext.createBufferSource();
    const wavArray = new Float32Array(native.wav.data);

    const pitchDetector = new PitchFinder.YIN({sampleRate: native.wav.samplerate});
    const pitchBufferSize = 512;
    for (let i = 0; i < wavArray.length; i += pitchBufferSize) {
        const pitch = pitchDetector(wavArray.slice(i, i + pitchBufferSize));
        f0.push({f0: pitch, t: i / native.wav.samplerate});
    }

    const handlePlay = () => {
        arrayBuffer.copyToChannel(wavArray, 0, 0);

        source.buffer = arrayBuffer;
        source.connect(audioContext.destination);
        setPlaying(true);
        source.start();
    };

    const handleStop = () => {
        setPlaying(false);
        if(source) source.stop();
    };

    return (
        <div className={clsx(classes.root)}>
            <IconButton className={clsx(classes.root)} onClick={playing ? handleStop : handlePlay}>
                {playing ? <Stop className={clsx(classes.icon)}/> : <Play className={clsx(classes.icon)}/>}
            </IconButton>
            <AreaChart
                width={600}
                height={300}
                data={f0}
                margin={{top: 5, right: 30, left: 20, bottom: 20}}
            >
                <XAxis
                    dataKey='t'
                    type='number'
                    name='time'
                    unit='s'
                    stroke={Theme.palette.secondary.main}
                    domain={[0, native.wav.data.length / native.wav.samplerate]}
                />
                <YAxis
                    dataKey='f0'
                    type='number'
                    name='intonation'
                    unit='Hz'
                    stroke={Theme.palette.secondary.main}
                    domain={['dataMin + 1000', 'dataMax + 1000']}
                />
                {native.phonemes.phonemes.map((p, index) => {
                    const xmin = p.xmin / native.wav.samplerate;
                    const xmax = p.xmax / native.wav.samplerate;
                    const xmid = xmin + (xmax - xmin) / 2;
                    console.log(xmin, xmax);
                    return (
                        <ReferenceLine
                            key={index}
                            x={xmid}
                            strokeOpacity={0}
                            label={p.text}
                        />
                    )
                })
                }
                <Area
                    dataKey='f0'
                    stroke={Theme.palette.secondary.main}
                    fill={Theme.palette.secondary.main}
                    fillOpacity={0.2}
                />
            </AreaChart>

        </div>
    );
}