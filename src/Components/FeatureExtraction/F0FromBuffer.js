import PitchFinder from "pitchfinder";
import {MinMaxScale} from "../SignalProcessing";

export default ({buffer, sampleRate, scaleAxes = false}) => {
    const f0 = [];
    const t = [];

    const wavArray = new Float32Array(buffer);
    const bufferSize = Math.pow(2, Math.ceil(Math.log2((2 / 85) * sampleRate)));
    const bufferInSeconds = bufferSize / sampleRate;

    const pitchDetector = new PitchFinder.YIN({sampleRate: sampleRate});
    for (let i = 0; i < wavArray.length; i += bufferSize) {
        const pitch = pitchDetector(wavArray.slice(i, i + bufferSize));
        f0.push(pitch);
        t.push(t.length > 0 ? t[t.length - 1] + bufferInSeconds : bufferInSeconds);
    }

    const fragmentLength = wavArray.length % bufferSize;
    const pitch = pitchDetector(wavArray.slice(wavArray.length - fragmentLength));
    f0.push(pitch);
    t.push(t[t.length - 1] + (fragmentLength / sampleRate));

    if (scaleAxes) return [MinMaxScale({s: f0}), MinMaxScale({s: t})];
    return [f0, t];
};