import {useEffect, useState} from "react";

export default (streamConfig) => {
    const [stream, setStream] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        navigator.mediaDevices.getUserMedia(streamConfig)
            .then(function (mediaStream) {
                //mediaStream.getTracks().forEach(t => t.enabled = false);
                setStream(mediaStream);
            })
            .catch(function (err) {
                setError(err);
            })
    }, [streamConfig]);

    return [stream, error];
};