import {useEffect, useState} from "react";

// Energy tolerance is a heuristic to find the onset and offset of the signal
export default ({buffer, energy, energyThreshold}) => {
    const [outputBuffer, setOutputBuffer] = useState(null);

    useEffect(() => {
        if (buffer && energy && energyThreshold) {

            const hiPassed = energy.flatMap((e, index) => e > energyThreshold ? index : []);
            const hiMin = Math.min(...hiPassed);
            const hiMax = Math.max(...hiPassed);
            setOutputBuffer(buffer.slice(hiMin, hiMax).flat());
        }
    }, [buffer, energy, energyThreshold]);
    return outputBuffer;
};