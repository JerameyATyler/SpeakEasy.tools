import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Theme} from "../../../utils";
import clsx from "clsx";
import {ViewWrapper} from "../../../Components/ViewWrapper";
import {TextField} from "@material-ui/core";
import {Search} from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
    },
    content: {
        padding: theme.spacing(1),
        flex: '1 1 100%',
        height: '100%',
        display: 'flex',
        flexFlow: 'column noWrap',
    },
    row: {
        width: '100%',
        display: 'flex',
    },
    pad: {
        margin: theme.spacing(1),
        padding: theme.spacing(1),
    }
}));

export default () => {
    document.title = 'Dictionary';
    const classes = useStyles(Theme);

    const [searchWord, setSearchWord] = useState('');

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.row)}>
                <ViewWrapper/>
            </div>
            <div className={clsx(classes.content)}>
                <div className={clsx(classes.row)} style={{justifyContent: 'center', alignItems: 'center'}}>
                    <div className={clsx(classes.pad)}>
                        <Search/>
                        <TextField
                            value={searchWord}
                            onChange={e => setSearchWord(e.target.value)}
                            style={{color: Theme.palette.primary.contrastText, width: 300}}
                            placeholder='Search Dictionary'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}