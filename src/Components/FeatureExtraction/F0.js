import {useEffect, useState} from 'react';
import {MediaStream} from "../MediaStream";
import PitchFinder from "pitchfinder";

export default () => {
    const [analyser, setAnalyser] = useState(null);
    const [running, setRunning] = useState(false);
    const [f0, setF0] = useState([]);
    const [buffer, setBuffer] = useState([]);
    const [sampleRate, setSampleRate] = useState(null);

    useEffect(() => {
        const audioContext = new AudioContext();
        setSampleRate(audioContext.sampleRate);

        let newAnalyser;
        MediaStream({audio: true, video: false}).then(stream => {
            if (audioContext.state === 'closed') return;
            const source = audioContext.createMediaStreamSource(stream);

            newAnalyser = audioContext.createAnalyser();
            source.connect(newAnalyser);
            newAnalyser.fftSize = 4096;

            const bufferLength = newAnalyser.frequencyBinCount;
            const dataArray = new Float32Array(bufferLength);

            const outputBufferSize = 2 * Math.ceil(audioContext.sampleRate / bufferLength);
            const bufferInSeconds = 1 / Math.ceil(audioContext.sampleRate / bufferLength);

            let reqId;
            const PitchDetector = new PitchFinder.YIN({sampleRate: audioContext.sampleRate});
            function analyse() {
                reqId = requestAnimationFrame(analyse);

                newAnalyser.getFloatTimeDomainData(dataArray);
                let pitch = PitchDetector(dataArray);

                setF0(prevState => {
                    const newState = {
                        f0: pitch,
                        t: prevState.length > 0 ? prevState[prevState.length - 1].t + bufferInSeconds : 0
                    };
                    return [...prevState, newState]
                        .slice(Math.max(prevState.length - outputBufferSize, 0))
                });

                setBuffer(prevState => [...prevState, ...dataArray]
                    .slice(Math.max(prevState.length - (2 * audioContext.sampleRate), 0))
                );
            }

            analyse();

            newAnalyser.start = () => {
                setF0([]);
                reqId = requestAnimationFrame(analyse)
            };

            newAnalyser.stop = () => cancelAnimationFrame(reqId);

            setAnalyser(newAnalyser);
        });

        return () => {
            if (newAnalyser) {
                newAnalyser.stop();
            }
            if (audioContext) {
                audioContext.close();
            }
        }
    }, []);

    useEffect(() => {
        if (analyser) {
            if (running) {
                analyser.start();
            } else {
                analyser.stop();
            }
        } else {
            setRunning(false);
        }
    }, [running, analyser]);
    return [running, setRunning, f0, buffer, sampleRate];
};