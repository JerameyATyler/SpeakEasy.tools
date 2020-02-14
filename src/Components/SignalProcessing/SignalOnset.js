import React, {useState} from 'react';
import Meyda from "meyda";

export default ({signal, sampleRate}) => {
    const [onset, setOnset] = useState(0);
    const [offset, setOffset] = useState(0);

    const inputBufferSize = 512;
    if (!signal || signal.length < inputBufferSize) return [onset, offset];

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const arrayBuffer = audioContext.createBuffer(1, inputBufferSize, sampleRate);
    const wavArray = new Float32Array(signal);

    analyzer.start();
    for(let i = 0; i < signal.length; i += inputBufferSize) {
        arrayBuffer.copyToChannel(wavArray, 0, 0);
        source.buffer = arrayBuffer;
    }
    analyzer.stop();
    return [onset, offset]
}