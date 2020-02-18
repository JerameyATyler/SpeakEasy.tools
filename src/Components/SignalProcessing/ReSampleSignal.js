import {useState} from 'react';

export default ({targetRate, sourceRate, s}) => {
    if(targetRate === sourceRate || !targetRate || !sourceRate || !s || s.length < 2) return s;
    console.log(s);
    const audioContext = new AudioContext();
    const arrayBuffer = audioContext.createBuffer(1, s.length, sourceRate);
    const wavArray = new Float32Array(s);
    arrayBuffer.copyToChannel(wavArray, 0, 0);

    const offlineAudioContext = new OfflineAudioContext(arrayBuffer.numberOfChannels, arrayBuffer.duration * targetRate, targetRate);
    const cloneBuffer = offlineAudioContext.createBuffer(arrayBuffer.numberOfChannels, arrayBuffer.length, arrayBuffer.sampleRate);

    cloneBuffer.copyToChannel(arrayBuffer.getChannelData(0), 0);

    const source = offlineAudioContext.createBufferSource();
    source.buffer = cloneBuffer;
    source.connect(offlineAudioContext.destination);

    const [reSampledBuffer, setReSampledBuffer] = useState(null);
    offlineAudioContext.oncomplete = e => {
        setReSampledBuffer(e.renderedBuffer.getChannelData(0));
    };
    source.onended = () => {
        source.stop(0);
    };

    offlineAudioContext.startRendering();
    source.start(0);

    return reSampledBuffer;
};