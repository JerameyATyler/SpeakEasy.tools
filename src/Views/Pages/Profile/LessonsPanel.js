import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Theme} from "../../../utils";
import clsx from "clsx";
import {GetLessons} from "../../../Queries";
import Typography from "@material-ui/core/Typography";
import {ExpandMore} from "@material-ui/icons";
import {ExpansionPanel, ExpansionPanelDetails, TextField} from "@material-ui/core";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import VocabPanel from "./VocabPanel";
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

    const handleTabChange = (e, v) => {
        setTabIndex(v);
    };

    useEffect(() => {
        if (!(lessons && lessons.length > tabIndex)) {
            setLessonId(null);
            return;
        }
        setLessonId(lessons[tabIndex].id);
    }, [lessons, tabIndex]);

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
                            {(lessons && lessons.length <= tabIndex) && (
                                <TextField
                                    required
                                    label='Lesson Description'
                                    value={lessons[tabIndex].description}
                                />
                            )}
                        </div>
                    </div>
                    {courseId && lessonId && userId && (
                        <div className={clsx(classes.pad)}>
                            <VocabPanel courseId={courseId} lessonId={lessonId} userId={userId}/>
                            <AssignmentsPanel courseId={courseId} lessonId={lessonId} userId={userId}/>
                        </div>
                    )}
                </div>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
};