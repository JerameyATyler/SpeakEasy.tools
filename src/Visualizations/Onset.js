import React from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Theme} from "../Components/Theme";
import IconButton from "@material-ui/core/IconButton";
import {RecordVoiceOverOutlined} from "@material-ui/icons";
import {Area, AreaChart, CartesianGrid, Label, ReferenceLine, XAxis, YAxis} from "recharts";
import clsx from "clsx";
import {Energy} from "../Components/FeatureExtraction";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.palette.primary.main,
        padding: theme.spacing(3),
    },
    icon: {
        width: 50,
        height: 50,
        margin: theme.spacing(1),
        padding: theme.spacing(1),
    },
    display: {
        display: 'flex',
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

export default () => {
    const classes = useStyles(Theme);
    const [running, setRunning, energy] = Energy();

    const toggleRunning = () => setRunning(prevState => !prevState);

    const formatData = d => {
        const d_filtered = d.energy > 0.1 ? Math.round((d.energy + Number.EPSILON) * 100) / 100 : 0;
        return {name: 'energy', energy: d_filtered, t: Math.round((d.t + Number.EPSILON) * 100) / 100};
    };

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.display)}>
                <IconButton
                    onClick={toggleRunning}
                    className={clsx(classes.icon, {
                        [classes.listening]: running,
                        [classes.notListening]: !running,
                    })}
                >
                    <RecordVoiceOverOutlined/>
                </IconButton>
                <AreaChart
                    width={730}
                    height={250}
                    margin={{top: 15, right: 30, left: 20, bottom: 5}}
                    data={energy ? energy.map(e => formatData(e)) : [formatData({energy: 0, t: 0})]}
                >
                    <defs>
                        <linearGradient id='energy' x1='0' y1='0' x2='0' y2='1'>
                            <stop offset='5%' stopColor={Theme.palette.secondary.contrastText} stopOpacity={0.8}/>
                            <stop offset='95%' stopColor={Theme.palette.secondary.contrastText} stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray='3 3' stroke={Theme.palette.secondary.contrastText}/>
                    <XAxis
                        type='number'
                        dataKey='t'
                        stroke={Theme.palette.primary.contrastText}
                        domain={['dataMin', 'dataMax']}
                    >
                        <Label
                            value="Time (s)"
                            offset={0}
                            position="insideBottom"
                            fill={Theme.palette.primary.contrastText}/>
                    </XAxis>
                    <YAxis
                        type='number'
                        dataKey='energy'
                        stroke={Theme.palette.primary.contrastText}
                    >
                        <Label
                            value='Energy'
                            offset={-20}
                            position='insideLeft'
                            fill={Theme.palette.primary.contrastText}/>
                    </YAxis>
                    <Area
                        dataKey='energy'
                        type='monotone'
                        stroke={Theme.palette.primary.contrastText}
                        fillOpacity={1}
                        fill='url(#energy)'
                    />
                    {energy && energy.map(e => {
                        const formatted = formatData(e);
                        if (formatted.energy > 0) {
                            return <ReferenceLine
                                key={formatted.t}
                                x={formatted.t}
                                stroke={Theme.palette.primary.contrastText}
                                strokeDasharray='3 6'
                            />
                        }
                        return <></>;
                    })}
                </AreaChart>
            </div>
        </div>
    )
}
