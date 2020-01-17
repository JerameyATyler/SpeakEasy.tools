import {useEffect, useState} from 'react';
import {MediaStream} from "../MediaStream";
import Meyda from 'meyda';
import * as PitchFinder from "pitchfinder";

export default () => {
    const [analyzer, setAnalyzer] = useState(null);
    const [running, setRunning] = useState(false);
    const [features, setFeatures] = useState();
    const [f0, setF0] = useState([]);

    useEffect(() => {
        const audioContext = new AudioContext();

        let newAnalyzer;

        MediaStream({audio: true, video: false}).then(stream => {
            if (audioContext.state === 'closed') {
                return;
            }

            const source = audioContext.createMediaStreamSource(stream);
            const detectPitch = PitchFinder.YIN({sampleRate: AudioContext.sampleRate});
            newAnalyzer = Meyda.createMeydaAnalyzer({
                audioContext: audioContext,
                source: source,
                bufferSize: 1024,
                featureExtractors: ['buffer'],
                callback: newFeatures => {
                    const pitch = detectPitch(newFeatures.buffer);
                    setF0(prevState => [...prevState, pitch]);
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
    return [running, setRunning, features, f0];
};