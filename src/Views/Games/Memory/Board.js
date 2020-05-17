import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Theme} from "../../../utils";
import clsx from "clsx";
import {v4 as uuid} from 'uuid';
import PlayingCard from "./PlayingCard";
import shuffle from "../../../utils/Shuffle";

const useStyles = makeStyles(theme => ({
    root: {
        flex: '1 1 100%',
        display: 'flex',
        flexFlow: 'row wrap',
    },
    pad: {
        margin: theme.spacing(1),
        flex: '1 1 auto',
        width: 150
    },
    matched: {
        opacity: 0.5
    }
}));

export default ({tiles, language, setScore, setTime}) => {
    const classes = useStyles(Theme);

    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);

    const [board, setBoard] = useState(null);
    const [flipped, setFlipped] = useState(null);
    const [matched, setMatched] = useState(null);

    useEffect(()=>{
        if(!tiles) return;
        let t = shuffle([...tiles].concat([...tiles]));
        setBoard(t);
        setFlipped(Array(t.length).fill(false));
        setMatched(Array(t.length).fill(false));
    }, [tiles]);

    const incrementScore = () => {
        setScore(prevState => prevState + 2);
    };

    const handleMatch = async () => {

        const flippedIndices = await flipped.reduce((out, bool, index) => bool ? out.concat(index) : out, []);
        if(flippedIndices.length === 2) {
            if(board[flippedIndices[0]].id === board[flippedIndices[1]].id){
                const prevMatched = [...matched];
                prevMatched[flippedIndices[0]] = true;
                prevMatched[flippedIndices[1]] = true;
                setMatched(prevMatched);
                incrementScore();
            }
            setTimeout(clearFlipped, .75 * 1000);
        }
    };

    const clearFlipped = () => {
        setFlipped(Array(board.length).fill(false));
    };

    const flip = async i => {
        await setFlipped(prevState => {
            prevState[i] = !prevState[i];
            return [...prevState];
        });
        await handleMatch();
    };

    const handleFlip = i => {

        const flipCount = flipped.filter(e => e).length;
        if (!startTime) {
            setStartTime(new Date());
        }
        if(!flipped[i] && (flipCount === 1 || flipCount === 0) && !matched[i]){
            flip(i);
            setTimeout(console.log, .2 * 1000, false);
        } else {
            clearFlipped();
        }
    };

    useEffect(() =>{
        if(!matched) return;
        const matchCount = matched.filter(e => e).length;
        if(matchCount >= matched.length) {
            setEndTime(new Date());
        }
    }, [matched]);

    useEffect(() => {
        if(!(startTime && endTime)) return;
        setTime((endTime - startTime) / 1000);
    }, [startTime, endTime, setTime]);

    return (
        <div className={clsx(classes.root)}>
            {board && language && board.map((b, i) => (
                <div
                    onClick={() => handleFlip(i)}
                    key={uuid()}
                    className={clsx(classes.pad, {
                        [classes.matched]: matched[i]
                    })}
                >
                    {language === 'Chaos' ? (
                        <PlayingCard
                            topText={b[['chinese', 'english', 'pinyin'][Math.floor(Math.random() * 3)]]}
                            middleText={b[['chinese', 'english', 'pinyin'][Math.floor(Math.random() * 3)]]}
                            bottomText={b[['chinese', 'english', 'pinyin'][Math.floor(Math.random() * 3)]]}
                            flipped={flipped[i] || matched[i]}
                        />
                    ) : (
                        <PlayingCard
                            topText={language === 'Hybrid' && b.english}
                            middleText={language === 'Chinese' ? b.chinese : language === 'English' ? b.english : language === 'Pinyin' ? b.pinyin : b.chinese}
                            bottomText={language === 'Hybrid' && b.pinyin}
                            flipped={(flipped[i] || matched[i])}
                        />
                    )}

                </div>
            ))}
        </div>
    )
}