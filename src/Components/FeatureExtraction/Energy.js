import GetMediaStream from "../MediaStream/GetMediaStream";
import Meyda from 'meyda';
import {useEffect, useState} from "react";

const streamConfig = {audio: true, video: false};

export default () => {
    const [stream, error] = GetMediaStream(streamConfig);
    const [recording, setRecording] = useState(null);
    const [analyzer, setAnalyzer] = useState(null);
    const [outputEnergy, setOutputEnergy] = useState(null);
    const [energy, setEnergy] = useState(null);
    const [outputBuffer, setOutputBuffer] = useState(null);
    const [buffer, setBuffer] = useState(null);
    const [sampleRate, setSampleRate] = useState(null);

    const toggle = () => setRecording(prevState => prevState === null ? true : !prevState);

    useEffect(() => {
        if(stream){
            const context = new AudioContext();
            const sr = context.sampleRate;
            const inputBufferSize = 512;

            let b = [];
            let e = [];
            const src = context.createMediaStreamSource(stream);
            const meydaAnalyzer = Meyda.createMeydaAnalyzer({
                bufferSize: inputBufferSize,
                audioContext: context,
                source: src,
                featureExtractors: ['energy', 'buffer'],
                callback: features => {
                    const ei = features.energy;
                    const bi = features.buffer;
                    e.push(ei);
                    b.push(bi);
                },
            });

            meydaAnalyzer.stop();
            setAnalyzer(meydaAnalyzer);
            setBuffer(b);
            setEnergy(e);
            setSampleRate(sr);
        }
    }, [stream]);

    const assignOutput = () => {
        if(recording === false) {
            setOutputBuffer(buffer);
            setOutputEnergy(energy);
        }
    };

    useEffect(() => {
        if(recording && stream && analyzer) {
            stream.getTracks().forEach(t => t.enabled = true);
            analyzer.start();
        } else if(recording === false && stream && analyzer) {
            analyzer.stop();
            stream.getTracks().forEach(t => t.enabled = false);
            assignOutput();
        }
    }, [recording, stream, analyzer, assignOutput]);

    return [recording, toggle, outputEnergy, outputBuffer, sampleRate];
};