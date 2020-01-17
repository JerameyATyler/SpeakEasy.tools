import {ReactMic} from "@cleandersonlobo/react-mic";
import React, {useState} from "react";
import clsx from "clsx";
import {Theme} from "../Theme";
import {RecordVoiceOver, RecordVoiceOverOutlined} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    microphone: {
        height: 100,
        width: 150,
    }
}));

export default () => {
    const classes = useStyles(Theme);
    const [record, setRecord] = useState(false);

    const startRecording = () => setRecord(true);
    const stopRecording = () => setRecord(false);
    const onData = blob => console.log('Real-time data: ', blob);
    const onStop = blob => console.log('Recorded data is: ', blob);

    return (
        <div className={clsx(classes.root)}>
        <ReactMic
            record={record}
            className={clsx(classes.microphone)}
            onStop={onStop}
            onData={onData}
            strokeColor={Theme.palette.primary.contrastText}
            backgroundColor={Theme.palette.primary.main}/>
            <IconButton onClick={startRecording}>
                <RecordVoiceOver/>
            </IconButton>
            <IconButton onClick={stopRecording}>
                <RecordVoiceOverOutlined/>
            </IconButton>
        </div>
    )
}