import React from "react";
import {Theme} from "../Components/Theme";
import clsx from "clsx";
import {Energy, F0FromBuffer} from "../Components/FeatureExtraction";
import {MinMaxScale} from "../Components/SignalProcessing";
import {Area, AreaChart, Label, Legend, ReferenceArea, ReferenceLine, Text, XAxis, YAxis} from "recharts";
import {makeStyles} from "@material-ui/core";
import uuid from 'uuid/v4';
import {AudioPlayer} from "../Components/AudioPlayer";
import IconButton from "@material-ui/core/IconButton";
import HearIcon from '@material-ui/icons/Hearing';
import SpeakIcon from '@material-ui/icons/RecordVoiceOver';
import {faDice} from '@fortawesome/free-solid-svg-icons/faDice';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Typography from "@material-ui/core/Typography";
import RealTimeF0Trimmed from "../Components/FeatureExtraction/RealTimeF0Trimmed";

const useStyles = makeStyles(theme => ({
    root: {},
    buttonBar: {
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'center'
    },
    pad: {
        flexGrow: -1,
        margin: theme.spacing(2),
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
    },
    icon: {
        width: 50,
        height: 50,
    },
    faIcon: {
        fontSize: 38,
    },
    listening: {
        backgroundColor: theme.palette.error.main,
        color: theme.palette.error.contrastText,
    },
    notListening: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
    }
}));
/*  The component accepts a speech signal as it would come from a graphQL query to corpus. The JSON object should
 *  take the form below:
 *      wav: The decoded PCM data as a Float32Array
 *      samplerate: The sampling rate of the signal as an Integer
 *      graphemes: The graphemes of the signal as a String. I would like to get this in the same form as phonemes,
 *                  check MFA documentation.
 *      phonemes: A list of phonemes in the signal in the form of:
 *              [
 *                  {
 *                      xmin: the onset of the phoneme as an index of the signal. To get it in seconds divide by
 *                              samplerate
 *                      xmax: the offset of the phoneme as an index of the signal. See above
 *                      text: the phonetic pronunciation of the graphemes
 *                  }
 *              ]
 *      english: The English translation of the word
 *      pinyin: the Pinyin translation of the word
 *          }
 */
export default ({s}) => {
    const classes = useStyles(Theme);
    const [f0, t] = F0FromBuffer({buffer: s.wav, sampleRate: s.sampleRate});

    const tmin = Math.min(...t);
    const tmax = Math.max(...t);

    const f0Scaled = MinMaxScale({s: f0});


    for (let i = 0; i < s.phonemes.length; i++) {
        let si = s.phonemes[i];
        t.push(si.xmin / s.sampleRate);
        t.push(si.xmax / s.sampleRate);
    }

    let tTemp = MinMaxScale({s: t});
    let phonemeTimes = 2 * s.phonemes.length;

    const tScaled = tTemp.slice(0, tTemp.length - phonemeTimes);
    const pScaled = tTemp.slice(tTemp.length - phonemeTimes);
    const phonemes = [];

    for (let i = 0; i < pScaled.length; i += 2) {

        phonemes.push({xmin: pScaled[i], xmax: pScaled[i + 1], text: s.phonemes[Math.floor(i / 2)].text});
    }

    const [play, progress] = AudioPlayer(s);


    const scaleProgress = (p) => {
        const scale = 1 / (tmax - tmin);
        return (scale * p) - (tmin * scale);
    };

    const formattedData = [];
    for (let i = 0; i < f0Scaled.length; i++) {
        formattedData.push({'native': f0Scaled[i], 't': tScaled[i]})
    }

    const [running, setRunning, f02] = RealTimeF0Trimmed();

    const f02Min = Math.min(...f02);
    const f02Max = Math.max(...f02);
    const scaleF02 = (f) =>{
        const scale = 1 / (f02Max - f02Min);
        return (scale * f) - (f02Min * scale);
    };
    const f02Scaled = f02.map(f => scaleF02(f));

    const t2 = [...Array(f02.length).fill(0).map((i, index) => index)];
    const scaleT2 = (t) => {
        const scale = 1 / (f02Scaled.length - 1);
        return t * scale;
    };
    const t2Scaled = t2.map(t => scaleT2(t));

    const toggleRunning = () => setRunning(prevState => !prevState);

    const formattedData2 = [];
    for(let i = 0; i < f02Scaled.length; i++){
        formattedData2.push({'student': f02Scaled[i], 't': t2Scaled[i]});
    }

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.buttonBar)}>
                <div className={clsx(classes.pad)}>
                    <Typography
                        variant='h6'
                        color='secondary'
                    >
                        Hear
                    </Typography>
                    <IconButton
                        color='secondary'
                        onClick={play}
                    >
                        <HearIcon className={clsx(classes.icon)}/>
                    </IconButton>
                </div>
                <div className={clsx(classes.pad)}>
                    <Typography
                        variant='h6'
                        color='secondary'
                    >
                        Speak
                    </Typography>
                    <IconButton
                        color='secondary'
                        onClick={toggleRunning}
                        className={clsx(classes.icon, {
                            [classes.listening]: running,
                            [classes.notListening]: !running,
                        })}
                    >
                        <SpeakIcon className={clsx(classes.icon)}/>
                    </IconButton>
                </div>
                <div className={clsx(classes.pad)}>
                    <Typography
                        variant='h6'
                        color='secondary'
                    >
                        Exchange
                    </Typography>
                    <IconButton
                        color='secondary'
                    >
                        <FontAwesomeIcon className={clsx(classes.faIcon)} icon={faDice}/>
                    </IconButton>
                </div>
            </div>
            <AreaChart
                width={1100}
                height={500}
                margin={{top: 50, right: 30, left: 120, bottom: 30}}
                data={formattedData.concat(formattedData2)}
            >
                <defs>
                    <linearGradient id='native' x1='0' y1='0' x2='0' y2='1'>
                        <stop offset='5%' stopColor={Theme.palette.accent.main} stopOpacity={0.8}/>
                        <stop offset='95%' stopColor={Theme.palette.accent.main} stopOpacity={0.2}/>
                    </linearGradient>
                    <linearGradient id='student' x1='0' y1='0' x2='0' y2='1'>
                        <stop offset='5%' stopColor={Theme.palette.error.main} stopOpacity={0.8}/>
                        <stop offset='95%' stopColor={Theme.palette.error.main} stopOpacity={0.2}/>
                    </linearGradient>
                </defs>
                <Legend verticalAlign='top' height={36}/>
                <XAxis
                    type='number'
                    dataKey='t'
                    stroke={Theme.palette.primary.contrastText}
                    domain={['dataMin', 'dataMax']}
                >
                    <Label
                        value='Time => [0, 1]'
                        offset={-5}
                        position='insideBottom'
                        fontSize='18'
                        fill={Theme.palette.primary.contrastText}
                    />
                    <Label
                        value={s.graphemes}
                        position='top'
                        offset={400}
                        fontSize='36'
                        fill={Theme.palette.primary.contrastText}
                    />
                </XAxis>
                <YAxis
                    type='number'
                    stroke={Theme.palette.primary.contrastText}
                    domain={[-0.25, 1.25]}
                    label={
                        <Text
                            x={0}
                            y={50}
                            dx={130}
                            dy={250}
                            offset={0}
                            angle={-90}
                            fontSize='18'
                            fill={Theme.palette.primary.contrastText}
                        >
                            f0 => [0, 1]
                        </Text>
                    }
                />
                <Area
                    dataKey='native'
                    type='monotone'
                    stroke={Theme.palette.accent.main}
                    fillOpacity={1}
                    fill='url(#native)'
                />
                {phonemes.map(p =>
                    <ReferenceArea
                        key={uuid()}
                        x1={p.xmin}
                        x2={p.xmax}
                        y1={1}
                        y2={1.25}
                        fill='url(#native)'
                        label={{fontSize: 24, value: p.text, fill: Theme.palette.primary.contrastText}}
                        ifOverflow='extendDomain'
                    />
                )}
                {pScaled.map(p =>
                    <ReferenceLine
                        key={uuid()}
                        x={p}
                        stroke={Theme.palette.accent.main}
                        strokeDasharray='3 3'
                    />
                )}
                <ReferenceLine
                    x={scaleProgress(progress)}
                    stroke={Theme.palette.accent.main}
                    strokeWidth={3}
                />
                <Area
                    dataKey='student'
                    type='monotone'
                    stroke={Theme.palette.error.main}
                    fillOpacity={1}
                    fill='url(#student)'
                />
            </AreaChart>
        </div>
    );
}