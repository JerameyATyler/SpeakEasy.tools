import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Theme} from "../../utils";
import clsx from "clsx";
import {DeleteVocabularyList, GetVocabularyLists, InsertVocabularyLists, UpdateVocabularyList} from "../../Queries";
import Typography from "@material-ui/core/Typography";
import {Add, Check, Clear, Delete, Edit, ExpandMore, Help} from "@material-ui/icons";
import {ExpansionPanel, ExpansionPanelDetails, TextField} from "@material-ui/core";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import IconButton from "@material-ui/core/IconButton";
import VocabTable from "./VocabTable";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: '100%'
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
        flex: '1 1 auto',
        padding: theme.spacing(1),
    },
    button: {
        '&:disabled': {
            backgroundColor: theme.palette.error.main
        }
    }
}));

export default ({courseId, lessonId, userId}) => {
    const classes = useStyles(Theme);

    const [vocab,] = GetVocabularyLists(lessonId);
    const [vocabId, setVocabId] = useState(null);
    const [vocabName, setVocabName] = useState(null);
    const [vocabDescription, setVocabDescription] = useState(null);

    const [translations, setTranslations] = useState(null);

    const [tabIndex, setTabIndex] = useState(0);

    const [newName, setNewName] = useState('');
    const [newDescription, setNewDescription] = useState('');

    const [insertName, setInsertName] = useState(null);
    const [insertDescription, setInsertDescription] = useState(null);

    const insertedId = InsertVocabularyLists(courseId, lessonId, userId, insertName, insertDescription, '[]');

    const [deleteId, setDeleteId] = useState(null);
    const deletedRows = DeleteVocabularyList(deleteId);

    const [edit, setEdit] = useState(false);
    const [editName, setEditName] = useState(null);
    const [editDescription, setEditDescription] = useState(null);

    const editedRows = UpdateVocabularyList(vocabId, editName, editDescription);

    const handleTabChange = (e, v) => {
        setTabIndex(v);
    };
    const handleDelete = vId => {
        if (window.confirm("Are you sure you want to delete this vocabulary list? All associated data will be deleted..")) {
            setDeleteId(vId);
        }
    };
    const handleAdd = () => {
        setInsertName(newName);
        setInsertDescription(newDescription);
    };
    const handleClear = () => {
        setNewName('');
        setNewDescription('');
        setInsertName(null);
        setInsertDescription(null);
    };
    const handleCancel = () => {
        setNewName('');
        setNewDescription('');
        setEditName(null);
        setEditDescription(null);
        setEdit(false);
    };
    const handleEdit = () => {
        setEditName(newName);
        setEditDescription(newDescription);
    };

    useEffect(() => {
        if (!(vocab && vocab.length > tabIndex)) {
            setVocabId(null);
            handleClear();
            handleCancel();
            return;
        }
        setVocabId(vocab[tabIndex].id);
        setTranslations(JSON.parse(vocab[tabIndex].translations));
        setVocabName(vocab[tabIndex].name);
        setVocabDescription(vocab[tabIndex].description);
    }, [vocab, tabIndex]);
    useEffect(() => {
        if (!deletedRows) return;
        window.location.reload();
    }, [deletedRows]);
    useEffect(() => {
        if (!insertedId) return;
        window.location.reload();
    }, [insertedId]);
    useEffect(() => {
        if (!editedRows) return;
        window.location.reload();
    }, [editedRows]);

    return (
        <ExpansionPanel>
            <ExpansionPanelSummary
                expandIcon={<ExpandMore style={{color: Theme.palette.primary.main}}/>}
                style={{backgroundColor: Theme.palette.secondary.main}}
            >
                <Typography
                    color='primary'
                    variant='h6'>
                    Assignments
                </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails style={{padding: Theme.spacing(0)}}>
                <Tabs
                    value={tabIndex}
                    onChange={handleTabChange}
                    variant='scrollable'
                    orientation='vertical'
                    style={{
                        backgroundColor: Theme.palette.secondary.light
                    }}
                >
                    {vocab && vocab.map(v => (
                        <Tab
                            key={v.id}
                            label={
                                <>
                                    {
                                        edit ? (
                                            <TextField
                                                required
                                                label='Edit Vocab Name'
                                                placeholder='Vocab List Name'
                                                defaultValue={v.name}
                                                onChange={e => setNewName(e.target.value)}
                                            />
                                        ) : (
                                            <Typography
                                                color='primary'
                                            >
                                                {v.name}
                                            </Typography>
                                        )}
                                </>
                            }
                            style={{color: Theme.palette.primary.main}}
                        />
                    ))}
                    <Tab label={
                        <>
                            {
                                vocab && vocab.length <= tabIndex ? (
                                    <TextField
                                        required
                                        label='Add Vocab List'
                                        placeholder='Vocab List Name'
                                        value={newName}
                                        onChange={e => setNewName(e.target.value)}
                                    />
                                ) : (
                                    <Typography
                                        color='primary'
                                    >
                                        Add Vocab List
                                    </Typography>
                                )}
                            <Add style={{color: Theme.palette.primary.main}}/>
                        </>
                    }/>
                </Tabs>
                <div className={clsx(classes.column)}>
                    <div className={clsx(classes.row)}>
                        <div className={clsx(classes.pad)}>
                            {vocab && vocab.length <= tabIndex ? (
                                <>
                                    <IconButton>
                                        <Help style={{color: Theme.palette.secondary.main}}/>
                                    </IconButton>
                                    <IconButton
                                        className={clsx(classes.button)}
                                        disabled={!(newName && newDescription)}
                                        onClick={handleAdd}
                                    >
                                        <Check/>
                                    </IconButton>
                                    <IconButton
                                        onClick={handleClear}
                                    >
                                        <Clear/>
                                    </IconButton>
                                </>
                            ) : (
                                <>
                                    {edit ? (
                                        <>
                                            <IconButton>
                                                <Help style={{color: Theme.palette.secondary.main}}/>
                                            </IconButton>
                                            <IconButton
                                                onClick={handleEdit}
                                            >
                                                <Check/>
                                            </IconButton>
                                            <IconButton
                                                onClick={handleCancel}
                                            >
                                                <Clear/>
                                            </IconButton>
                                        </>
                                    ) : (
                                        <>
                                            <IconButton>
                                                <Help style={{color: Theme.palette.secondary.main}}/>
                                            </IconButton>
                                            <IconButton
                                                onClick={() => setEdit(true)}
                                            >
                                                <Edit/>
                                            </IconButton>
                                            <IconButton
                                                onClick={() => handleDelete(vocab[tabIndex].id)}
                                            >
                                                <Delete/>
                                            </IconButton>
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                        <div className={clsx(classes.pad)}>
                            {(vocab && vocab.length <= tabIndex) ? (
                                <TextField
                                    required
                                    label='Vocab Description'
                                    value={newDescription}
                                    onChange={e => setNewDescription(e.target.value)}
                                />
                            ) : (
                                <>
                                    {vocab && vocab.length > tabIndex && (
                                        <>
                                            {edit ? (
                                                <TextField
                                                    required
                                                    label='Vocab Description'
                                                    defaultValue={vocab[tabIndex].description}
                                                    onChange={e => setNewDescription(e.target.value)}
                                                    multiline
                                                    rowsMax={3}
                                                />
                                            ) : (
                                                <TextField
                                                    required
                                                    label='Vocab Description'
                                                    defaultValue={vocab[tabIndex].description}
                                                    disabled
                                                    multiline
                                                    rowsMax={3}
                                                />
                                            )}
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                    {vocab && vocab.length > tabIndex && (
                        <div className={clsx(classes.pad)}>
                            <VocabTable vocabId={vocabId} vocabName={vocabName} vocabDescription={vocabDescription} translations={translations}/>
                        </div>
                    )}
                </div>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
};