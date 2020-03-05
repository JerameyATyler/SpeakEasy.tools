import React, {useEffect, useState} from "react";
import {GameWrapper, Theme} from "../../Components";
import ConfigBar from './ConfigBar';
import Instructions from './Instructions';
import clsx from "clsx";
import {Button, makeStyles, Typography} from "@material-ui/core";
import uuid from 'uuid/v4';

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
        width: '100%',
        flex: '1 1 100%',
        padding: theme.spacing(1),
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'space-between',
        backgroundColor: theme.palette.primary.main,
    },
    card: {
        width: '15%',
        height: '15%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '5px',
    },
    faceDown: {
        backgroundColor: theme.palette.accent.main,
        border: `thick solid ${theme.palette.secondary.main}`,
        color: theme.palette.primary.contrastText,
    },
    faceUp: {
        backgroundColor: theme.palette.secondary.main,
        border: `thick solid ${theme.palette.accent.main}`,
        color: theme.palette.secondary.contrastText,
    },
    column: {
        display: 'flex',
        flexFlow: 'column wrap',
        justifyContent: 'center',
        alignItems: 'center'
    }
}));

export const Memory = () => {
    const classes = useStyles(Theme);

    const [gameMode, setGameMode] = useState('pinyin');
    const [boardSize, setBoardSize] = useState('18');

    const [board, setBoard] = useState(null);
    const [flipped, setFlipped] = useState(null);
    const [matched, setMatched] = useState(null);

    useEffect(() => {
        console.log('board')
        if (!board || boardSize <= 0) return;
        setFlipped(Array(parseInt(boardSize)).fill(false));
        setMatched(Array(parseInt(boardSize)).fill(false));
    }, [board, boardSize]);

    const flipSum = () => {
        if (!flipped || flipped.length <= 0) return;
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        const fSum = flipped.reduce(reducer);
        return fSum;
    };

    const handleClick = i => {
        let f = [...flipped];
        f[i] = true;
        setFlipped(f);
    };

    useEffect(() => {
        if (!flipped || (flipped.length > 0 && flipSum() < 2)) return;

        const flippedIndices = flipped.reduce((out, bool, index) => bool ? out.concat(index) : out, []);
        let f = Array(parseInt(boardSize)).fill(false);
        if (board[flippedIndices[0]].id === board[flippedIndices[1]].id) {
            setMatched(prevState => {
                let m = [...prevState];
                m[flippedIndices[0]] = true;
                m[flippedIndices[1]] = true;
                return m;
            });
        }

        setTimeout(setFlipped, 1000, f);
    }, [flipped, flipSum]);

    const MemoryComponent = () => {
        return (
            <div className={clsx(classes.root)}>
                {board && board.map((b, index) =>
                    <Button
                        key={uuid()}
                        className={clsx(classes.card, {
                            [classes.faceDown]: flipped && !flipped[index] && matched && !matched[index],
                            [classes.faceUp]: (flipped && flipped[index]) || (matched && matched[index])
                        })}
                        onClick={() => handleClick(index)}
                        disabled={!board || !flipped || !matched || flipSum() >= 2 || flipped[index] || matched[index]}
                    >
                        {
                            !((matched && matched[index]) || (flipped && flipped[index])) ?
                                <div className={clsx(classes.pad)}>
                                    <Typography
                                        variant='h6'
                                    >
                                        ?
                                    </Typography>
                                </div> :
                                gameMode === 'chaos' ?
                                    <div className={clsx(classes.pad)}>
                                        <Typography
                                            variant='h6'
                                        >
                                            {b[['english', 'pinyin', 'chinese'][Math.floor(Math.random() * 3)]]}
                                        </Typography>
                                    </div> :
                                    gameMode === 'chinese' || gameMode === 'pinyin' || gameMode === 'english' ?
                                        <div className={clsx(classes.pad)}>
                                            <Typography
                                                variant='h6'
                                            >
                                                {b[gameMode]}
                                            </Typography>
                                        </div> :
                                        gameMode === 'hybrid' &&
                                        <div className={clsx(classes.column)}>
                                            <div className={clsx(classes.pad)}>
                                                <Typography
                                                    variant='subtitle1'
                                                >
                                                    {b.chinese}
                                                </Typography>
                                            </div>
                                            <div className={clsx(classes.pad)}>
                                                <Typography
                                                    variant='subtitle1'
                                                >
                                                    {b.pinyin}
                                                </Typography>
                                            </div>
                                            <div className={clsx(classes.pad)}>
                                                <Typography
                                                    variant='subtitle1'
                                                >
                                                    {b.english}
                                                </Typography>
                                            </div>
                                        </div>
                        }
                    </Button>
                )}
            </div>
        );
    };

    return (
        <GameWrapper>
            <ConfigBar
                setBoard={setBoard}
                boardSize={boardSize}
                setBoardSize={setBoardSize}
                gameMode={gameMode}
                setGameMode={setGameMode}
            />
            <Instructions/>
            <MemoryComponent/>
        </GameWrapper>
    );
};
