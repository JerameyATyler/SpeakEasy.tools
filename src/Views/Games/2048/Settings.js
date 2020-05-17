import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Theme} from "../../../utils";
import clsx from "clsx";
import {TextField} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

const useStyles = makeStyles(theme => ({
    root: {},
    column: {},
    pad: {}
}));

const languages = [{text: 'English'}, {text: 'Pinyin'}, {text: 'Chinese'}, {text: 'Adaptive'}, {text: 'Chaos'}];
export default (language, setLanguage) => {
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
            </div>
        </div>
    )
}