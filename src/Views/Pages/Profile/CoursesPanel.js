import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Theme} from "../../../utils";
import clsx from "clsx";
import {useAuth0} from "../../../react-auth0-spa";
import {GetStudentsCourses, InsertStudent} from "../../../Queries";
import Typography from "@material-ui/core/Typography";
import {Add, Check, Clear, Help} from "@material-ui/icons";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import IconButton from "@material-ui/core/IconButton";
import {TextField} from "@material-ui/core";
import LessonsPanel from "./LessonsPanel";

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

    const [courses,] = GetStudentsCourses(userId);
    const [courseId, setCourseId] = useState(null);

    const [registrationCode, setRegistrationCode] = useState('');
    const [insertRegistrationCode, setInsertRegistrationCode] = useState(null);

    const insertedId = InsertStudent(userId, insertRegistrationCode);

    const [tabIndex, setTabIndex] = useState(0);

    const handleTabChange = (e, v) => {
        setTabIndex(v);
    };

    const handleAdd = () => {
        setInsertRegistrationCode(registrationCode);
    };
    const handleClear = () => {
        setRegistrationCode('');
        setInsertRegistrationCode(null);
    };

    useEffect(() => {
        if (!user) return;
        setUserId(user.sub);
    }, [user]);
    useEffect(() => {
        if (!(courses && courses.length > tabIndex)) {
            setCourseId(null);
            return;
        }
        setCourseId(courses[tabIndex].id);
    }, [courses, tabIndex]);
    useEffect(() => {
        if (!insertedId) return;
        window.location.reload();
    }, [insertedId]);

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
                                <Typography
                                    color='primary'
                                >
                                    {c.name}
                                </Typography>
                            }
                            style={{color: Theme.palette.primary.main}}
                        />
                    ))}
                    <Tab label={
                        <>
                            <Typography
                                color='primary'
                            >
                                Register Course
                            </Typography>

                            <Add style={{color: Theme.palette.primary.main}}/>
                        </>
                    }/>
                </Tabs>
                <div className={clsx(classes.column)}>
                    <div className={clsx(classes.row)}>
                        <div className={clsx(classes.pad)}>
                            {courses && courses.length > tabIndex ? (
                                <>
                                    <IconButton>
                                        <Help style={{color: Theme.palette.secondary.main}}/>
                                    </IconButton>
                                </>
                            ) : (
                                <>
                                    <IconButton>
                                        <Help style={{color: Theme.palette.secondary.main}}/>
                                    </IconButton>
                                    <IconButton
                                        className={clsx(classes.button)}
                                        disabled={!registrationCode}
                                        onClick={handleAdd}
                                    >
                                        <Check style={{color: Theme.palette.secondary.main}}/>
                                    </IconButton>
                                    <IconButton
                                        onClick={handleClear}
                                    >
                                        <Clear style={{color: Theme.palette.secondary.main}}/>
                                    </IconButton>
                                </>
                            )}
                        </div>
                        <div className={clsx(classes.pad)}>
                            <TextField
                                label='Registration Code'
                                value={courses && courses.length > tabIndex ? courses[tabIndex].registration_code : registrationCode}
                                disabled={courses && courses.length > tabIndex}
                                onChange={e => setRegistrationCode(e.target.value)}
                            />
                        </div>
                        {(courses && courses.length > tabIndex) && (
                            <div className={clsx(classes.pad)}>
                                <TextField
                                    label='Course Description'
                                    value={courses[tabIndex].description}
                                />
                            </div>
                        )}
                    </div>
                    {courseId && userId && (
                        <div className={clsx(classes.pad)}>
                            <LessonsPanel courseId={courseId} userId={userId}/>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}