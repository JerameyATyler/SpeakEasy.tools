import {useEffect, useState} from 'react';
import {MediaStream} from "../MediaStream";
import Meyda from 'meyda';
import PitchFinder from "pitchfinder";
import {MinMaxScale} from "../SignalProcessing";

export default ({scaleAxes = false}) => {
    const [analyzer, setAnalyzer] = useState(null);
    const [running, setRunning] = useState(false);
    const [f0, setF0] = useState([]);
    const [f0Return, setF0Return] = useState([]);
    const [t, setT] = useState(null);
    const [tReturn, setTReturn] = useState(null);
    const [buffer, setBuffer] = useState([]);
    const [bufferReturn, setBufferReturn] = useState([]);
    const [onset, setOnset] = useState(null);
    const [offset, setOffset] = useState(null);
    const [bufferSize, setBufferSize] = useState(null);
    const [sampleRate, setSampleRate] = useState(null);

    useEffect(() => {
        const audioContext = new AudioContext();
        const bufferSize = Math.pow(2, Math.ceil(Math.log2((2 / 85) * audioContext.sampleRate)));
        const bufferInSeconds = bufferSize / audioContext.sampleRate;

        let newAnalyzer;
        MediaStream({audio: true, video: false}).then(stream => {
            if (audioContext.state === 'closed') {
                return;
            }

            setBufferSize(bufferSize);
            setSampleRate(audioContext.sampleRate);

            const pitchDetector = new PitchFinder.YIN({sampleRate: audioContext.sampleRate});
            const source = audioContext.createMediaStreamSource(stream);
            let time = 0;
            newAnalyzer = Meyda.createMeydaAnalyzer({
                bufferSize: bufferSize,
                audioContext: audioContext,
                source: source,
                featureExtractors: ['energy', 'buffer'],
                callback: features => {
                    time += bufferInSeconds;
                    if(features.energy >= 0.8){
                        setOnset(prevState => prevState === null ? time: prevState);
                        setOffset(time);
                    }
                    const pitch = pitchDetector(features.buffer);
                    setF0(prevState => [...prevState, pitch]);
                    setBuffer(prevState => [...prevState, ...features.buffer]);
                },
            });
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
    });

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

    return [running, setRunning, f0Return, tReturn, bufferReturn, sampleRate];
};