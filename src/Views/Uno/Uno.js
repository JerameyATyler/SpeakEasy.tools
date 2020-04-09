import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {Theme} from "../../Components/Theme";
import {GameWrapper} from "../../Components/GameWrapper";
import ConfigBar from './configBar';
import Instructions from './instructions';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
    card:{
        width: '116px',
        height: '178px',
        float: 'left',
        background: '#fff',
        borderRadius: '5px',
        display: 'table',
        boxSizing: 'border-box',
        padding: '5px',
        margin: '10px',
        fontSize: '100px',
        textShadow: 
            '1px  1px 0 #000000,-1px -1px 0 #000000,-1px  1px 0 #000000,1px -1px 0 #000000,1px  0   0 #000000,-1px  0   0 #000000,0   -1px 0 #000000, 0    1px 0 #000000,4px  4px 0 #000000',
        boxShadow: '0 0 10px #aaaaaa',
        // boxShadowColor: '#aaaaaa',
        // boxShadowOffset: {width: -1, hright: 1},
        // boxShadowRadius: '10px',
        textAlign: 'center',
        position: 'relative',

        '&::before':{
            display: 'inline-block',
            position: 'absolute',
            lineHeight: '0',
            fontSize: '20px',
            color: '#ffffff',
            textShadow: '1px  1px 0 #000000,-1px -1px 0 #000000,-1px  1px 0 #000000,1px -1px 0 #000000,1px  0   0 #000000,-1px  0   0 #000000,0   -1px 0 #000000,0    1px 0 #000000,2px  2px 0 #000000',
            top: '15px',
            left: '10px',
        },

        '&::after':{
            display: 'inline-block',
            position: 'absolute',
            lineHeight: '0',
            fontSize: '20px',
            color: '#ffffff',
            textShadow: '1px  1px 0 #000000,-1px -1px 0 #000000,-1px  1px 0 #000000,1px -1px 0 #000000,1px  0   0 #000000,-1px  0   0 #000000,0   -1px 0 #000000,0    1px 0 #000000,2px  2px 0 #000000',
            bottom: '15px',
            right: '10px',
            WebkitTransform: 'rotate(180deg)',
        },
    },
    inner:{
        display: 'table-cell',
        verticalAlign: 'middle',
        borderRadius: '5px',
        overflow: 'hidden',
    },
    mark:{
        display: 'inline-block',
        verticalAlign: 'middle',
        background: '#ffffff',
        margin: 'auto',
        padding: '0 26px',
        borderRadius: '100px 60px / 120px 60px',
        lineHeight: '1.4',
    },
    blue:{
        color: '#0063B3',
        background: '#0063B3',
    },
    green:{
        color: '#18A849',
        background: '#18A849',
    },
    red:{
        color: '#C72A18',
        background: '#C72A18',
    },
    yellow:{
        color: '#E6CA1E',
        background: '#E6CA1E',
    },
    num1:{
        '&::before':{
            content: `"1"`,
        },
        '&::after':{
            content: `"1"`,
        },
    },
    num2:{
        '&::before':{
            content: `"2"`,
        },
        '&::after':{
            content: `"2"`,
        },
    },
    num3:{
        '&::before':{
            content: `"3"`,
        },
        '&::after':{
            content: `"3"`,
        },
    },
    num4:{
        '&::before':{
            content: `"4"`,
        },
        '&::after':{
            content: `"4"`,
        },
    },
    num5:{
        '&::before':{
            content: `"5"`,
        },
        '&::after':{
            content: `"5"`,
        },
    },
    num6:{
        '&::before':{
            content: `"6"`,
        },
        '&::after':{
            content: `"6"`,
        },
    },
    num7:{
        '&::before':{
            content: `"7"`,
        },
        '&::after':{
            content: `"7"`,
        },
    },
    num8:{
        '&::before':{
            content: `"8"`,
        },
        '&::after':{
            content: `"8"`,
        },
    },
    num9:{
        '&::before':{
            content: `"9"`,
        },
        '&::after':{
            content: `"9"`,
        },
    },
}));

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
                <div className = {clsx(classes.card, classes.num1, classes.blue)}>
                    <span className = {classes.inner}>
                        <span className = {classes.mark}>1</span>
                    </span>
                </div>
                <div className = {clsx(classes.card, classes.num2, classes.yellow)}>
                    <span className = {classes.inner}>
                        <span className = {classes.mark}>2</span>
                    </span>
                </div>
                <div className = {clsx(classes.card, classes.num3, classes.red)}>
                    <span className = {classes.inner}>
                        <span className = {classes.mark}>3</span>
                    </span>
                </div>
                <div className = {clsx(classes.card, classes.num4, classes.green)}>
                    <span className = {classes.inner}>
                        <span className = {classes.mark}>4</span>
                    </span>
                </div>
                <div className = {clsx(classes.card, classes.num6, classes.blue)}>
                    <span className = {classes.inner}>
                        <span className = {classes.mark}>6</span>
                    </span>
                </div>
            </div>
            )
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