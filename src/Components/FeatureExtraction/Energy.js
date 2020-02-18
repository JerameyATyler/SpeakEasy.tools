import {useEffect, useState} from 'react';
import {MediaStream} from "../MediaStream";
import Meyda from 'meyda';

export default () => {
    const [analyzer, setAnalyzer] = useState(null);
    const [running, setRunning] = useState(false);
    const [energy, setEnergy] = useState([]);
    const [buffer, setBuffer] = useState([]);
    const [bufferSize, setBufferSize] = useState(null);
    const [sampleRate, setSampleRate] = useState(null);
    const [onset, setOnset] = useState(null);
    const [offset, setOffset] = useState(null);
    const [returnBuffer, setReturnBuffer] = useState([]);
    const [returnEnergy, setReturnEnergy] = useState([]);

    useEffect(() => {
        const audioContext = new AudioContext();

        let newAnalyzer;
        MediaStream({audio: true, video: false}).then(stream => {
            if (audioContext.state === 'closed') {
                return;
            }
            const inputBufferSize = Math.pow(2, Math.ceil(Math.log2((2 / 85) * audioContext.sampleRate)));
            const bufferInSeconds = inputBufferSize / audioContext.sampleRate;

            setBufferSize(inputBufferSize);
            setSampleRate(audioContext.sampleRate);
            let time = 0;
            const source = audioContext.createMediaStreamSource(stream);
            newAnalyzer = Meyda.createMeydaAnalyzer({
                bufferSize: inputBufferSize,
                audioContext: audioContext,
                source: source,
                featureExtractors: ['energy', 'buffer'],
                callback: features => {
                    time += bufferInSeconds;
                    if (features.energy >= 0.5) {
                        setOnset(prevState => prevState === null ? time : prevState);
                        setOffset(time);
                        setEnergy(prevState => [...prevState, features.energy]);
                    } else {
                        setEnergy(prevState => [...prevState, 0]);
                    }
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
                if (!running && buffer.length > 1) {
                    setReturnBuffer(buffer.slice(
                        Math.floor(onset * sampleRate) - bufferSize,
                        Math.ceil(offset * sampleRate) + bufferSize));
                    setReturnEnergy(energy.slice(Math.floor(onset * (sampleRate / bufferSize)) - 1, Math.ceil(offset * (sampleRate / bufferSize)) + 1));
                }
            }
        } else {
            setRunning(false);
        }
    }, [running, analyzer]);
    return [
        running,
        setRunning,
        returnEnergy,
        returnBuffer,
        sampleRate
    ];
};