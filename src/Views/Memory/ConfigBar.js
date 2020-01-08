import React, {useState} from "react";
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
import {GetBoard} from "./GetBoard";

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(3),
        backgroundColor: theme.palette.accent.light,
        color: theme.palette.primary.contrastText,
    },
    formLabel: {
        color: theme.palette.primary.contrastText,
    }
}));

export default (props) => {
    const classes = useStyles(Theme);
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
        <div>
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
                        value={props.mode}
                        onChange={props.handleModeChange}
                    >
                        <FormControlLabel value={'chinese'} control={<Radio/>} label='Chinese'><MenuItem/></FormControlLabel>
                        <FormControlLabel value={'pinyin'} control={<Radio/>} label='Pinyin'><MenuItem/></FormControlLabel>
                        <FormControlLabel value={'english'} control={<Radio/>} label='English'><MenuItem/></FormControlLabel>
                        <FormControlLabel value={'hybrid'} control={<Radio/>} label='Hybrid'><MenuItem/></FormControlLabel>
                        <FormControlLabel value={'chaos'} control={<Radio/>} label='Chaos'><MenuItem/></FormControlLabel>
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
                        aria-label='game-mode'
                        name='game-mode'
                        value={props.boardSize.toString()}
                        onChange={props.handleBoardSizeChange}
                    >
                        <FormControlLabel value={'12'} control={<Radio/>} label='12'><MenuItem/></FormControlLabel>
                        <FormControlLabel value={'16'} control={<Radio/>} label='16'><MenuItem/></FormControlLabel>
                        <FormControlLabel value={'24'} control={<Radio/>} label='24'><MenuItem/></FormControlLabel>
                        <FormControlLabel value={'32'} control={<Radio/>} label='32'><MenuItem/></FormControlLabel>
                        <FormControlLabel value={'48'} control={<Radio/>} label='48'><MenuItem/></FormControlLabel>
                    </RadioGroup>
                </FormControl>
            </Menu>

            <GetBoard
                boardSize={props.boardSize}
                setBoard={props.setBoard}
            />
        </div>
    );
};