import React from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Theme} from "../Components/Theme";
import IconButton from "@material-ui/core/IconButton";
import {RecordVoiceOverOutlined} from "@material-ui/icons";
import {Bar, BarChart, Line, LineChart, XAxis, YAxis} from "recharts";
import clsx from "clsx";
import {F0} from "../Components/FeatureExtraction";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    icon: {
        width: 50,
        height: 50,
        margin: theme.spacing(1),
        padding: theme.spacing(1),
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
    const [running, setRunning, f0] = F0();

    const toggleRunning = () => setRunning(prevState => !prevState);

    const formatData = d => {
        console.log(d);
        return [{name: 'f0', f0: d},];
    };

    return (
        <div className={clsx(classes.root)}>
            <IconButton
                onClick={toggleRunning}
                className={clsx(classes.icon, {
                    [classes.listening]: running,
                    [classes.notListening]: !running,
                })}
            >
                <RecordVoiceOverOutlined/>
            </IconButton>
            <LineChart
                width={600}
                height={200}
                data={f0? formatData(f0): []}
                >
                <YAxis type='number' domain={[17500, 20000]} stroke={Theme.palette.primary.contrastText}/>
                <XAxis dataKey='x' stroke={Theme.palette.primary.contrastText}/>
                <Line type='monotone' dataKey='f0' stroke={Theme.palette.primary.contrastText} strokeWidth={2}/>
            </LineChart>
        </div>
    )
}
