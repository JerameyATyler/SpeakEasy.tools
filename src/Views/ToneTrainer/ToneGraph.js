import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Theme} from "../../utils";
import clsx from "clsx";
import {
    Area,
    AreaChart,
    Label,
    Legend,
    ReferenceArea,
    ReferenceLine,
    ResponsiveContainer,
    XAxis,
    YAxis
} from "recharts";
import {v4 as uuid} from 'uuid';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: '100%',
    },
    graph: {
        height: 800,
        width: '95%',
        backgroundColor: 'white'
    }
}));

export default ({nativeF0, studentF0, nativePhonemes, studentPhonemes, nativeProgress, studentProgress}) => {
    const classes = useStyles(Theme);
    const [data, setData] = useState(null);
    const [phonemes, setPhonemes] = useState(null);

    useEffect(() => {
        let d = [];
        if (nativeF0) d = d.concat(nativeF0);
        if (studentF0) d = d.concat(studentF0);

        setData(d);

    }, [nativeF0, studentF0]);

    useEffect(() => {
        let p = [];
        if (nativePhonemes) p = p.concat(nativePhonemes);
        if (studentPhonemes) p = p.concat(studentPhonemes);
        setPhonemes(p);
    }, [nativePhonemes, studentPhonemes]);

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.graph)} style={{backgroundColor: 'white'}}>
                <ResponsiveContainer>
                    <AreaChart
                        data={data}
                        margin={{top: 10, right: 0, left: 10, bottom: 10}}
                    >
                        <defs>
                            <linearGradient id='native' x1={0} y1={0} x2={0} y2={1}>
                                <stop offset='5%' stopColor={Theme.palette.secondary.main} stopOpacity={0.95}/>
                                <stop offset='100%' stopColor={Theme.palette.secondary.main} stopOpacity={0.05}/>
                            </linearGradient>
                            <linearGradient id='student' x1={0} y1={0} x2={0} y2={1}>
                                <stop offset='5%' stopColor={Theme.palette.error.main} stopOpacity={0.95}/>
                                <stop offset='100%' stopColor={Theme.palette.error.main} stopOpacity={0.05}/>
                            </linearGradient>
                        </defs>
                        <XAxis
                            type='number'
                            dataKey='t'
                            label={{value: 'Normalized Time', fill: Theme.palette.primary.contrastText, dy: 10}}
                        />
                        <YAxis
                            type='number'
                            domain={[0, 1.25]}
                        >
                            <Label
                                angle={-90}
                                value='Normalized Tone'
                                position='center'
                                style={{textAnchor: 'middle'}}
                                dx={-10}
                            />
                        </YAxis>
                        <Legend
                            align='right'
                            verticalAlign='top'
                            iconSize={24}
                            formatter={value => {
                                return (<span style={{color: Theme.palette.primary.main}}>{value}</span>)
                            }}
                        />
                        <Area
                            dataKey='native'
                            stroke={Theme.palette.secondary.main}
                            strokeDasharray='6 6'
                            fill='url(#native)'
                        />
                        {nativePhonemes && nativePhonemes.map(p => (
                            <ReferenceArea
                                key={uuid()}
                                fill={`url(#native)`}
                                x1={p.xmin}
                                x2={p.xmax}
                                y1={1.25}
                                y2={1.4}
                                label={{value: p.text, fill: Theme.palette.primary.contrastText}}
                                ifOverflow='extendDomain'
                                stroke={Theme.palette.secondary.main}
                                strokeDasharray='3 3'
                            />
                        ))}
                        <Area
                            dataKey='student'
                            stroke={Theme.palette.error.main}
                            strokeDasharray='6 6'
                            fill='url(#student)'
                        />
                        {studentPhonemes && studentPhonemes.map(p => (
                            <ReferenceArea
                                key={uuid()}
                                fill={`url(#student)`}
                                x1={p.xmin}
                                x2={p.xmax}
                                y1={1.1}
                                y2={1.25}
                                label={{value: p.text, fill: Theme.palette.primary.contrastText}}
                                ifOverflow='extendDomain'
                                stroke={Theme.palette.error.main}
                                strokeDasharray='3 3'
                            />
                        ))}


                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};