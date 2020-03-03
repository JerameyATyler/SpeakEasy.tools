import {useEffect, useState} from "react";
import {MediaStream} from "../MediaStream";

const streamConfig = {audio: true, video: false};

export default () => {
    const [stream, error] = MediaStream(streamConfig);

    const [recording, setRecording] = useState(null);
    const toggle = () => setRecording(prevState => !prevState);

    const [recorder, setRecorder] = useState(null);

    const [blob, setBlob] = useState(null);

    useEffect(() => {
        if (!stream) return;
        let chunks = [];

        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.onstop = e => {

            const b = new Blob ([...chunks], {type: 'audio/ogg; codecs=opus'});

            setBlob(b);

            chunks = [];
        };

        mediaRecorder.ondataavailable = e => {
            chunks.push(e.data);
        };

        setRecorder(mediaRecorder);
    }, [stream]);

    useEffect(() => {
        if (recording === null || recorder === null) return;
        if (recorder && recording) {
            recorder.start();
        } else if (recorder && !recording) {
            recorder.stop();
        }
    }, [recording, recorder]);

    return [recording, toggle, blob];
};