import {useEffect, useState} from 'react';
import {MediaStream} from "../MediaStream";
import Meyda from 'meyda';

export default () => {
    const [analyzer, setAnalyzer] = useState(null);
    const [running, setRunning] = useState(false);
    const [energy, setEnergy] = useState([]);

    useEffect(() => {
        const audioContext = new AudioContext();

        let newAnalyzer;

        MediaStream({audio: true, video: false}).then(stream => {
            if (audioContext.state === 'closed') {
                return;
            }

            const inputBufferSize = 1024;
            const outputBufferSize = 2 * Math.ceil(audioContext.sampleRate / inputBufferSize); // Heuristically set to 2 seconds
            const bufferInSeconds = 1 / Math.ceil(audioContext.sampleRate / inputBufferSize);

            const source = audioContext.createMediaStreamSource(stream);

            newAnalyzer = Meyda.createMeydaAnalyzer({
                bufferSize: inputBufferSize,
                audioContext: audioContext,
                source: source,
                featureExtractors: ['energy'],
                callback: features => {
                    setEnergy(prevState => {
                        const newState = {
                            energy: features.energy,
                            t: prevState.length > 0? prevState[prevState.length - 1].t + bufferInSeconds: 0
                        };
                        return [...prevState, newState]
                            .slice(Math.max(prevState.length - outputBufferSize, 0))});
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
    return [running, setRunning, energy];
};