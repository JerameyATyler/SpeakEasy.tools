import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Theme} from "../../../utils";
import clsx from "clsx";
import {ViewWrapper} from "../../../Components/ViewWrapper";
import Settings from "./Settings";
import Instructions from "./Instructions";
import {GetRandomLessons} from "../../../Queries";
import Board from "./Board";

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
        display: 'flex',
        flexFlow: 'row wrap',
    },
    row: {
        flex: '1 1 100%'
    },
    column: {},
    content: {},
    pad: {
        margin: theme.spacing(1),
        flex: '1 1 100px',
    },
}));

export default () => {
    document.title = 'Memory';
    const classes = useStyles(Theme);

    const [language, setLanguage] = useState(null);
    const [boardSize, setBoardSize] = useState(null);

    const settings = Settings(language, setLanguage, boardSize, setBoardSize);
    const instructions = Instructions();
    const [score, setScore] = useState(0);
    const [time, setTime] = useState(null);

    const getSettings = () => {
        return settings;
    };
    const getInstructions = () => {
        return instructions;
    };
    const getScore = () => {
        return score;
    };
    const getTime = () => {
        return time;
    };

    const [tileCount, setTileCount] = useState(null);
    const [lessons, ] = GetRandomLessons(tileCount);
    const [tiles, setTiles] = useState(null);

    useEffect(() => {
        if (!lessons) return;
        setTiles(lessons.map(l => l.lesson))
    }, [lessons]);

    useEffect(() => {
        if (!boardSize) return;
        const t = Math.floor(boardSize.size / 2);

        setTileCount(t);

    }, [boardSize]);

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.row)}>
                <ViewWrapper
                    settings={getSettings}
                    instructions={getInstructions}
                    score={getScore}
                    time={getTime}
                />
            </div>
            {tiles && language && (
                <Board
                    tiles={tiles}
                    language={language.text}
                    setScore={setScore}
                    setTime={setTime}/>)}
        </div>
    )
}