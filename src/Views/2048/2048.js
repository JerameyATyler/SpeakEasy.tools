import React, {useCallback, useEffect, useState} from 'react';
import clsx from "clsx";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import {GameWrapper} from "../../Components/GameWrapper";
import ConfigBar from "./ConfigBar";
import Instructions from "./Instructions";
import {Theme} from "../../Components";

const useStyles = makeStyles(theme => ({
    root: {
    },
    gridList: {
        padding: theme.spacing(1),
    },
    gridListTile: {
        border: `thin ${theme.palette.secondary.main} solid`,
        borderRadius: 10,
        textAlign: 'center',
        color: '#f5f2d0',
    },
    gridListColor0: {
        background: theme.palette.accent.main,
    },
    gridListColor2: {
        background: '#8a8a4a',
    },
    gridListColor4: {
        background: '#727229',
    },
    gridListColor8: {
        background: '#406868',
    },
    gridListColor16: {
        background: '#2c5353',
    },
    gridListColor32: {
        background: '#194545',
    },
    gridListColor64: {
        background: '#ad896b',
    },
    gridListColor128: {
        background: '#8a674a',
    },
    gridListColor256: {
        background: '#724a29',
    },
    gridListColor512: {
        background: '#654a74',
    },
    gridListColor1024: {
        background: '#4e335c',
    },
    gridListColor2048: {
        background: '#3c1e4c',
    },
    disable: {
        pointerEvents: 'none',
        opacity: '0.4',
    },
}));

export const TwentyFortyEight = () => {
    const classes = useStyles(Theme);
    const [mode, setMode] = useState('english');
    const [matches, setMatches] = useState(0);
    const [score, setScore] = useState(0);
    const tileClasses = {
        '0': classes.gridListColor0,
        '2': classes.gridListColor2,
        '4': classes.gridListColor4,
        '8': classes.gridListColor8,
        '16': classes.gridListColor16,
        '32': classes.gridListColor32,
        '64': classes.gridListColor64,
        '128': classes.gridListColor128,
        '256': classes.gridListColor256,
        '512': classes.gridListColor512,
        '1024': classes.gridListColor1024,
        '2048': classes.gridListColor2048
    };

    const initializeBoard = () => {
        const squares = Array(16).fill({'occupied': false, 'value': '0'});
        const initialIndex = Math.floor(Math.random() * Math.floor(16));

        const values = [2, 4];
        const initialValue = values[Math.floor(Math.random() * Math.floor(values.length))];

        squares[initialIndex] = {'occupied': true, 'value': initialValue};
        return squares;
    };

    const [squares, setSquares] = useState(initializeBoard);

    const shift = useCallback((direction) => {
        const newSquares = squares.map(square => {
            return {'occupied': square.occupied, 'value': square.value}
        });
        let rows;
        if (direction === 'left') {
            rows = [
                [0, 1, 2, 3],
                [4, 5, 6, 7],
                [8, 9, 10, 11],
                [12, 13, 14, 15]
            ]
        } else if (direction === 'right') {
            rows = [
                [3, 2, 1, 0],
                [7, 6, 5, 4],
                [11, 10, 9, 8],
                [15, 14, 13, 12]
            ]
        } else if (direction === 'up') {
            rows = [
                [0, 4, 8, 12],
                [1, 5, 9, 13],
                [2, 6, 10, 14],
                [3, 7, 11, 15]
            ]
        } else if (direction === 'down') {
            rows = [
                [12, 8, 4, 0],
                [13, 9, 5, 1],
                [14, 10, 6, 2],
                [15, 11, 7, 3]
            ]
        } else {
            rows = [[]];
        }

        let count = 0;

        for (let i = 0; i < 4; i++) {
            for (let j = 1; j < 4; j++) {
                if (newSquares[rows[i][j]].occupied) {
                    for (let k = j - 1; k >= 0; k--) {
                        if (!newSquares[rows[i][k]].occupied) {
                            newSquares[rows[i][k]] = {'occupied': true, 'value': newSquares[rows[i][k + 1]].value};
                            newSquares[rows[i][k + 1]] = {'occupied': false, 'value': '0'};
                            count++;
                        } else if (newSquares[rows[i][k]].value === newSquares[rows[i][k + 1]].value) {
                            newSquares[rows[i][k]] = {'occupied': true, 'value': newSquares[rows[i][k + 1]].value * 2};
                            newSquares[rows[i][k + 1]] = {'occupied': false, 'value': '0'};
                            count++;
                            setMatches(matches + 1);
                            setScore(score + (newSquares[rows[i][k]].value*2));
                            break;
                        } else {
                            break;
                        }
                    }
                }
            }
        }

        if (count === 0) {
            return newSquares;
        }

        const vacantIndices = [];
        for (let i = 0; i < newSquares.length; i++) {
            if (!newSquares[i].occupied) {
                vacantIndices.push(i)
            }
        }
        if (vacantIndices && vacantIndices.length > 0) {
            const newIndex = vacantIndices[Math.floor(Math.random() * Math.floor(vacantIndices.length))];

            const values = [2, 4];
            const newValue = values[Math.floor(Math.random() * Math.floor(values.length))];


            newSquares[newIndex] = {'occupied': true, 'value': newValue};
        }
        return newSquares;
    }, [squares, matches, score]);

    const handleKeyDown = useCallback((event) => {
        if (event.key === 'ArrowUp') {
            setSquares(shift('up'));
        } else if (event.key === 'ArrowDown') {
            setSquares(shift('down'));
        } else if (event.key === 'ArrowLeft') {
            setSquares(shift('left'));
        } else if (event.key === 'ArrowRight') {
            setSquares(shift('right'));
        }
    }, [shift]);
    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown, false);
        return () => {
            document.removeEventListener("keydown", handleKeyDown, false)
        };
    }, [handleKeyDown]);

    const getText = tile => {
        const values = {
            2: {
                pinyin: 'Èr',
                chinese: '二',
                english: 2,
            },
            4: {
                pinyin: 'Sì',
                chinese: '四',
                english: 4,
            },
            8: {
                pinyin: 'Bā',
                chinese: '八',
                english: 8,
            },
            16: {
                pinyin: 'Shí liù',
                chinese: '十六',
                english: 16,
            },
            32: {
                pinyin: 'Sānshí èr',
                chinese: '三十二',
                english: 32,
            },
            64: {
                pinyin: 'Liùshísì',
                chinese: '六十四',
                english: 64,
            },
            128: {
                pinyin: 'yī bǎi èr shí bā',
                chinese: '一百二十八',
                english: 128,
            },
            256: {
                pinyin: 'liǎng bǎi wǔ shí liù',
                chinese: '两百五十六',
                english: 256,
            },
            512: {
                pinyin: 'wǔ bǎi yī shí èr',
                chinese: '五百一十二',
                english: 512,
            },
            1024: {
                pinyin: 'yī qiān líng èr shí sì',
                chinese: '一千零二十四',
                english: 1024,
            },
            2048: {
                pinyin: 'liǎng qiān líng sì shí bā',
                chinese: '两千零四十八',
                english: 2048,
            }
        };
        if(mode === 'color') return '';
        if(mode === 'chaos') return values[tile][['chinese', 'pinyin', 'english'][Math.floor(Math.random() * 3)]];
        if(mode === 'adaptive') return values[tile][['english', 'pinyin', 'chinese']
            [Math.floor(Math.random() * Math.min(Math.log2(Math.log2(score)), 3))]];
        else return values[tile][mode];
    };

    const TwentyFortyEightComponent = () => (
        <div className={classes.root}
             tabIndex={1}
             autoFocus
        >
            <GridList className={clsx(classes.gridList)} cols={4} justify='center'>
                {squares.map((tile, index) => (
                    <GridListTile
                        key={index}
                        className={`${classes.gridListTile} ${tileClasses[tile.value.toString()]}`}
                        cols={1}
                    >
                        <Typography
                            className={'MuiTypography--heading'}
                            variant={'h2'}
                        >
                            {tile.value.toString() === '0' ? '' : getText(tile.value)}
                        </Typography>
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );

    return (
        <GameWrapper>
            <ConfigBar
                mode={mode}
                setMode={setMode}
            />
            <Instructions/>

            <TwentyFortyEightComponent/>
        </GameWrapper>
    );
};