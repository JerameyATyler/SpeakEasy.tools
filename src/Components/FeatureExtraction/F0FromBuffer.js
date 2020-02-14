import PitchFinder from "pitchfinder";

export default ({buffer, sampleRate}) => {
    const f0 = [];
    const t = [];
    const wavArray = new Float32Array(buffer);
    const pitchDetector = new PitchFinder.YIN({sampleRate:sampleRate});
    const pitchBufferSize = Math.ceil((2/85) * sampleRate); // Need 2 periods with lowest speech at 85Hz = 1055 buffer size

    for(let i = 0; i < wavArray.length; i += pitchBufferSize){
        const pitch = pitchDetector(wavArray.slice(i, i + pitchBufferSize));
        f0.push(pitch);
        t.push(i / sampleRate);
    }
    return [f0, t];
};