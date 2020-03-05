import React, {useEffect, useState} from 'react';
import {Area, AreaChart, Legend, ReferenceArea, ReferenceLine, ResponsiveContainer, XAxis, YAxis} from "recharts";
import uuid from 'uuid/v4';
import {Theme} from "../../Components/Theme";
import clsx from "clsx";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        display: 'flex',
    },
    graph: {
        width: '100%',
        height: 500,
        padding: theme.spacing(1),
    }
}));

export default ({native, student, nativePhones, studentPhones, nativeProgress, studentProgress}) => {
    const classes = useStyles(Theme);
    const [data, setData] = useState(null);
    const [phonemes, setPhonemes] = useState(null);

    useEffect(() => {
        let d = [];
        if (native) d = d.concat(native);
        if (student) d = d.concat(student);
        setData(d);
    }, [native, student]);

    useEffect(() => {
        let p = [];
        if (nativePhones) p = p.concat(nativePhones);
        if (studentPhones) p = p.concat(studentPhones);
        setPhonemes(p);
    }, [nativePhones, studentPhones]);

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.graph)}>
                <ResponsiveContainer>
                    <AreaChart
                        data={data}
                        margin={{top: 10, right: 0, left: 10, bottom: 10}}
                    >
                        <defs>
                            <linearGradient id='native' x1={0} y1={0} x2={0} y2={1}>
                                <stop offset='5%' stopColor={Theme.palette.accent.main} stopOpacity={0.95}/>
                                <stop offset='100%' stopColor={Theme.palette.accent.main} stopOpacity={0.05}/>
                            </linearGradient>
                            <linearGradient id='student' x1={0} y1={0} x2={0} y2={1}>
                                <stop offset='5%' stopColor={Theme.palette.error.main} stopOpacity={0.95}/>
                                <stop offset='100%' stopColor={Theme.palette.error.main} stopOpacity={0.05}/>
                            </linearGradient>
                        </defs>
                        <XAxis
                            type='number'
                            dataKey='t'
                            label={{value: 'Time %', fill: Theme.palette.primary.main}}
                            axisLine={false}
                            tick={false}
                        />
                        <YAxis
                            type='number'
                            label={{value: 'Tone', fill: Theme.palette.primary.main}}
                            axisLine={false}
                            tick={false}
                            domain={[0, 1.25]}
                        />
                        <Legend align='right' verticalAlign='top' iconSize={24}
                                formatter={value => {
                                    return (<span style={{color: Theme.palette.primary.main}}>{value}</span>)
                                }}
                        />
                        <Area dataKey='native'
                              stroke={Theme.palette.accent.main}
                              strokeDasharray='6 6'
                              fill='url(#native)'
                        />
                        <Area dataKey='student'
                              stroke={Theme.palette.error.main}
                              strokeDasharray='6 6'
                              fill='url(#student)'
                        />
                        {nativePhones.map(p => <ReferenceArea
                            key={uuid()}
                            fill={`url(#${p.speaker})`}
                            x1={p.xmin}
                            x2={p.xmax}
                            y1={1}
                            y2={1.25}
                            label={{value: p.text, fill: Theme.palette.primary.main}}
                            ifOverflow='extendDomain'
                        />)}
                        {nativePhones.map(p => <ReferenceLine
                            key={uuid()}
                            stroke={Theme.palette.accent.main}
                            strokeDasharray='3 6'
                            x={p.xmax}
                        />)}
                        {nativeProgress && <ReferenceLine
                            key={uuid()}
                            stroke={Theme.palette.accent.main}
                            strokeWidth={6}
                            strokeDasharray='3 6'
                            x={nativeProgress}
                            ifOverflow='extendDomain'
                        />}
                        {studentPhones.map(p => <ReferenceArea
                            key={uuid()}
                            fill={`url(#${p.speaker})`}
                            x1={p.xmin}
                            x2={p.xmax}
                            y1={1}
                            y2={1.25}
                            label={{value: p.text, fill: Theme.palette.primary.main}}
                            ifOverflow='extendDomain'
                        />)}
                        {studentPhones.map(p => <ReferenceLine
                            key={uuid()}
                            stroke={Theme.palette.error.main}
                            strokeDasharray='3 6'
                            x={p.xmax}
                        />)}
                        {studentProgress && <ReferenceLine
                            key={uuid()}
                            stroke={Theme.palette.error.main}
                            strokeWidth={6}
                            strokeDasharray='3 6'
                            x={studentProgress}
                            ifOverflow='extendDomain'
                        />}
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}