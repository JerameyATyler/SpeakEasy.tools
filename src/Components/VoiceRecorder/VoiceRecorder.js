import React, {useEffect, useState} from "react";
import {MediaStream} from "../MediaStream";

export default () => {
    const [analyzer, setAnalyzer] = useState(null);
    const [running, setRunning] = useState(false);
    const [buffer, setBuffer] = useState([]);
    const [sampleRate, setSampleRate] = useState(null);

    useEffect(() => {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        setSampleRate(audioContext.sampleRate);

        let newAnalyzer;
        MediaStream({audio: true, video: false}).then(stream => {
            if (audioContext.state === 'closed') return;
            const source = audioContext.createMediaStreamSource(stream);
            newAnalyzer = audioContext.createAnalyser();
            source.connect(newAnalyzer);
            newAnalyzer.fftSize = 4096;

            const bufferLength = newAnalyzer.frequencyBinCount;
            const dataArray = new Float32Array(bufferLength);

            let reqId;

            function record() {
                reqId = requestAnimationFrame(record);
                newAnalyzer.getFloatTimeDomainData(dataArray);
                setBuffer(prevState => [...prevState, ...dataArray])
            }

            record();

            newAnalyzer.start = () => {
                setBuffer([]);
                reqId = requestAnimationFrame(record);
            };

            newAnalyzer.stop = () => cancelAnimationFrame(reqId);

            setAnalyzer(newAnalyzer);
        });

        return () => {
            if (newAnalyzer) {
                newAnalyzer.stop();
            }
            if (audioContext) {
                audioContext.close();
            }
        }
    }, []);

    useEffect(() => {
        if (analyzer) {
            if (running) {
                analyzer.start();
            } else {
                analyzer.stop();
            }
        } else {
            setRunning(false);
        }
    }, [running, analyzer]);
    return [running, setRunning, buffer, sampleRate];
};