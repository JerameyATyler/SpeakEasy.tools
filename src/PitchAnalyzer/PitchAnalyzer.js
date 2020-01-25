import React, {useState} from 'react';

export default function(audioContext, source) {
    const [running, setRunning] = useState(false);
    const [f0, setF0] = useState([]);

    const analyzer = audioContext.createAnalyser();
    source.connect(analyzer);
    analyzer.fftSize = 2048;
    const bufferLength = analyzer.frequencyBinCount;
    const dataArray = new Float32Array(bufferLength);

    function analyzePitch(){
        analyzer.getFloatTimeDomainData(dataArray);
        console.log(dataArray);
    }

    if(running) analyzePitch();
    return {start:() => setRunning(true), stop:() => setRunning(false), f0:f0};
};
