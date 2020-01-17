import {useEffect, useState} from 'react';
import {MediaStream} from "../MediaStream";
import Meyda from 'meyda';

export default () => {
    const [analyzer, setAnalyzer] = useState(null);
    const [running, setRunning] = useState(false);
    const [amplitude, setAmplitude] = useState([]);

    useEffect(() => {
        const audioContext = new AudioContext();

        let newAnalyzer;

        MediaStream({audio: true, video: false}).then(stream => {
            if (audioContext.state === 'closed') {
                return;
            }

            const source = audioContext.createMediaStreamSource(stream);
            newAnalyzer = Meyda.createMeydaAnalyzer({
                audioContext: audioContext,
                source: source,
                featureExtractors: ['amplitudeSpectrum'],
                callback: features => {
                    setAmplitude(prevState => [...prevState, features]);
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
    return [running, setRunning, amplitude];
};