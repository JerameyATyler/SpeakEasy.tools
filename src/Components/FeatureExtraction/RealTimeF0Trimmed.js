import {useEffect, useState} from 'react';
import {MediaStream} from "../MediaStream";
import Meyda from 'meyda';
import PitchFinder from "pitchfinder";

export default () => {
    const [analyzer, setAnalyzer] = useState(null);
    const [running, setRunning] = useState(false);
    const [f0, setF0] = useState([]);
    const [buffer, setBuffer] = useState([]);
    const [onset, setOnset] = useState(null);
    const [offset, setOffset] = useState(null);

    useEffect(() => {
        const audioContext = new AudioContext();

        let newAnalyzer;

        MediaStream({audio: true, video: false}).then(stream => {
            if (audioContext.state === 'closed') {
                return;
            }

            const inputBufferSize = 4096;

            const source = audioContext.createMediaStreamSource(stream);

            const PitchDetector = new PitchFinder.YIN({sampleRate: audioContext.sampleRate});
            newAnalyzer = Meyda.createMeydaAnalyzer({
                bufferSize: inputBufferSize,
                audioContext: audioContext,
                source: source,
                featureExtractors: ['energy', 'buffer'],
                callback: features => {
                    const pitch = PitchDetector(new Float32Array(features.buffer));
                    setF0(prevState => {
                        if (features.energy >= 0.5) {
                            const index = prevState.length;
                            setOnset(prev => prev === null ? index : prev);
                            setOffset(index);
                        }
                        return [...prevState, pitch]
                    });

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
    }, []);

    useEffect(() => {
        if (analyzer) {
            if (running) {
                setF0([]);
                setOnset(null);
                setOffset(null);
                setBuffer([]);
                analyzer.start();
            } else {
                analyzer.stop();
            }
        } else {
            setRunning(false);
        }
    }, [running, analyzer]);
    return [running, setRunning, f0.slice(onset, offset), buffer];
};