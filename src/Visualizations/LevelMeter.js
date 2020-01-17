import React from 'react';
import {FeatureExtraction} from "../Components/FeatureExtraction";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Theme} from "../Components/Theme";
import IconButton from "@material-ui/core/IconButton";
import {RecordVoiceOverOutlined} from "@material-ui/icons";
import {Bar, BarChart, YAxis} from "recharts";
import clsx from "clsx";

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
    const [running, setRunning, features] = FeatureExtraction();

    const toggleRunning = () => setRunning(prevState => !prevState);

    const formatData = d => {
        return [{name: 'Level', rms: d},];
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
            <BarChart
                width={150}
                height={200}
                data={features && features.rms? formatData(features.rms): []}
            >
                <YAxis type='number' domain={[0.0, 1.0]} stroke={Theme.palette.primary.contrastText}/>
                <Bar dataKey='rms' fill={Theme.palette.secondary.main}/>
            </BarChart>
        </div>
    )
}
