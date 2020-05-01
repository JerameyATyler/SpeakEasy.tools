import React, {useCallback, useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Theme} from "../../utils";
import clsx from "clsx";
import {ViewWrapper} from "../../Components";
import Settings from "./Settings";
import Instructions from "./Instructions";
import Tile from "./Tile";

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
    },
    content: {
        padding: theme.spacing(1),
        flex: '1 1 100%',
        height: '100%',
        display: 'flex',
        flexFlow: 'column noWrap',
    },
    row: {
        width: '100%',
        display: 'flex',
    },
    pad: {
        padding: theme.spacing(1),
        flex: '1 1 100px',
    }
}));

export default () => {
    document.title = '2048';
    const classes = useStyles(Theme);

    const [language, setLanguage] = useState(null);

    const settings = Settings(language, setLanguage);
    const instructions = Instructions();
    const [score, setScore] = useState(0);

    const getSettings = () => {
        return settings;
    };
    const getInstructions = () => {
        return instructions;
    };
    const getScore = () => {
        return score;
    };

    const initializeBoard = () => {
        const squares = Array(16).fill(0);
        const initialIndex = Math.floor(Math.random() * squares.length);

        const values = [2, 4];
        const initialValue = values[Math.floor(Math.random() * values.length)];

        squares[initialIndex] = initialValue;

        return squares;
    };

    const [board, setBoard] = useState(initializeBoard());

    useEffect(() => {
        if (!board) return;
    }, [board]);

    const [gameOver, setGameOver] = useState(false);

    const shift = useCallback((direction) => {
        const newBoard = [...board];

        let rows = {};
        rows.left = [
            [0, 1, 2, 3],
            [4, 5, 6, 7],
            [8, 9, 10, 11],
            [12, 13, 14, 15]
        ];
        rows.right = [
            [3, 2, 1, 0],
            [7, 6, 5, 4],
            [11, 10, 9, 8],
            [15, 14, 13, 12]
        ];
        rows.up = [
            [0, 4, 8, 12],
            [1, 5, 9, 13],
            [2, 6, 10, 14],
            [3, 7, 11, 15]
        ];
        rows.down = [
            [12, 8, 4, 0],
            [13, 9, 5, 1],
            [14, 10, 6, 2],
            [15, 11, 7, 3]
        ];

        let count = 0;
        for (let i = 0; i < 4; i++) {
            for (let j = 1; j < 4; j++) {
                if (newBoard[rows[direction][i][j]]) {
                    for (let k = j - 1; k >= 0; k--) {
                        if (!Boolean(newBoard[rows[direction][i][k]])) {
                            newBoard[rows[direction][i][k]] = newBoard[rows[direction][i][k + 1]];
                            newBoard[rows[direction][i][k + 1]] = 0;
                            count++;
                        } else if (Boolean(newBoard[rows[direction][i][k]]) && newBoard[rows[direction][i][k]] === newBoard[rows[direction][i][k + 1]]) {
                            newBoard[rows[direction][i][k]] *= 2;
                            newBoard[rows[direction][i][k + 1]] = 0;
                            setScore(prevState => prevState + newBoard[rows[direction][i][k]]);
                            count++;
                            break;
                        } else {
                            break;
                        }
                    }
                }
            }
        }

        let vacantIndices = [];
        for (let i = 0; i < newBoard.length; i++) {
            if (!newBoard[i]) vacantIndices.push(i);
        }

        if (vacantIndices.length > 0) {
            if (count > 0) {
                const newIndex = vacantIndices[Math.floor(Math.random() * Math.floor(vacantIndices.length))];

                const values = [2, 4];
                newBoard[newIndex] = values[Math.floor(Math.random() * Math.floor(values.length))];
            }
        } else {
            let pairs = false;
            for (let i = 0; i < 4; i++) {
                if (pairs) break;
                for (let j = 1; j < 4; j++) {
                    if (pairs) break;
                    if (newBoard[rows['right'][i][j]] === newBoard[rows['right'][i][j - 1]]) {
                        pairs = true;
                        break;
                    }
                    if (newBoard[rows['up'][i][j]] === newBoard[rows['up'][i][j - 1]]) {
                        pairs = true;
                        break;
                    }
                }
            }

            if (!pairs) {
                setGameOver(true);
            }
        }
        setBoard(newBoard);
    }, [board]);

    const handleKeyDown = useCallback((event) => {
        if (event.key === 'ArrowUp') {
            shift('up');
        } else if (event.key === 'ArrowDown') {
            shift('down');
        } else if (event.key === 'ArrowLeft') {
            shift('left');
        } else if (event.key === 'ArrowRight') {
            shift('right');
        }
    }, [shift]);

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown, false);
        return () => {
            document.removeEventListener("keydown", handleKeyDown, false);
        };
    }, [handleKeyDown]);
    useEffect(() => {
        if (gameOver) return;
    }, [gameOver]);

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.row)}>
                <ViewWrapper
                    settings={getSettings}
                    instructions={getInstructions}
                    score={getScore}
                    timer
                />
            </div>
            <div className={clsx(classes.row)}>
                <div className={clsx(classes.pad)}>
                    <Tile value={board[0]} language={language} score={getScore}/>
                </div>
                <div className={clsx(classes.pad)}>
                    <Tile value={board[1]} language={language} score={getScore}/>
                </div>
                <div className={clsx(classes.pad)}>
                    <Tile value={board[2]} language={language} score={getScore}/>
                </div>
                <div className={clsx(classes.pad)}>
                    <Tile value={board[3]} language={language} score={getScore}/>
                </div>
            </div>
            <div className={clsx(classes.row)}>
                <div className={clsx(classes.pad)}>
                    <Tile value={board[4]} language={language} score={getScore}/>
                </div>
                <div className={clsx(classes.pad)}>
                    <Tile value={board[5]} language={language} score={getScore}/>
                </div>
                <div className={clsx(classes.pad)}>
                    <Tile value={board[6]} language={language} score={getScore}/>
                </div>
                <div className={clsx(classes.pad)}>
                    <Tile value={board[7]} language={language} score={getScore}/>
                </div>
            </div>
            <div className={clsx(classes.row)}>
                <div className={clsx(classes.pad)}>
                    <Tile value={board[8]} language={language} score={getScore}/>
                </div>
                <div className={clsx(classes.pad)}>
                    <Tile value={board[9]} language={language} score={getScore}/>
                </div>
                <div className={clsx(classes.pad)}>
                    <Tile value={board[10]} language={language} score={getScore}/>
                </div>
                <div className={clsx(classes.pad)}>
                    <Tile value={board[11]} language={language} score={getScore}/>
                </div>
            </div>
            <div className={clsx(classes.row)}>
                <div className={clsx(classes.pad)}>
                    <Tile value={board[12]} language={language} score={getScore}/>
                </div>
                <div className={clsx(classes.pad)}>
                    <Tile value={board[13]} language={language} score={getScore}/>
                </div>
                <div className={clsx(classes.pad)}>
                    <Tile value={board[14]} language={language} score={getScore}/>
                </div>
                <div className={clsx(classes.pad)}>
                    <Tile value={board[15]} language={language} score={getScore}/>
                </div>
            </div>
        </div>
    )
}