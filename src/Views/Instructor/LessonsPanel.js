import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Theme} from "../../utils";
import clsx from "clsx";
import {DeleteLesson, GetLessons, InsertLesson, UpdateLesson} from "../../Queries";
import Typography from "@material-ui/core/Typography";
import {Add, Check, Clear, Delete, Edit, ExpandMore, Help} from "@material-ui/icons";
import {ExpansionPanel, ExpansionPanelDetails, TextField} from "@material-ui/core";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import VocabPanel from "./VocabPanel";
import IconButton from "@material-ui/core/IconButton";
import AssignmentsPanel from "./AssignmentsPanel";

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

export default ({courseId, userId}) => {
    const classes = useStyles(Theme);

    const [lessons,] = GetLessons(courseId);
    const [lessonId, setLessonId] = useState(null);

    const [tabIndex, setTabIndex] = useState(0);

    const [newName, setNewName] = useState('');
    const [newDescription, setNewDescription] = useState('');

    const [insertName, setInsertName] = useState(null);
    const [insertDescription, setInsertDescription] = useState(null);

    const insertedId = InsertLesson(courseId, userId, insertName, insertDescription);

    const [deleteId, setDeleteId] = useState(null);
    const deletedRows = DeleteLesson(deleteId);

    const [edit, setEdit] = useState(false);
    const [editName, setEditName] = useState(null);
    const [editDescription, setEditDescription] = useState(null);

    const editedRows = UpdateLesson(lessonId, editName, editDescription);

    const handleTabChange = (e, v) => {
        setTabIndex(v);
    };
    const handleDelete = lId => {
        if (window.confirm("Are you sure you want to delete this lesson? All associated data will be deleted..")) {
            setDeleteId(lId);
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
        if (!(lessons && lessons.length > tabIndex)) {
            setLessonId(null);
            handleClear();
            handleCancel();
            return;
        }
        setLessonId(lessons[tabIndex].id);
    }, [lessons, tabIndex]);
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
                    Lessons
                </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails style={{padding: Theme.spacing(0)}}>
                <Tabs
                    value={tabIndex}
                    onChange={handleTabChange}
                    variant='scrollable'
                    style={{
                        backgroundColor: Theme.palette.secondary.light,
                    }}
                    orientation='vertical'
                >
                    {lessons && lessons.map(l => (
                        <Tab
                            key={l.id}
                            label={
                                <>
                                    {
                                        edit ? (
                                            <TextField
                                                required
                                                label='Edit Lesson Name'
                                                placeholder='Lesson Name'
                                                defaultValue={l.name}
                                                onChange={e => setNewName(e.target.value)}
                                            />
                                        ) : (
                                            <Typography
                                                color='primary'
                                            >
                                                {l.name}
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
                                lessons && lessons.length <= tabIndex ? (
                                    <TextField
                                        required
                                        label='Add Lesson'
                                        placeholder='Lesson Name'
                                        value={newName}
                                        onChange={e => setNewName(e.target.value)}
                                    />
                                ) : (
                                    <Typography
                                        color='primary'
                                    >
                                        Add Lesson
                                    </Typography>
                                )}
                            <Add style={{color: Theme.palette.primary.main}}/>
                        </>
                    }/>
                </Tabs>
                <div className={clsx(classes.column)}>
                    <div className={clsx(classes.row)}>
                        <div className={clsx(classes.pad)}>
                            {lessons && lessons.length <= tabIndex ? (
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
                                                onClick={() => handleDelete(lessons[tabIndex].id)}
                                            >
                                                <Delete/>
                                            </IconButton>
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                        <div className={clsx(classes.pad)}>
                            {(lessons && lessons.length <= tabIndex) ? (
                                <TextField
                                    required
                                    label='Lesson Description'
                                    value={newDescription}
                                    onChange={e => setNewDescription(e.target.value)}
                                />
                            ) : (
                                <>
                                    {lessons && lessons.length > tabIndex && (
                                        <>
                                            {edit ? (
                                                <TextField
                                                    required
                                                    label='Lessons Description'
                                                    defaultValue={lessons[tabIndex].description}
                                                    onChange={e => setNewDescription(e.target.value)}
                                                    multiline
                                                    rowsMax={3}
                                                />
                                            ) : (
                                                <TextField
                                                    required
                                                    label='Lessons Description'
                                                    defaultValue={lessons[tabIndex].description}
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
                    {courseId && lessonId && userId && (
                        <>
                            <div className={clsx(classes.pad)}>
                                <VocabPanel courseId={courseId} lessonId={lessonId} userId={userId}/>
                                <AssignmentsPanel courseId={courseId} lessonId={lessonId} userId={userId}/>
                            </div>
                        </>
                    )}
                </div>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
};