import React, {forwardRef, useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Theme} from "../../../utils";
import MaterialTable from "material-table";

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import {GetVocabulary, GetVocabularyListsWords, InsertVocabularyListsWords} from "../../../Queries";
import {TextField} from "@material-ui/core";
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
        width: 'auto',
        height: '90%'
    },
    content: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexFlow: 'row noWrap'
    },
    column: {
        height: '100%',
        display: 'flex',
        flexFlow: 'column noWrap',
    },
    row: {
        width: '100%',
        display: 'flex',
        alignItems: 'center'
    },
    pad: {
        padding: theme.spacing(2),
    },
    button: {
        '&:disabled': {
            backgroundColor: theme.palette.error.main
        }
    }
}));

export default ({vocabId}) => {
    const classes = useStyles(Theme);

    const [vocabularyListsWords,] = GetVocabularyListsWords(vocabId);

    const [newWord, setNewWord] = useState('');
    const [searchWord, setSearchWord] = useState(null);

    const [vocabularySearch, loading] = GetVocabulary(searchWord);
    const getData = vocabularyListsWords && Boolean(vocabularyListsWords.length) ? vocabularyListsWords.map(v => {
        return {
            word: v['translation']['vocabulary_1']['word'],
            wordLang: v['translation']['vocabulary_1']['language']['language_label'],
            translation: v['translation']['vocabulary_2']['word'],
            translationLang: v['translation']['vocabulary_2']['language']['language_label']
        }
    }) : [];

    const [translations, setTranslations] = useState([]);
    const [translation, setTranslation] = useState({});

    const [translationId, setTranslationId] = useState(null);
    const insertedWord = InsertVocabularyListsWords(vocabId, translationId);

    const handleWordChange = (event) => {
        setNewWord(event.target.value);
    };
    const handleTranslationChange = (event, value) => {
        setTranslation(value);
    };
    const handleAdd = () => {
        setTranslationId(translation['id']);
    };

    useEffect(() => {
        if (!(newWord && Boolean(newWord.length))) return;
        setSearchWord(newWord);
    }, [newWord]);
    useEffect(() => {
        if (!(vocabularyListsWords && Boolean(vocabularyListsWords))) return;
        console.log(vocabularyListsWords)
    }, [vocabularyListsWords]);
    useEffect(() => {
        if (!(vocabularySearch && Boolean(vocabularySearch.length))) return;
        setTranslations(vocabularySearch.map(v => {
            return {
                id: v['id'],
                language: v['vocabulary_1']['language']['language_label'] + ' -> ' + v['vocabulary_2']['language']['language_label'],
                translation: v['vocabulary_1']['word'] + ' -> ' + v['vocabulary_2']['word']
            }
        }));
    }, [vocabularySearch]);
    useEffect(() => {
        if (!insertedWord) return;
    }, [insertedWord]);

    const columns = [
        {
            title: 'Word',
            field: 'word',
            editComponent: props => (
                <TextField
                    autoFocus
                    value={newWord}
                    onChange={handleWordChange}
                    label='Search'
                />
            ),
            render: rowData => <TextField value={rowData.word} variant='outlined' label={rowData.wordLang} disabled/>
        },
        {
            title: 'Translation',
            field: 'translation',
            editComponent: props => (
                <Autocomplete
                    style={{width: 300}}
                    groupBy={option => option.language}
                    options={translations && Boolean(translations.length) ? translations : []}
                    getOptionLabel={option => option.translation}
                    renderInput={params => <TextField {...params} label='Translations' variant='outlined'/>}
                    onChange={handleTranslationChange}
                />
            ),
            render: rowData => <TextField value={rowData.translation} variant='outlined' label={rowData.translationLang}
                                          disabled/>
        }
    ];
    return (
        <div style={{maxWidth: '100%'}}>
            <MaterialTable
                columns={columns}
                icons={tableIcons}
                data={getData}
                editable={{
                    onRowAdd: newData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                handleAdd();
                                resolve();
                            }, 1000)
                        })
                }}
                options={{
                    actionsColumnIndex: -1
                }}
            />
        </div>
    );
};