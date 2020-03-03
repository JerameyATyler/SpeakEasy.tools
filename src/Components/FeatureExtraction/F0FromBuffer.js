import PitchFinder from "pitchfinder";
import {useEffect, useState} from "react";

export default (buffer) => {
    const [f0, setF0] = useState(null);

    useEffect(() => {
        if(!buffer) return;

        const detectors = [
            PitchFinder.YIN({sampleRate: buffer.sampleRate}),
            //PitchFinder.AMDF({sampleRate: buffer.sampleRate}),
            //PitchFinder.DynamicWavelet({sampleRate: buffer.sampleRate})
        ];
        const context = new AudioContext();
        buffer.arrayBuffer()
            .then(b => context.decodeAudioData(b)
                .then(decoded => {
                    const float32Array = decoded.getChannelData(0);
                    const frequencies = PitchFinder.frequencies(detectors, float32Array);
                    setF0(frequencies);
                }));
    }, [buffer]);
    return f0;
};