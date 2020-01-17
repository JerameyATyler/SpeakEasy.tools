import {useEffect, useState} from 'react';
import {MediaStream} from "../MediaStream";
import PitchFinder from 'pitchfinder';

export default () => {
    const [running, setRunning] = useState(false);
    const [f0, setF0] = useState([]);

    useEffect(() => {
        const audioContext = new AudioContext();

        MediaStream({audio: true, video: false}).then(stream => {
            if (audioContext.state === 'closed') {
                return;
            }
            const source = audioContext.createMediaStreamSource(stream);
            console.log(source.mediaStream.getTracks()[0])
        });
    }, []);

    return [running, setRunning, f0];
};