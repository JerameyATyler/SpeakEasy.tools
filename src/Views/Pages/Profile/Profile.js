import React, {forwardRef, useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Theme} from "../../../utils";
import clsx from "clsx";
import {ViewWrapper} from "../../../Components/ViewWrapper";
import {GetStudentProfile, InsertStudent} from "../../../Queries";
import {ExpansionPanel, ExpansionPanelDetails, TextField} from "@material-ui/core";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import {Check, Clear, ExpandMore, Help} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import IconButton from "@material-ui/core/IconButton";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Edit from "@material-ui/icons/Edit";
import SaveAlt from "@material-ui/icons/SaveAlt";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import Search from "@material-ui/icons/Search";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Remove from "@material-ui/icons/Remove";
import ViewColumn from "@material-ui/icons/ViewColumn";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {useAuth} from "../../../Firebase/FirebaseAuth";

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
        overflow: 'auto'
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
        flex: '1 1 auto'
    },
    button: {
        '&:disabled': {
            backgroundColor: theme.palette.error.main
        }
    }
}));

export default () => {
    document.title = 'Profile';
    const classes = useStyles(Theme);

    const [userId, setUserId] = useState(null);

    const [profile,] = GetStudentProfile(userId);

    const [courseTabIndex, setCourseTabIndex] = useState(0);
    const [registrationCode, setRegistrationCode] = useState('');
    const [insertRegistrationCode, setInsertRegistrationCode] = useState(null);

    const [lessonTabIndex, setLessonTabIndex] = useState(0);
    const insertedId = InsertStudent(userId, insertRegistrationCode);

    const [courses, setCourses] = useState(null);

    const [lessons, setLessons] = useState(null);

    const [vocabulary, setVocabulary] = useState(null);
    const [vocabularyTabIndex, setVocabularyTabIndex] = useState(0);

    const [vocabularyWords, setVocabularyWords] = useState(null);

    const getData = vocabularyWords && Boolean(vocabularyWords.length) ? vocabularyWords.map(v => {
        return {
            word: v['translation']['vocabulary_1']['word'],
            wordLang: v['translation']['vocabulary_1']['language']['language_label'],
            translation: v['translation']['vocabulary_2']['word'],
            translationLang: v['translation']['vocabulary_2']['language']['language_label']
        }
    }) : [];

    const handleCourseChange = (e, v) => {
        setCourseTabIndex(v);
    };
    const handleLessonChange = (e, v) => {
        setLessonTabIndex(v);
    };
    const handleVocabularyTabChange = (e, v) => {
        setVocabularyTabIndex(v);
    };
    const handleAdd = () => {
        setInsertRegistrationCode(registrationCode);
    };
    const handleClear = () => {
        setRegistrationCode('');
        setInsertRegistrationCode(null);
    }

    useEffect(() => {
        if (!profile) return;
        setCourses([...profile.map(p => p['course'])]);
    }, [profile]);
    useEffect(() => {
        if (!insertedId) return;
        window.location.reload();
    }, [insertedId]);
    useEffect(() => {
        if (!(courses && (courses.length > courseTabIndex))) return;
        setLessons(courses[courseTabIndex]['lessons']);
    }, [courses, courseTabIndex]);
    useEffect(() => {
        if (!(lessons && (lessons.length > lessonTabIndex))) return;
        setVocabulary(lessons[lessonTabIndex]['vocabulary_lists']);
    }, [lessons, lessonTabIndex]);
    useEffect(() => {
        if(!(vocabulary && (vocabulary.length > vocabularyTabIndex))) return;
        setVocabularyWords(vocabulary[vocabularyTabIndex]['vocabulary_list_words']);
    }, [vocabulary, vocabularyTabIndex]);

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
                <div className={clsx(classes.pad)}>
                    <ExpansionPanel>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMore style={{color: Theme.palette.primary.main}}/>}
                            style={{backgroundColor: Theme.palette.secondary.main}}
                        >
                            <Typography
                                color='primary'
                                variant='h6'>
                                Courses
                            </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails style={{padding: Theme.spacing(0)}}>
                            <Tabs
                                value={courseTabIndex}
                                onChange={handleCourseChange}
                                variant='scrollable'
                                style={{
                                    backgroundColor: Theme.palette.secondary.light
                                }}
                                orientation='vertical'
                            >
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
                                <Tab label={<Typography color='primary'> Register Course</Typography>}/>
                            </Tabs>
                            <div className={clsx(classes.column)}>
                                <div className={clsx(classes.row)}>
                                    <div className={clsx(classes.pad)}>
                                        {!(courses && courses.length > courseTabIndex) ? (
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
                                        ) : (

                                            <TextField
                                                label='Course Description'
                                                value={courses[courseTabIndex]['description']}
                                                disabled
                                            />
                                        )}
                                    </div>
                                    <div className={clsx(classes.pad)}>
                                        <TextField
                                            label='Registration Code'
                                            value={courses && courses.length > courseTabIndex ? courses[courseTabIndex].registration_code : registrationCode}
                                            disabled={courses && courses.length > courseTabIndex}
                                            onChange={e => setRegistrationCode(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className={clsx(classes.root)}>
                                    <div className={clsx(classes.row)}>
                                        <div className={clsx(classes.pad)}>
                                            <ExpansionPanel>
                                                <ExpansionPanelSummary
                                                    expandIcon={<ExpandMore
                                                        style={{color: Theme.palette.primary.main}}/>}
                                                    style={{backgroundColor: Theme.palette.secondary.main}}
                                                >
                                                    <Typography
                                                        color='primary'
                                                        variant='h6'
                                                    >
                                                        Lessons
                                                    </Typography>
                                                </ExpansionPanelSummary>
                                                <ExpansionPanelDetails style={{padding: Theme.spacing(0)}}>
                                                    <Tabs
                                                        value={lessonTabIndex}
                                                        onChange={handleLessonChange}
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
                                                                    <Typography
                                                                        color='primary'
                                                                    >
                                                                        {l.name}
                                                                    </Typography>
                                                                }
                                                                style={{color: Theme.palette.primary.main}}
                                                            />
                                                        ))}
                                                    </Tabs>
                                                    <div className={clsx(classes.column)}>
                                                        <div className={clsx(classes.row)}>
                                                            <div className={clsx(classes.pad)}>
                                                                <TextField
                                                                    label='Lesson Description'
                                                                    value={lessons && lessons.length > lessonTabIndex ? lessons[lessonTabIndex].description : ''}
                                                                    disabled
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className={clsx(classes.root)}>
                                                            <div className={clsx(classes.row)}>
                                                                <div className={clsx(classes.pad)}>
                                                                    <ExpansionPanel>
                                                                        <ExpansionPanelSummary
                                                                            expandIcon={<ExpandMore
                                                                                style={{color: Theme.palette.primary.main}}/>}
                                                                            style={{backgroundColor: Theme.palette.secondary.main}}
                                                                        >
                                                                            <Typography
                                                                                color='primary'
                                                                                variant='h6'
                                                                            >
                                                                                Vocabulary Lists
                                                                            </Typography>
                                                                        </ExpansionPanelSummary>
                                                                        <ExpansionPanelDetails
                                                                            style={{padding: Theme.spacing(0)}}>
                                                                            <Tabs
                                                                                value={vocabularyTabIndex}
                                                                                onChange={handleVocabularyTabChange}
                                                                                variant='scrollable'
                                                                                style={{
                                                                                    backgroundColor: Theme.palette.secondary.light,
                                                                                }}
                                                                                orientation='vertical'
                                                                            >
                                                                                {vocabulary && vocabulary.map(v => (
                                                                                    <Tab
                                                                                        key={v.id}
                                                                                        label={
                                                                                            <Typography
                                                                                                color='primary'
                                                                                            >
                                                                                                {v.name}
                                                                                            </Typography>
                                                                                        }
                                                                                        style={{color: Theme.palette.primary.main}}
                                                                                    />
                                                                                ))}
                                                                            </Tabs>
                                                                            <div className={clsx(classes.column)}>
                                                                                <div className={clsx(classes.row)}>
                                                                                    <div className={clsx(classes.pad)}>
                                                                                            <TextField
                                                                                                required
                                                                                                label='List Description'
                                                                                                value={vocabulary && vocabulary.length > vocabularyTabIndex ? vocabulary[vocabularyTabIndex].description : ''}
                                                                                                disabled
                                                                                            />
                                                                                    </div>
                                                                                </div>
                                                                                <div className={clsx(classes.root)}>
                                                                                    <div className={clsx(classes.row)}>
                                                                                        <div className={clsx(classes.pad)}>
                                                                                        <MaterialTable
                                                                                            columns={columns}
                                                                                            icons={tableIcons}
                                                                                            data={getData}
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </ExpansionPanelDetails>
                                                                    </ExpansionPanel>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </ExpansionPanelDetails>
                                            </ExpansionPanel>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </div>
            </div>
        </div>
    )
}