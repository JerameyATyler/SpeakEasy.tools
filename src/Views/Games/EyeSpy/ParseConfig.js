import {useEffect, useState} from "react";

export default (configs) => {
    const [parsed, setParsed] = useState(null);

    useEffect(() => {
        if (!configs) return;
        let cs = configs.map(c => {
            if (!('config' in c)) return;
            let newConfig = JSON.parse(c['config']);
            delete c['config'];

            let gmap = {};
            if ('gmap' in newConfig) {
                gmap = {
                    center: {
                        lat: parseFloat(newConfig['gmap']['center']['lat']),
                        lng: parseFloat(newConfig['gmap']['center']['lng'])
                    },
                    zoom: parseInt(newConfig['gmap']['zoom']),
                    // markers: newConfig['gmap']['markers'].map(m => {
                    //     return {
                    //         lat: parseFloat(m.lat),
                    //         lng: parseFloat(m.lng)
                    //     };
                    // })
                };
            }
            delete newConfig['gmap'];

            let pois = [];
            if ('pois' in newConfig) {
                pois = newConfig['pois'].map(p => {
                    return {
                        ...p,
                        heading: parseInt(p.x),
                        pitch: parseInt(p.y)
                    };
                });
            }
            delete newConfig['pois'];

            let narrative = [];
            if ('narrative' in newConfig) {
                narrative = newConfig['narrative'];
            }
            delete newConfig['narrative'];

            let files = [];
            if ('files' in newConfig) {
                files = newConfig['files'];
            }
            delete newConfig['files'];

            return({...c, ...newConfig, gmap: gmap, files: files, pois: pois, narrative: narrative});
        });
        setParsed(cs);
    }, [configs]);

    return parsed;
}