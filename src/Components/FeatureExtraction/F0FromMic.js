import {Energy, F0FromBuffer} from "./index";

export default () => {
    const [running, setRunning, _, buffer, sampleRate] = Energy();
    const s = {buffer: buffer, sampleRate: sampleRate, scaleAxes: true, wav: buffer};
    const [f0, t] = F0FromBuffer(s);

    return [running, setRunning, buffer, sampleRate, f0, t];
}