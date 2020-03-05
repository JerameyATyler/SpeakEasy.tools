import React, {useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import {Theme} from "../../Components";
import makeStyles from "@material-ui/core/styles/makeStyles";
import clsx from "clsx";
import {RandomLessons} from "../../Queries";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        flexFlow: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    formControl: {
        margin: theme.spacing(3),
        backgroundColor: theme.palette.accent.light,
        color: theme.palette.primary.contrastText,
    },
    formLabel: {
        color: theme.palette.primary.contrastText,
    }
}));

export default ({setBoard, boardSize, setBoardSize, gameMode, setGameMode}) => {
    const classes = useStyles(Theme);

    const [fetchSize, setFetchSize] = useState(null);

    useEffect(() => {
        if (!boardSize || parseInt(boardSize) <= 0) return;
        setFetchSize(parseInt(boardSize) / 2);
    }, [boardSize]);

    const [lessons, refetch] = RandomLessons(fetchSize);

    useEffect(() => {
        if (!lessons) return;
        setBoard(lessons);
    }, [lessons]);

    const [anchorE1, setAnchorE1] = useState(null);
    const [anchorE2, setAnchorE2] = useState(null);

    const handleE1Click = event => {
        setAnchorE1(event.currentTarget);
    };

    const handleE1Close = () => {
        setAnchorE1(null);
    };
    const handleE2Click = event => {
        setAnchorE2(event.currentTarget);
    };

    const handleE2Close = () => {
        setAnchorE2(null);
    };

    return (
        <div className={clsx(classes.root)}>
            <Button
                variant='contained'
                color='secondary'
                aria-controls="mode-menu"
                aria-haspopup="true"
                onClick={handleE1Click}>
                Game Mode
            </Button>
            <Menu
                id='mode'
                anchorEl={anchorE1}
                keepMounted
                open={Boolean(anchorE1)}
                onClose={handleE1Close}
            >
                <FormControl component='fieldset' className={clsx(classes.formControl)}>
                    <FormLabel className={clsx(classes.formLabel)} component='legend'>Game Mode</FormLabel>
                    <RadioGroup
                        aria-label='game-mode'
                        name='game-mode'
                        value={gameMode}
                        onChange={e => setGameMode(e.target.value)}
                    >
                        <FormControlLabel value={'chinese'} control={<Radio/>}
                                          label='Chinese'><MenuItem/></FormControlLabel>
                        <FormControlLabel value={'pinyin'} control={<Radio/>}
                                          label='Pinyin'><MenuItem/></FormControlLabel>
                        <FormControlLabel value={'english'} control={<Radio/>}
                                          label='English'><MenuItem/></FormControlLabel>
                        <FormControlLabel value={'hybrid'} control={<Radio/>}
                                          label='Hybrid'><MenuItem/></FormControlLabel>
                        <FormControlLabel value={'chaos'} control={<Radio/>}
                                          label='Chaos'><MenuItem/></FormControlLabel>
                    </RadioGroup>
                </FormControl>
            </Menu>

            <Button
                variant='contained'
                color='secondary'
                aria-controls="size-menu"
                aria-haspopup="true"
                onClick={handleE2Click}>
                Board Size
            </Button>
            <Menu
                id='boardSize'
                anchorEl={anchorE2}
                keepMounted
                open={Boolean(anchorE2)}
                onClose={handleE2Close}
            >
                <FormControl component='fieldset' className={clsx(classes.formControl)}>
                    <FormLabel className={clsx(classes.formLabel)} component='legend'>Board Size</FormLabel>
                    <RadioGroup
                        aria-label='board-size'
                        name='board-size'
                        onChange={e => setBoardSize(e.target.value)}
                        value={boardSize}
                    >
                        <FormControlLabel value={'18'} control={<Radio/>} label='18'><MenuItem/></FormControlLabel>
                        <FormControlLabel value={'24'} control={<Radio/>} label='24'><MenuItem/></FormControlLabel>
                        <FormControlLabel value={'30'} control={<Radio/>} label='30'><MenuItem/></FormControlLabel>
                        <FormControlLabel value={'36'} control={<Radio/>} label='36'><MenuItem/></FormControlLabel>
                    </RadioGroup>
                </FormControl>
            </Menu>
            <Button
                variant='contained'
                color='secondary'
                aria-controls="size-menu"
                aria-haspopup="true"
                onClick={() => refetch()}
            >
                Refresh Board
            </Button>

        </div>
    );
};