/* globals Meyda */

const K = 0.65

function autoCorrelation(array) {
    let autoCorrelation = [];
    for (let lag = 0; lag < array.length; lag++) {
        let value = 0;
        for (let index = 0; index < array.length; index++) {
            value += array[index] * (array[index - lag] || 0)
        }
        autoCorrelation.push(value);
    }
    return autoCorrelation;
}

function extractAutoCorrelation(signal) {
    const ac = autoCorrelation(signal);
    console.log(ac);
}

let sampleBinIndices = []

function extractF0(amplitudeSpectrum) {
    let significantIndices = [];
    for (let index = 0; index < amplitudeSpectrum.length; index++) {
        if (amplitudeSpectrum[index] > K) {
            significantIndices.push(index);
        }
    }
    significantIndices.length > 5 && sampleBinIndices.push(significantIndices);
};

function handleUserMediaAccept(userMedia) {
    const audioContext = new AudioContext();
    let mic = audioContext.createMediaStreamSource(userMedia);
    mic.connect(audioContext.destination);
    let meyda = Meyda.createMeydaAnalyzer({
        audioContext,
        source: mic,
        // bufferSize: 2048,
        featureExtractors: ["amplitudeSpectrum", "buffer"],
        callback: ({amplitudeSpectrum, buffer}) => {
            extractAutoCorrelation(buffer);
            extractF0(amplitudeSpectrum);
        }
    });
    meyda.start();
}

if (navigator.mediaDevices) {
    navigator.mediaDevices.enumerateDevices().then(devices => {
        const device = devices
            .filter(({kind}) => kind === "audioinput")
            .filter(({label}) => label === "Scarlett 2i2 USB")[0];
        navigator.mediaDevices.getUserMedia({
            audio: {
                deviceId: {
                    exact: device.deviceId
                }
            }
        })
            .catch(console.error)
            .then(handleUserMediaAccept);
    });
}