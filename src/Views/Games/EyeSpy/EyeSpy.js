import React, {useEffect, useRef, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Theme} from "../../../utils";
import clsx from "clsx";
import {Card, GoogleMap, ViewWrapper} from "../../../Components";
import Settings from './Settings';
import Instructions from './Instructions';
import {v4 as uuid} from 'uuid';

import povToPixel from '../../../utils/povToPixel';
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexFlow: "column noWrap",
        overflow: "auto",
    },
    column: {
        display: "flex",
        flexFlow: "column noWrap",
        alignItems: "center",
    },
    row: {
        display: "flex",
        flexFlow: "row noWrap",
        alignItems: "center",
    },
    rowLeft: {
        display: "flex",
        flexFlow: "row noWrap",
        alignItems: "center",
    },
    rowCenter: {
        display: "flex",
        flexFlow: "row noWrap",
        alignItems: "center",
        justifyContent: "center",
    },
    pad: {
        padding: theme.spacing(1),
    },
    formControl: {
        margin: theme.spacing(1),
        padding: theme.spacing(1),
        minWidth: 200,
        backgroundColor: theme.palette.primary.light,
    },
    content: {
        flex: "1 1 100%",
    },
    map: {
        flex: "1 1 100%",
        position: "relative",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        padding: theme.spacing(1),
    },
    svCard: {
        maxWidth: 300,
        zIndex: 101,
        position: "absolute",
    },
}));

export default () => {
    document.title = 'Eye-Spy';
    const classes = useStyles(Theme);

    /* Reference to the div to place Dynamic Street View */
    const panoContainer = useRef();

    /* Variables from Settings Gear */
    const [language, setLanguage] = useState(null);
    const [mode, setMode] = useState(null);
    const [config, setConfig] = useState(null);

    /* Variables from inside config */
    const [panoramaPath, setPanoramaPath] = useState(null);
    const [panorama, setPanorama] = useState(null);
    const [gmap, setGmap] = useState(null);
    const [pois, setPois] = useState(null);
    const [waypoint, setWaypoint] = useState(null);
    const [vocabulary, setVocabulary] = useState(null);
    const [inventory, setInventory] = useState(null);

    /* Variable to keep track of current Point-of-View in Street View */
    const [svPov, setSvPov] = useState(null);


    const getSettings = () => (
        <Settings
            language={language}
            setLanguage={setLanguage}
            mode={mode}
            setMode={setMode}
            config={config}
            setConfig={setConfig}
        />
    );
    const getInstructions = () => (
        <Instructions/>
    );
    const getScore = () => {

    };

    /* Set state variables from config values */
    useEffect(() => {
        if (!config) return;
        setPanoramaPath(config['files'][0]);
        setGmap(config.gmap);
        setPois(config.poi);
        //setWaypoint(config.waypoint);
        //setVocabulary(config.vocabulary);
        //setInventory(config.inventory);
    }, [config]);

    return (
        <div
            className={clsx(classes.root)}
        >
            <div className={clsx(classes.row)}>
                <ViewWrapper
                    settings={getSettings}
                    instructions={getInstructions}
                    score={getScore}
                />
            </div>
            <div
                className={clsx(classes.content)}
            >
                <div
                    ref={panoContainer}
                    style={{
                        position: 'relative',
                        zIndex: 0,
                        left: 0,
                        top: 0,
                        width: '100%',
                        height: '100%',
                    }}/>

                {/* Add Vocabulary words */}
                {vocabulary && vocabulary.map(v => (
                    <div
                        key={uuid()}
                        className={clsx(classes.svCard)}
                        id={v.word}
                        style={povToPixel(
                            {heading: 0, pitch: 0},// this should be {location.heading, location.pitch} from config
                            // TO-DO: POI pos. var needs updating to reflect new heading and pitch vars
                            svPov || {heading: 0, pitch: 0},
                            panoContainer.current
                        )}
                    >
                        <Card
                            darkMode
                            title={() => (
                                <div className={clsx(classes.rowCenter)}>
                                    <div>
                                        <Typography variant='h6'>{v.word}</Typography>
                                    </div>
                                </div>
                            )}
                            body={() => (
                                <div className={clsx(classes.rowCenter)}>
                                    <div className={clsx(classes.pad)}>
                                        <Typography variant='h6'>{v.pinyin}</Typography>
                                    </div>
                                </div>
                            )}
                        />
                    </div>
                ))}

                {/* Add Points of Interest */}
                {pois && pois.map(v => (
                    <div
                        key={uuid()}
                        className={clsx(classes.svCard)}
                        style={povToPixel(
                            {heading: 312, pitch: 5},// this should be {location.heading, location.pitch} from config
                            // TO-DO: POI pos. var needs updating to reflect new heading and pitch vars
                            svPov || {heading: 0, pitch: 0},
                            panoContainer.current
                        )}
                    >
                        <Card
                            title={() => (
                                <div className={clsx(classes.rowCenter)}>
                                    <div className={clsx(classes.pad)}>
                                        <Typography variant='h6'>{v.title}</Typography>
                                    </div>
                                </div>
                            )}
                            body={() => (
                                <div className={clsx(classes.rowCenter)}>
                                    <div className={clsx(classes.pad)}>
                                        <Typography variant='h6'>{v.body}</Typography>
                                    </div>
                                </div>
                            )}
                        />
                    </div>
                ))}

                {/* Add Google Map */}
                {gmap && (
                    <div
                        className={clsx(classes.pad)}
                        style={{maxWidth: 350, display: 'flex', justifyItems: 'center'}}
                    >
                        <Card
                            title={() => ''}
                            body={() => (
                                <div className={clsx(classes.map)}>
                                    <GoogleMap
                                        panoContainer={panoContainer.current}
                                        markers={gmap.markers}
                                        zoom={gmap.zoom}
                                        mapLat={gmap.center.lat}
                                        mapLng={gmap.center.lng}
                                        svLat={gmap.svlat || 31.208505}
                                        svLng={gmap.svlng || 121.468125}
                                        heading={gmap.heading || 0}
                                        pitch={gmap.pitch || 0}
                                        setSvPovOut={setSvPov}
                                    />
                                </div>
                            )}
                            darkMode
                            stayOpen
                        />
                    </div>
                )}
            </div>
        </div>
    )
}