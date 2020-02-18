import React from "react";
import {Theme} from "../Components/Theme";
import clsx from "clsx";
import {Area, AreaChart, Label, Legend, ReferenceArea, ReferenceLine, Text, XAxis, YAxis} from "recharts";
import {makeStyles} from "@material-ui/core";
import uuid from 'uuid/v4';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center'
    },
    icon: {
        color: theme.palette.primary.contrastText
    },
    studentIcon: {
        color: theme.palette.error.main,
    },
    nativeIcon: {
        color: theme.palette.accent.main,
    },
    row: {
        display: 'flex',
        justifyContent: 'spaceAround',
        alignItems: 'center',
        padding: theme.spacing(1),
    },
    pad: {
        padding: theme.spacing(1),
        margin: theme.spacing(1),
        display: 'flex',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },
    recording: {
        color: theme.palette.accent.main,
        backgroundColor: theme.palette.error.main
    },
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
export default ({t1, t2, p1, progress1, progress2}) => {
    const classes = useStyles(Theme);

    return (
        <div className={clsx(classes.root)}>
            <AreaChart
                width={1100}
                height={500}
                margin={{top: 50, right: 30, left: 120, bottom: 30}}
                data={t2.length > 1 ? t1.concat(t2): t1}
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
                <Legend
                    verticalAlign='top'
                    align='right'
                    iconSize={28}
                    iconType='line'
                    formatter={(value, entry) => <span
                        style={{color: Theme.palette.primary.contrastText, fontSize: 18}}>{value}</span>}
                    height={36}
                    fill={Theme.palette.primary.contrastText}
                />
                <XAxis
                    type='number'
                    dataKey='t'
                    stroke={Theme.palette.primary.contrastText}
                    domain={[0, 1]}
                >
                    <Label
                        value='Time => [0, 1]'
                        offset={-5}
                        position='insideBottom'
                        fontSize='18'
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
                <Area
                    dataKey='student'
                    type='monotone'
                    stroke={Theme.palette.error.main}
                    fillOpacity={1}
                    fill='url(#student)'
                />
                {p1 && p1.map(p =>
                    <ReferenceArea
                        key={uuid()}
                        x1={p.xmin}
                        x2={p.xmax}
                        y1={1}
                        y2={1.25}
                        fill='url(#native)'
                        fillOpacity={1}
                        stroke={Theme.palette.accent.main}
                        label={{value: p.text, fill: Theme.palette.primary.contrastText}}
                    />)}
                {p1 && p1.map(p =>
                    <ReferenceLine
                        key={uuid()}
                        x={p.xmin}
                        stroke={Theme.palette.accent.main}
                        strokeWidth={3}
                        strokeDasharray='6 6'
                    />
                )}
                {p1 && p1.map(p =>
                    <ReferenceLine
                        key={uuid()}
                        x={p.xmax}
                        stroke={Theme.palette.accent.main}
                        strokeWidth={3}
                        strokeDasharray='6 6'
                    />
                )}
                <ReferenceLine
                    x={progress1}
                    stroke={Theme.palette.accent.main}
                    strokeWidth={3}
                    strokeDasharray='6 6'
                />
            </AreaChart>
        </div>
    );
}