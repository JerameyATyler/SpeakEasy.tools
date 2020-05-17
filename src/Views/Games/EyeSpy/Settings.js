import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Theme} from "../../../utils";
import clsx from "clsx";
import {TextField} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {GetConfigsByName} from "../../../Queries";
import ParseConfig from "./ParseConfig";

const languages = [
    {
        language_code: 'zh-Hans',
        language_label: 'Chinese-Simplified'
    }, {
        language_code: 'en-US',
        language_label: 'English-US'
    }];
const modes = [{mode: 'Explore'}, {mode: 'Quiz'}];

const useStyles = makeStyles(theme => ({
    root: {},
    column: {},
    pad: {
        padding: theme.spacing(1),
    }
}));

export default ({language, setLanguage, mode, setMode, config, setConfig}) => {
    const classes = useStyles(Theme);

    const [configs,] = GetConfigsByName('eye-spy');
    const parsedConfigs = ParseConfig(configs);

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.column)}>
                <div className={clsx(classes.pad)}>
                    <Autocomplete
                        id='config-select'
                        autoHighlight
                        options={parsedConfigs || []}
                        value={config}
                        getOptionLabel={option => option.name}
                        style={{width: 300}}
                        onChange={(e, v) => setConfig(v)}
                        renderInput={params => <TextField {...params} label='Select Config' variant='outlined'
                                                          margin='none'/>}
                    />
                </div>
                <div className={clsx(classes.pad)}>
                    <Autocomplete
                        id='language-select'
                        autoHighlight
                        options={languages}
                        value={language}
                        getOptionLabel={option => option.language_label}
                        style={{width: 300}}
                        onChange={(e, v) => setLanguage(v)}
                        renderInput={params => <TextField {...params} label='Select language' variant='outlined'
                                                          margin='none'/>}
                    />
                </div>
                <div className={clsx(classes.pad)}>
                    <Autocomplete
                        id='mode-select'
                        autoHighlight
                        options={modes}
                        value={mode}
                        getOptionLabel={option => option.mode}
                        style={{width: 300}}
                        onChange={(e, v) => setMode(v)}
                        renderInput={params => <TextField {...params} label='Select Mode' variant='outlined'
                                                          margin='none'/>}
                    />
                </div>
            </div>
        </div>
    )
}