import {useState} from "react";

export default ({wav, sampleRate}) => {
    const [playing, setPlaying] = useState(false);
    const [progress, setProgress] = useState(null);
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    if (!wav || wav.length <= 0 || !sampleRate) return [null, progress];
    const arrayBuffer = audioContext.createBuffer(1, wav.length, sampleRate);
    const wavArray = new Float32Array(wav);
    let raf;

    const handlePlay = () => {
        if (playing) return;
        const source = audioContext.createBufferSource();
        let startTime = audioContext.currentTime;
        setProgress(null);
        const getProgress = () => {
            setProgress(((audioContext.currentTime - startTime) * source.playbackRate.value) / (wav.length / sampleRate));
            raf = requestAnimationFrame(getProgress);
        };

        source.onended = () => {
            source.stop(0);
            setPlaying(false);
            cancelAnimationFrame(raf);
        };

        arrayBuffer.copyToChannel(wavArray, 0, 0);
        source.buffer = arrayBuffer;

        source.connect(audioContext.destination);
        setPlaying(true);
        source.start();
        raf = requestAnimationFrame(getProgress);
    };
    return [handlePlay, progress];
};