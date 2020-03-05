import {useEffect, useState} from "react";

export default (sample) => {
    const [wav, setWav] = useState(null);
    const [sampleRate, setSampleRate] = useState(null);
    const [ready, setReady] = useState(null);
    const [playing, setPlaying] = useState(false);
    const [started, setStarted] = useState(false);
    const [stopped, setStopped] = useState(null);

    const [audioContext, setAudioContext] = useState(null);
    const [source, setSource] = useState(null);

    const [progress, setProgress] = useState(null);

    const toggle = () => setPlaying(prevState => !prevState);

    useEffect(() => {
        if(!(sample && sample.wav && sample.sampleRate)) return;
        setWav(sample.wav);
        setSampleRate(sample.sampleRate);
    }, [sample]);

    useEffect(() => {
        if (wav && sampleRate) {
            setReady(false);
        }
    }, [wav, sampleRate]);

    useEffect(() => {
        if (!ready) {
            const context = new AudioContext();
            const audioSource = context.createBufferSource();
            setAudioContext(context);
            setSource(audioSource);
        }
    }, [ready]);

    useEffect(() => {
        if (audioContext && source && wav && sampleRate) {
            const buffer = audioContext.createBuffer(1, wav.length, sampleRate);
            const wavArray = new Float32Array(wav);

            buffer.copyToChannel(wavArray, 0, 0);
            source.buffer = buffer;

            source.connect(audioContext.destination);

            setReady(true);
        }
    }, [audioContext, source, wav, sampleRate]);

    useEffect(() => {
        if (ready && playing && audioContext && source) {
            source.onended = () => {
                return setStopped(true)
            };
            setStarted(true);
        } else if (ready && !playing && audioContext && source) {
            setStarted(false);
        }
    }, [ready, playing, audioContext, source]);

    useEffect(() => {
        if(started && source) {
            source.start(0);
        }
    }, [started, source]);

    useEffect(() => {
        if(stopped && source){
            source.stop(0);
            setPlaying(false);
            setStarted(false);
            setStopped(false);
            setReady(false);
        }
    }, [stopped, source]);

    return [ready, playing, toggle, progress];
};