import PitchFinder from "pitchfinder";
import {useEffect, useState} from "react";

export default (arrayBuffer, sampleRate) => {
    const [f0, setF0] = useState(null);

    useEffect(() => {
        if(!(arrayBuffer && sampleRate)) return;

        const detector = PitchFinder.YIN({sampleRate: sampleRate});
        const float32Array = new Float32Array(arrayBuffer);
        const bufferSize = 512;

        let p = [];

        for(let i = 0; i < float32Array.length; i += bufferSize){
            const fragment = float32Array.slice(i, Math.min(i + bufferSize, float32Array.length));
            const pitch = detector(fragment);
            p.push(pitch);
        }

        setF0(p);
    }, [arrayBuffer, sampleRate]);

    return f0;
};