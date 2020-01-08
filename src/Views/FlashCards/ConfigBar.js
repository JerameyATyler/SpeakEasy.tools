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

    const handleE1Click = event => {
        setAnchorE1(event.currentTarget);
    };

    const handleE1Close = () => {
        setAnchorE1(null);
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
                        <FormControlLabel value={'chinese-english'} control={<Radio/>} label='Chinese/English'><MenuItem/></FormControlLabel>
                        <FormControlLabel value={'chinese-pinyin'} control={<Radio/>} label='Chinese/Pinyin'><MenuItem/></FormControlLabel>
                        <FormControlLabel value={'pinyin-english'} control={<Radio/>} label='Pinyin/English'><MenuItem/></FormControlLabel>
                        <FormControlLabel value={'chaos'} control={<Radio/>} label='Chaos'><MenuItem/></FormControlLabel>
                    </RadioGroup>
                </FormControl>
            </Menu>
        </div>
    );
};