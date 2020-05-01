import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Theme} from "../../utils";
import clsx from "clsx";
import {useAuth0} from "../../react-auth0-spa";
import {DeleteCourse, GetCourses, InsertCourse, UpdateCourse} from "../../Queries";
import Typography from "@material-ui/core/Typography";
import {Add, Check, Clear, Delete, Edit, Help} from "@material-ui/icons";
import {TextField} from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import LessonsPanel from "./LessonsPanel";
import IconButton from "@material-ui/core/IconButton";
import {generate} from 'shortid';
import StudentsPanel from "./StudentsPanel";

const useStyles = makeStyles(theme => ({
    root: {
        width: 'auto',
        height: '90%',
        backgroundColor: theme.palette.primary.dark,
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
        padding: theme.spacing(1),
    },
    button: {
        '&:disabled': {
            backgroundColor: theme.palette.error.main
        }
    }
}));

export default () => {
    const classes = useStyles(Theme);

    const {user} = useAuth0();
    const [userId, setUserId] = useState(null);

    const [courses,] = GetCourses(userId);
    const [courseId, setCourseId] = useState(null);

    const [tabIndex, setTabIndex] = useState(0);

    const [newName, setNewName] = useState('');
    const [newDescription, setNewDescription] = useState('');

    const [insertName, setInsertName] = useState(null);
    const [insertDescription, setInsertDescription] = useState(null);
    const [insertRegistration, setInsertRegistration] = useState(null);

    const insertedId = InsertCourse(userId, insertName, insertDescription, insertRegistration);

    const [deleteId, setDeleteId] = useState(null);
    const deletedRows = DeleteCourse(deleteId);

    const [edit, setEdit] = useState(false);
    const [editName, setEditName] = useState(null);
    const [editDescription, setEditDescription] = useState(null);

    const editedRows = UpdateCourse(courseId, editName, editDescription);

    const getRegistrationCode = () => {
        return generate();
    };

    const handleTabChange = (e, v) => {
        setTabIndex(v);
    };
    const handleDelete = cId => {
        if (window.confirm("Are you sure you want to delete this course? All associated data will be deleted.")) {
            setDeleteId(cId);
        }
    };
    const handleAdd = () => {
        setInsertRegistration(getRegistrationCode());
        setInsertName(newName);
        setInsertDescription(newDescription);
    };
    const handleClear = () => {
        setNewName('');
        setNewDescription('');
        setInsertName(null);
        setInsertDescription(null);
        setInsertRegistration(null);
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
        if (!user) return;
        setUserId(user.sub);
    }, [user]);
    useEffect(() => {
        if (!(courses && courses.length > tabIndex)) {
            setCourseId(null);
            handleClear();
            handleCancel();
            return;
        }
        setCourseId(courses[tabIndex].id);
    }, [courses, tabIndex]);
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
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.row)}
                 style={{
                     backgroundColor: Theme.palette.secondary.main,
                 }}
            >
                <div className={clsx(classes.pad)}>
                    <Typography
                        color='primary'
                        variant='h6'
                    >
                        Courses
                    </Typography>
                </div>
            </div>
            <div className={clsx(classes.content)}>
                    <Tabs
                        value={tabIndex}
                        onChange={handleTabChange}
                        variant='scrollable'
                        orientation='vertical'
                        style={{
                            backgroundColor: Theme.palette.secondary.light,
                        }}>
                        {courses && courses.map(c => (
                            <Tab
                                key={c.id}
                                label={
                                    <>
                                        {
                                            edit && (c.id === courses[tabIndex].id) ? (
                                                <TextField
                                                    required
                                                    label='Edit Course Name'
                                                    placeholder='Course Name'
                                                    defaultValue={c.name}
                                                    onChange={e => setNewName(e.target.value)}
                                                />
                                            ) : (
                                                <Typography
                                                    color='primary'
                                                >
                                                    {c.name}
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
                                    courses && courses.length <= tabIndex ? (
                                        <TextField
                                            required
                                            label='Add Course'
                                            placeholder='Course Name'
                                            value={newName}
                                            onChange={e => setNewName(e.target.value)}
                                        />
                                    ) : (
                                        <Typography
                                            color='primary'
                                        >
                                            Add Course
                                        </Typography>
                                    )}
                                <Add style={{color: Theme.palette.primary.main}}/>
                            </>
                        }/>
                    </Tabs>
                <div className={clsx(classes.column)}>
                    <div className={clsx(classes.row)}>
                        <div>
                            {courses && courses.length <= tabIndex ? (
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
                                                onClick={() => handleDelete(courses[tabIndex].id)}
                                            >
                                                <Delete/>
                                            </IconButton>
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                        <div className={clsx(classes.pad)}>
                            {(courses && courses.length <= tabIndex) ? (
                                <TextField
                                    required
                                    label='Course Description'
                                    value={newDescription}
                                    onChange={e => setNewDescription(e.target.value)}
                                />
                            ) : (
                                <>
                                    {courses && courses.length > tabIndex && (
                                        <>
                                            {edit ? (
                                                <TextField
                                                    required
                                                    label='Course Description'
                                                    defaultValue={courses[tabIndex].description}
                                                    onChange={e => setNewDescription(e.target.value)}
                                                    multiline
                                                    rowsMax={3}
                                                />
                                            ) : (
                                                <TextField
                                                    required
                                                    label='Course Description'
                                                    defaultValue={courses[tabIndex].description}
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
                        {courses && courses.length > tabIndex && (
                            <div className={clsx(classes.pad)}>
                                <TextField
                                    label='Registration Code'
                                    value={courses && courses.length > tabIndex ? courses[tabIndex].registration_code : ''}
                                />
                            </div>
                        )}
                    </div>
                    {courseId && userId && (
                        <div className={clsx(classes.pad)}>
                            <LessonsPanel courseId={courseId} userId={userId}/>
                            <StudentsPanel courseId={courseId}/>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}