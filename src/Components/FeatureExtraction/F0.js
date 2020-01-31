import {useEffect, useState} from 'react';
import {MediaStream} from "../MediaStream";
import PitchFinder from "pitchfinder";

export default () => {
    const [analyser, setAnalyser] = useState(null);
    const [running, setRunning] = useState(false);
    const [f0, setF0] = useState([]);

    useEffect(() => {
        const audioContext = new AudioContext();

        let newAnalyser;
        MediaStream({audio: true, video: false}).then(stream => {
            if (audioContext.state === 'closed') return;

            const source = audioContext.createMediaStreamSource(stream);

            newAnalyser = audioContext.createAnalyser();
            source.connect(newAnalyser);
            newAnalyser.fftSize = 4096;

            const bufferLength = newAnalyser.frequencyBinCount;
            const dataArray = new Float32Array(bufferLength);

            let reqId;
            function analyse(){
                    reqId = requestAnimationFrame(analyse);
                    const PitchDetector = new PitchFinder.YIN({sampleRate: audioContext.sampleRate});
                    newAnalyser.getFloatTimeDomainData(dataArray);
                    const pitch =  Math.round((PitchDetector(dataArray) + Number.EPSILON) * 100) / 10000;
                    setF0(prevState => {
                            return [...prevState, pitch]

                    });

            }
            analyse();

            newAnalyser.start = () => {
                setF0([]);
                reqId = requestAnimationFrame(analyse)};

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
    return [running, setRunning, f0];
};