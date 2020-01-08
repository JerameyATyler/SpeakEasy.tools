import React, {useState} from "react";
import {GameWrapper} from "../../Components";
import ConfigBar from './ConfigBar';
import Instructions from './Instructions';
import {RenderBoard} from "./RenderBoard";

export const Memory = () => {
    const [state, setState] = useState({
        mode: 'chinese',
        boardSize: 12,
    });

    const [board, setBoard] = useState(null);

    const handleBoardLoad = newBoard => {
        if(board !== null){
            setBoard(null);
        }
        setBoard(newBoard);
    };

    return (
        <GameWrapper>
            <ConfigBar
                mode={state.mode}
                handleModeChange={e => {
                    const val = e.target.value;
                    setState(prevState => {return {...prevState, mode: val}});
                }}
                boardSize={state.boardSize}
                handleBoardSizeChange={e=>{
                    const val = e.target.value;
                    setState(prevState => {return {...prevState, boardSize: val}});
                }}
                setBoard={handleBoardLoad}
            />
            <Instructions/>
            {board && <RenderBoard
                board={board}
                mode={state.mode}
            />}
        </GameWrapper>
    );
};
