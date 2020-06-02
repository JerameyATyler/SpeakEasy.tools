import React, {forwardRef, useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Theme} from "../../../utils";
import clsx from "clsx";
import {ViewWrapper} from "../../../Components/ViewWrapper";
import {CircularProgress, TextField} from "@material-ui/core";
import {Search} from "@material-ui/icons";
import {GetVocabulary} from "../../../Queries";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import Check from "@material-ui/icons/Check";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Edit from "@material-ui/icons/Edit";
import SaveAlt from "@material-ui/icons/SaveAlt";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Remove from "@material-ui/icons/Remove";
import ViewColumn from "@material-ui/icons/ViewColumn";
import Autocomplete from "@material-ui/lab/Autocomplete";

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref}/>),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref}/>),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref}/>),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref}/>),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref}/>),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref}/>),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref}/>),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref}/>),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref}/>),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref}/>),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref}/>),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref}/>),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref}/>)
};

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
        justifyContent: 'center',
        alignItems: 'center'
    },
    pad: {
        padding: theme.spacing(1),
    }
}));

export default () => {
    document.title = 'Dictionary';
    const classes = useStyles(Theme);

    const [newWord, setNewWord] = useState('');
    const [searchWord, setSearchWord] = useState(null);

    const [vocabulary, loading] = GetVocabulary(searchWord);
    const getData = vocabulary && Boolean(vocabulary.length) ? vocabulary.map(v => {
        return {
            word: v['vocabulary_1']['word'],
            wordLang: v['vocabulary_1']['language']['language_label'],
            translation: v['vocabulary_2']['word'],
            translationLang: v['vocabulary_2']['language']['language_label'],
        }
    }) : [];

    const handleWordChange = (event) => {
        setNewWord(event.target.value);
    };

    useEffect(() => {
        if (!(newWord && Boolean(newWord.length))) return;
        setSearchWord(newWord);
    }, [newWord]);
    useEffect(() => {
        if(!(vocabulary && Boolean(vocabulary.length)))return;
    }, [vocabulary])
    const columns = [
        {
            title: 'Word',
            field: 'word',
            render: rowData => <TextField value={rowData.word} variant='outlined' label={rowData.wordLang} disabled/>
        },
        {
            title: 'Translation',
            field: 'translation',
            render: rowData => <TextField value={rowData.translation} variant='outlined' label={rowData.translationLang}
                                          disabled/>
        }
    ];

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.row)}>
                <ViewWrapper/>
            </div>
            <div className={clsx(classes.content)}>
                <div className={clsx(classes.row)}>
                    <div className={clsx(classes.pad)}>
                        <Search/>
                    </div>
                    <div className={clsx(classes.pad)}>
                        <TextField
                            autoFocus
                            value={newWord}
                            onChange={handleWordChange}
                            style={{color: Theme.palette.primary.contrastText, width: 300}}
                            label='Search Dictionary'
                        />
                    </div>
                    {loading && (
                        <div className={clsx(classes.pad)}>
                            <CircularProgress style={{color: Theme.palette.secondary.main}}/>
                        </div>
                    )}
                </div>
                <div className={clsx(classes.row)} >
                    <div className={clsx(classes.pad)} style={{maxWidth: '100%'}}>
                        <MaterialTable
                            columns={columns}
                            icons={tableIcons}
                            data={getData}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}