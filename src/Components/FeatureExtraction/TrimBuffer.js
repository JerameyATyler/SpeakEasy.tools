import {useEffect, useState} from "react";

// Energy tolerance is a heuristic to find the onset and offset of the signal
export default ({wav, energy, energyThreshold}) => {
    const [outputWav, setOutputWav] = useState(null);

    useEffect(() => {
        if (wav && energy && energyThreshold) {
            const bufferSize = Math.floor(wav.length / energy.length);
            const hiPassed = energy.flatMap((e, index) => e > energyThreshold ? index : []);
            const hiMin = Math.min(...hiPassed);
            const hiMax = Math.max(...hiPassed);
            setOutputWav(
                wav.slice(
                    Math.max(hiMin - 1, 0) * bufferSize,
                    Math.min(hiMax + 1, energy.length - 1) * bufferSize
                ));
        }
    }, [wav, energy, energyThreshold]);

    return outputWav;
};