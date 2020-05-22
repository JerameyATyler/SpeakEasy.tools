import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Theme} from "../../../utils";
import clsx from "clsx";
import Tile from "./Tile";

const useStyles = makeStyles(theme => ({
    root: {

    },
    row: {
        width: '100%',
        display: 'flex',
    },
}));

export default ({vals, squareId, handleClick}) => {
    const classes = useStyles(Theme);

    const handleTileClick = tileId => {
        handleClick(squareId, tileId);
    };

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.row)}>
                <Tile onClick={() => handleTileClick(0)} val={vals[0]}/>
                <Tile onClick={() => handleTileClick(1)}  val={vals[1]}/>
                <Tile onClick={() => handleTileClick(2)}  val={vals[2]}/>
            </div>
            <div className={clsx(classes.row)}>
                <Tile onClick={() => handleTileClick(3)}  val={vals[3]}/>
                <Tile onClick={() => handleTileClick(4)}  val={vals[4]}/>
                <Tile onClick={() => handleTileClick(5)}  val={vals[5]}/>
            </div>
            <div className={clsx(classes.row)}>
                <Tile onClick={() => handleTileClick(6)}  val={vals[6]}/>
                <Tile onClick={() => handleTileClick(7)}  val={vals[7]}/>
                <Tile onClick={() => handleTileClick(8)}  val={vals[8]}/>
            </div>
        </div>
    );
};