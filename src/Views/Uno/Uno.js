import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {Theme} from "../../Components/Theme";
import {GameWrapper} from "../../Components/GameWrapper";
import ConfigBar from './configBar';
import Instructions from './instructions';
import GridList from "@material-ui/core/GridList";
import clsx from "clsx";
import GridListTile from "@material-ui/core/GridListTile";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        overflow: 'hidden',
        flexGrow: 1,
    },
    gridList: {
        width: 600,
        height: 300,
        padding: theme.spacing(1),
    },
    gridListTile: {
        border: `thin ${theme.palette.secondary.main} solid`,
        borderRadius: 10,
        textAlign: 'center',
        color: '#f5f2d0',
    },
}));

export default () => {
    const classes = useStyles(Theme);
    // Variables that can change the appearance of the screen need to be created using useState.
    // This variable is for the option selected in the config bar's menu. In order for the config bar to pass choices
    // to the game, the game has to control the state and give the config bar the ability to update state. So both of
    // these get passed as props to config bar
    const [options, setOptions] = useState('Option 1');

    const UnoComponent = () => (
        <div className={classes.root}
             tabIndex={1}
             autofocus
        >
            <GridList cellHeight={60} className={clsx(classes.gridList)} cols={4} justify='center'>
                <GridListTile
                    key={1}
                    className={"gridTile"}
                    cols={1}
                >
                </GridListTile>
            </GridList>
        </div>
    );

    return (
        <GameWrapper>
            <ConfigBar
                options={options}
                setOptions={setOptions}
            />
            <Instructions/>
            <UnoComponent/>
        </GameWrapper>
    );
};