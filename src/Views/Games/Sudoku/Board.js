import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Theme} from "../../../utils";
import clsx from "clsx";
import Square from "./Square";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles(theme => ({
    root: {
        width: 300
    },
    row: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    },
}));

export default () => {
    const classes = useStyles(Theme);

    const [board, setBoard] = useState(Array(9).fill(Object.keys(Array(9).fill(''))));

    const getBoard = () => {

    };

    const getSquare = squareId => {
        switch (squareId) {
            case 0:
                return [
                    board[0][0], board[0][1], board[0][2],
                    board[1][0], board[1][1], board[1][2],
                    board[2][0], board[2][1], board[2][2]]
            case 1:
                return [
                    board[0][3], board[0][4], board[0][5],
                    board[1][3], board[1][4], board[1][5],
                    board[2][3], board[2][4], board[2][5]]
            case 2:
                return [
                    board[0][6], board[0][7], board[0][8],
                    board[1][6], board[1][7], board[1][8],
                    board[2][6], board[2][7], board[2][8]]
            case 3:
                return [
                    board[3][0], board[3][1], board[3][2],
                    board[4][0], board[4][1], board[4][2],
                    board[5][0], board[5][1], board[3][2]]
            case 4:
                return [
                    board[3][3], board[3][4], board[3][5],
                    board[4][3], board[4][4], board[4][5],
                    board[5][3], board[5][4], board[5][5]]
            case 5:
                return [
                    board[3][6], board[3][7], board[3][8],
                    board[4][6], board[4][7], board[4][8],
                    board[5][6], board[5][7], board[5][8]]
            case 6:
                return [
                    board[6][0], board[6][1], board[6][2],
                    board[7][0], board[7][1], board[7][2],
                    board[8][0], board[8][1], board[8][2]]
            case 7:
                return [
                    board[6][3], board[6][4], board[6][5],
                    board[7][3], board[7][4], board[7][5],
                    board[8][3], board[8][4], board[8][5]]
            case 8:
                return [
                    board[6][6], board[6][7], board[6][8],
                    board[7][6], board[7][7], board[7][8],
                    board[8][6], board[8][7], board[8][8]]
        }
    }
    const getRow = rowId => {
        // Change indices
        switch (rowId) {
            case 0:
                return [
                    board[0][0], board[0][1], board[0][2],
                    board[1][0], board[1][1], board[1][2],
                    board[2][0], board[2][1], board[2][2]]
            case 1:
                return [
                    board[0][3], board[0][4], board[0][5],
                    board[1][3], board[1][4], board[1][5],
                    board[2][3], board[2][4], board[2][5]]
            case 2:
                return [
                    board[0][6], board[0][7], board[0][8],
                    board[1][6], board[1][7], board[1][8],
                    board[2][6], board[2][7], board[2][8]]
            case 3:
                return [
                    board[3][0], board[3][1], board[3][2],
                    board[4][0], board[4][1], board[4][2],
                    board[5][0], board[5][1], board[3][2]]
            case 4:
                return [
                    board[3][3], board[3][4], board[3][5],
                    board[4][3], board[4][4], board[4][5],
                    board[5][3], board[5][4], board[5][5]]
            case 5:
                return [
                    board[3][6], board[3][7], board[3][8],
                    board[4][6], board[4][7], board[4][8],
                    board[5][6], board[5][7], board[5][8]]
            case 6:
                return [
                    board[6][0], board[6][1], board[6][2],
                    board[7][0], board[7][1], board[7][2],
                    board[8][0], board[8][1], board[8][2]]
            case 7:
                return [
                    board[6][3], board[6][4], board[6][5],
                    board[7][3], board[7][4], board[7][5],
                    board[8][3], board[8][4], board[8][5]]
            case 8:
                return [
                    board[6][6], board[6][7], board[6][8],
                    board[7][6], board[7][7], board[7][8],
                    board[8][6], board[8][7], board[8][8]]
        }
    };
    const getColumn = columnId => {
        //Change indices
            switch (columnId) {
                case 0:
                    return [
                        board[0][0], board[0][1], board[0][2],
                        board[1][0], board[1][1], board[1][2],
                        board[2][0], board[2][1], board[2][2]]
                case 1:
                    return [
                        board[0][3], board[0][4], board[0][5],
                        board[1][3], board[1][4], board[1][5],
                        board[2][3], board[2][4], board[2][5]]
                case 2:
                    return [
                        board[0][6], board[0][7], board[0][8],
                        board[1][6], board[1][7], board[1][8],
                        board[2][6], board[2][7], board[2][8]]
                case 3:
                    return [
                        board[3][0], board[3][1], board[3][2],
                        board[4][0], board[4][1], board[4][2],
                        board[5][0], board[5][1], board[3][2]]
                case 4:
                    return [
                        board[3][3], board[3][4], board[3][5],
                        board[4][3], board[4][4], board[4][5],
                        board[5][3], board[5][4], board[5][5]]
                case 5:
                    return [
                        board[3][6], board[3][7], board[3][8],
                        board[4][6], board[4][7], board[4][8],
                        board[5][6], board[5][7], board[5][8]]
                case 6:
                    return [
                        board[6][0], board[6][1], board[6][2],
                        board[7][0], board[7][1], board[7][2],
                        board[8][0], board[8][1], board[8][2]]
                case 7:
                    return [
                        board[6][3], board[6][4], board[6][5],
                        board[7][3], board[7][4], board[7][5],
                        board[8][3], board[8][4], board[8][5]]
                case 8:
                    return [
                        board[6][6], board[6][7], board[6][8],
                        board[7][6], board[7][7], board[7][8],
                        board[8][6], board[8][7], board[8][8]]
            }
        };

    const handleTileClick = (squareId, tileId) => {
        console.log(squareId, tileId);
    }

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.row)}>
                <Square handleClick={handleTileClick} squareId={0} vals={getSquare(0)}/>
                <Divider orientation='vertical' style={{height: 'auto'}}/>
                <Square handleClick={handleTileClick}  squareId={1} vals={getSquare(1)}/>
                <Divider orientation='vertical' style={{height: 'auto'}}/>
                <Square handleClick={handleTileClick}  squareId={2} vals={getSquare(2)}/>
            </div>
            <Divider style={{width: 'auto'}}/>
            <div className={clsx(classes.row)}>
                <Square handleClick={handleTileClick}  squareId={3} vals={getSquare(3)}/>
                <Divider orientation='vertical' style={{height: 'auto'}}/>
                <Square handleClick={handleTileClick}  squareId={4} vals={getSquare(4)}/>
                <Divider orientation='vertical' style={{height: 'auto'}}/>
                <Square handleClick={handleTileClick}  squareId={5} vals={getSquare(5)}/>
            </div>
            <Divider style={{width: 'auto'}}/>
            <div className={clsx(classes.row)}>
                <Square handleClick={handleTileClick}  squareId={6} vals={getSquare(6)}/>
                <Divider orientation='vertical' style={{height: 'auto'}}/>
                <Square handleClick={handleTileClick}  squareId={7} vals={getSquare(7)}/>
                <Divider orientation='vertical' style={{height: 'auto'}}/>
                <Square handleClick={handleTileClick}  squareId={8} vals={getSquare(8)}/>
            </div>
        </div>
    );
};