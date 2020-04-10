import Meyda from 'meyda';
import {useEffect, useState} from "react";

export default (sample, targetFeature, bufferSize=null) => {
    const [wav, setWav] = useState(null);
    const [sampleRate, setSampleRate] = useState(null);

    const [feature, setFeature] = useState(null);
    const [outputFeature, setOutputFeature] = useState(null);

    const [completed, setCompleted] = useState(null);

    const [analyzer, setAnalyzer] = useState(null);
    const [audioContext, setAudioContext] = useState(null);
    const [audioSource, setAudioSource] = useState(null);

    useEffect(() => {
        if(!(sample && sample.wav && sample.sampleRate)) return;
        setWav(sample.wav);
        setSampleRate(sample.sampleRate);
    }, [sample]);

    useEffect(() => {
        if(!(wav && sampleRate)) return;
        const context = new OfflineAudioContext({
            numberOfChannels: 1,
            length: wav.length,
            sampleRate: sampleRate,
        });
        const source = context.createBufferSource();

        const buffer = context.createBuffer(1, wav.length, sampleRate);
        const wavArray = new Float32Array(wav);

        buffer.copyToChannel(wavArray, 0, 0);
        source.buffer = buffer;
        source.connect(context.destination);

        let f = [];
        let analyzerConfig = {
            audioContext: context,
            source: source,
            featureExtractors: [targetFeature],
            callback: features => {
                f.push(features[targetFeature]);
            }
        };
        if(bufferSize) analyzerConfig.bufferSize = bufferSize;

        const meydaAnalyzer = Meyda.createMeydaAnalyzer(analyzerConfig);

        setAudioContext(context);
        setAudioSource(source);
        setAnalyzer(meydaAnalyzer);
        setFeature(f);
    }, [wav, sampleRate, targetFeature, bufferSize]);

    useEffect(() => {
        if(!(audioContext && audioSource && analyzer)) return;
        audioSource.onended = () => setCompleted(true);
        audioContext.startRendering();
        analyzer.start();
        audioSource.start(0);
    }, [audioContext, audioSource, analyzer]);

    useEffect(() => {
        if(!(completed && feature)) return;
        setOutputFeature(feature);
    }, [completed, feature]);

    return outputFeature;
};