import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {Theme} from "../../Components/Theme";
import {GameWrapper} from "../../Components/GameWrapper";
import ConfigBar from './configBar';
import Instructions from './instructions';

const useStyles = makeStyles(theme => {
    root: {}
});

export default () => {
    const classes = useStyles(Theme);
    // Variables that can change the appearance of the screen need to be created using useState.
    // This variable is for the option selected in the config bar's menu. In order for the config bar to pass choices
    // to the game, the game has to control the state and give the config bar the ability to update state. So both of
    // these get passed as props to config bar
    const [options, setOptions] = useState('Option 1');

    const UnoComponent = () => {
        // This is where the HTML for Uno will go. You can put some variables here, but not state variables
        return (
            <div>
                <Typography
                    variant='h2'
                    color='primary'
                >
                    Uno
                </Typography>
            </div>)
    };

    return (
        <GameWrapper>
            <ConfigBar
                options={options}
                setOptions={setOptions}
            />
            <Instructions/>
            <UnoComponent/>
        </GameWrapper>
    )
}