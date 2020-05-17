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
import {GetVocabulary} from "../../../Queries";
import {CircularProgress, TextField} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import clsx from "clsx";

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

    const columns = [
        {
            title: 'Vocab Word',
            field: 'word',
            editComponent: props => (
                <TextField
                    value={newWord}
                    autoFocus
                    onChange={e => setNewWord(e.target.value)}
                    label='Vocabulary Word'
                    placeholder='Vocabulary Word'
                />
            )
        },
        {
            title: 'Translations',
            field: 'translations',
            editComponent: props => (
                <div className={clsx(classes.row)}>
                    {loading ? (
                        <div className={clsx(classes.pad)}>
                            <CircularProgress color='secondary'/>
                        </div>
                    ) : (
                        <Autocomplete
                            multiple
                            options={formattedVocabulary}
                            style={{width: 300}}
                            getOptionLabel={option => option.word}
                            groupBy={option => option.language}
                            renderInput={
                                params =>
                                    <TextField
                                        {...params}
                                        label='Translations'
                                        variant='outlined'
                                        placeholder='Translations'
                                    />
                            }
                        />
                    )}
                </div>
            ),
            render: rowData => (<Autocomplete
                multiple
                options={rowData.translations}
                style={{width: 300}}
                getOptionLabel={option => option.word}
                groupBy={option => option.language}
                renderInput={
                    params =>
                        <TextField
                            {...params}
                            label='Translations'
                            variant='outlined'
                            placeholder='Translations'
                        />
                }
            />)
        }
    ];

    const [searchWord, setSearchWord] = useState(null);

    const [newWord, setNewWord] = useState('');

    const [vocabulary, loading] = GetVocabulary(searchWord);
    const [formattedVocabulary, setFormattedVocabulary] = useState([]);

    const data = () => {
        let d = [];
        return d;
    }

    const handleAdd = () => {
    };

    useEffect(() => {
        if (!Boolean(newWord.length)) return;
        setSearchWord(newWord);
    }, [newWord]);
    useEffect(() => {
        if (!vocabulary) return;
        let v = [];
        Object.keys(vocabulary).forEach(k => vocabulary[k].forEach(w => v.push({language: k, word: w})));
        v = v.sort((a, b) => -b.word.localeCompare(a.word));
        v = v.sort((a, b) => -b.language.localeCompare(a.language));

        setFormattedVocabulary(v);
    }, [vocabulary]);

    return (
        <MaterialTable
            title='Vocab'
            icons={tableIcons}
            columns={columns}
            data={data()}
            editable={{
                onRowAdd: newData => new Promise(resolve => {
                    setTimeout(() => {
                        resolve();
                        handleAdd();
                    }, 600);
                }),
                onRowUpdate: (newData, oldData) => new Promise(resolve => {
                    setTimeout(() => {
                        resolve();
                        if (oldData) {

                        }
                    }, 600);
                }),
                onRowDelete: oldData => new Promise(resolve => {
                    setTimeout(() => {
                        resolve();
                    }, 600);
                }),
            }}
            options={{
                headerStyle: {
                    backgroundColor: Theme.palette.secondary.light,
                    color: Theme.palette.secondary.contrastText
                },
                rowStyle: {
                    backgroundColor: Theme.palette.primary.light,
                    color: Theme.palette.primary.contrastText
                }
            }}
            style={{
                backgroundColor: Theme.palette.primary.main,
                color: Theme.palette.primary.contrastText,
                minWidth: 500,
            }}
        />
    );
};