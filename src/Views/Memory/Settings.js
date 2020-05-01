import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Theme} from "../../utils";
import clsx from "clsx";
import {TextField} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

const useStyles = makeStyles(theme => ({
    root: {},
    column: {},
    pad: {}
}));

const languages = [{text: 'English'}, {text: 'Pinyin'}, {text: 'Chinese'}, {text: 'Hybrid'}, {text: 'Chaos'}];
const boardSizes = [{size: '12'}, {size: '24'}, {size: '36'}, {size: '48'}];
export default (language, setLanguage, boardSize, setBoardSize) => {
    const classes = useStyles(Theme);

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.column)}>
                <div className={clsx(classes.pad)}>
                    <Autocomplete
                        id='language-select'
                        options={languages}
                        value={language}
                        getOptionLabel={option => option.text}
                        style={{width: 150}}
                        onChange={(e, v) => setLanguage(v)}
                        renderInput={params => <TextField {...params} label='Select language' margin='none'/>}
                    />
                </div>
                <div className={clsx(classes.pad)}>
                    <Autocomplete
                        id='board-size-select'
                        options={boardSizes}
                        value={boardSize}
                        getOptionLabel={option => option.size}
                        style={{width: 150}}
                        onChange={(e, v) => setBoardSize(v)}
                        renderInput={params => <TextField {...params} label='Select board size' margin='none'/>}
                    />
                </div>
            </div>
        </div>
    )
}