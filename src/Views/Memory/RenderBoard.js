import React, {useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import clsx from "clsx";
import {Theme} from "../../Components";
import Grid from "@material-ui/core/Grid";
import uuidv4 from 'uuid/v4';
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    gridListTile: {
        borderRadius: 10,
        textAlign: 'center',
        color: theme.palette.primary.contrastText,
        border: `thin ${theme.palette.primary.contrastText} solid`,
        width: 100,
        height: 150,
    },
    flipped: {
        backgroundColor: theme.palette.primary.main,
    },
    notFlipped: {
        backgroundColor: theme.palette.accent.main,
    },
    matched: {
        backgroundColor: theme.palette.primary.dark,
    },
    disable: {
        pointerEvents: 'none',
        opacity: '0.9',
    },
}));

export const RenderBoard = props => {
    const classes = useStyles(Theme);
    const board = props.board;
    const mode = props.mode;
    const [flipped, setFlipped] = useState(Array(board.length).fill(false));
    const [matched, setMatched] = useState(Array(board.length).fill(false));
    const [disabled, setDisabled] = useState(false);
    const tileCount = board.length;
    const rowCount = ((tileCount > 12 && tileCount % 12 === 0) ?
        (tileCount / 12)
        :
        (tileCount > 8 && tileCount % 8 === 0) ?
            (tileCount / 8)
            :
            (tileCount > 4 && tileCount % 4 === 0) ?
                (tileCount / 4) : 0);
    const rowLength = tileCount / rowCount;

    const handleMatch = async () => {
        const flippedIndices = await flipped.reduce((out, bool, index) => bool ? out.concat(index) : out, []);
        if (flippedIndices.length === 2) {
            if (board[flippedIndices[0]].id === board[flippedIndices[1]].id) {
                const prevMatched = matched;
                prevMatched[flippedIndices[0]] = true;
                prevMatched[flippedIndices[1]] = true;
                setMatched(prevMatched);
            }
            setTimeout(clearFlipped, .75 * 1000);
        }
    };

    const clearFlipped = () => {
        setFlipped(Array(board.length).fill(false));
    };

    const flip = async index => {
        await setFlipped(prevState => {
            prevState[index] = !prevState[index];
            return [...prevState]
        });
        handleMatch();
    };

    const handleFlip = index => {
        setDisabled(true);
        const flipCount = flipped.filter(e => e).length;
        if (!flipped[index] && (flipCount === 1 || flipCount === 0) && !matched[index]) {
            flip(index);
            setTimeout(setDisabled, .2 * 1000, false);
        } else {
            clearFlipped();
        }

    };

    return (
        <div className={clsx(classes.root)}>
            <Grid container spacing={1}>
                {board !== null && [...Array(rowCount).keys()].map(slice => (
                    <Grid container item key={uuidv4()}>
                        {board.slice(slice * rowLength, (slice + 1) * rowLength).map((tile, i) => {
                                const index = i + (slice * rowLength);
                                return (
                                    <Grid item
                                          key={uuidv4()}
                                          onClick={() => handleFlip(index)}
                                    >
                                        <Paper
                                            className={clsx(classes.gridListTile, {
                                                [classes.flipped]: flipped[index],
                                                [classes.notFlipped]: !flipped[index],
                                                [classes.matched]: matched[index],
                                                [classes.disabled]: disabled,
                                            })}>
                                            <Typography
                                                variant='h6'
                                            >
                                                {mode === 'hybrid' && (flipped[index] || matched[index]) ? tile.chinese
                                                    :
                                                    <br/>
                                                }
                                            </Typography>
                                            <Divider/>
                                            <Typography
                                                variant='h6'
                                            >
                                                {(!flipped[index] && !matched[index]) ? '?' :
                                                    mode === 'chaos' ?
                                                        [tile.chinese, tile.pinyin, tile.english][Math.floor(Math.random() * 3)]
                                                        : mode === 'hybrid' || mode === 'pinyin' ?
                                                        tile.pinyin
                                                        : mode === 'chinese' ?
                                                            tile.chinese
                                                            : mode === 'english' ?
                                                                tile.english
                                                                : Math.random().toString(36).substring(2, 15) +
                                                                Math.random().toString(36).substring(2, 15)
                                                }
                                            </Typography>
                                            <Divider/>
                                            <Typography
                                                variant='h6'
                                            >
                                                {mode === 'hybrid' && (flipped[index] || matched[index]) ?
                                                    tile.english
                                                    :
                                                    <br/>}</Typography>
                                        </Paper>
                                    </Grid>
                                )
                            }
                        )}
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};