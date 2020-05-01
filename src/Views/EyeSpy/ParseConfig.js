import {useEffect, useState} from "react";

export default (configs) => {
    const [parsed, setParsed] = useState(null);

    useEffect(() => {
        if(!configs) return;
        let cs = configs.map(c => {
            let newConfig = {...c};
            let gmap = {};
            if(c.gmap){
                gmap = {
                    center: {
                        lat: parseFloat(c.gmap.center.lat),
                        lng: parseFloat(c.gmap.center.lng)
                    },
                    zoom: parseInt(c.gmap.zoom),
                    markers: c.gmap.markers.map(m => {
                        return {
                            lat: parseFloat(m.lat),
                            lng: parseFloat(m.lng)
                        };
                    })
                };
            }
            newConfig = {...newConfig, gmap: gmap};

            let poi = {};
            if(c.poi){
                poi = c.poi.map(p => {
                    return {
                        ...p,
                        location: {
                            x:parseInt(p.location.x),
                            y:parseInt(p.location.y)
                        }
                    };
                });
            }
            newConfig = {...newConfig, poi: poi};

            let waypoint = {};
            if(c.waypoint){
                waypoint = c.waypoint.map(w => {
                    return {
                        ...w,
                        location: {
                            x: parseInt(w.location.x),
                            y: parseInt(w.location.y)
                        }
                    };
                });
            }
            newConfig = {...newConfig, waypoint: waypoint};

            let vocabulary = {};
            let inventory = [];
            if(c.vocabulary){
                vocabulary = c.vocabulary.map(v => {
                    if(Boolean(v.inventory)) {
                        inventory.push({text: v.inventory, complete: false});
                    }
                    return {
                        ...v,
                        location: {
                            x: parseInt(v.location.x),
                            y: parseInt(v.location.y)
                        }
                    };
                });
            }
            newConfig = {...newConfig, vocabulary: vocabulary, inventory: inventory};
            return newConfig;
        });
        setParsed(cs);
    }, [configs]);

    return parsed;
}