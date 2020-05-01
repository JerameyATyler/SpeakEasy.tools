import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Theme} from "../../utils";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import {TextField} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";
import {Casino} from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
    root: {},
    column: {},
    pad: {
        padding: theme.spacing(1)
    }
}));

const languages = [{text: 'Traditional Chinese'}, {text: 'Simplified Chinese'}, {text: 'Pinyin'}, {text: 'English'}];
const words = [{text: 'word'}];
const pastAttempts = [{text: 'text'}];
export default () => {
    const classes = useStyles(Theme);


    const [language, setLanguage] = useState(null);
    const [word, setWord] = useState(null);
    const [native, setNative] = useState(null);
    const [pastAttempt, setPastAttempt] = useState(null);

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.column)}>
                <div className={clsx(classes.pad)}>
                    <Autocomplete
                        id='language-select'
                        options={languages}
                        getOptionLabel={option => option.text}
                        style={{width: 200}}
                        onChange={(e, v) => setLanguage(v)}
                        renderInput={params => <TextField {...params} label='Select search language' margin='none'/>}
                    />
                </div>
                <div className={clsx(classes.pad)}>
                    <Autocomplete
                        id='word-select'
                        options={words}
                        getOptionLabel={option => option.text}
                        style={{width: 200}}
                        onChange={(e, v) => setWord(v)}
                        renderInput={params => <TextField {...params} label='Select word' margin='none'/>}
                    />
                </div>
                <div className={clsx(classes.pad)}>
                    <Autocomplete
                        id='past-attempt-select'
                        options={pastAttempts}
                        getOptionLabel={option => option.text}
                        style={{width: 200}}
                        onChange={(e, v) => setPastAttempt(v)}
                        renderInput={params => <TextField {...params} label='Select past attempt' margin='none'/>}
                    />
                </div>
                <div className={clsx(classes.pad)}>
                    <Button style={{backgroundColor: Theme.palette.primary.main}}>
                        <div className={clsx(classes.pad)}>
                            <Casino style={{color: Theme.palette.primary.contrastText}}/>
                        </div>
                        <div className={clsx(classes.pad)}>
                            <Typography variant='h6'
                                        style={{color: Theme.palette.primary.contrastText}}
                            >Change Speaker</Typography></div>
                    </Button>
                </div>
            </div>
        </div>
    )
}