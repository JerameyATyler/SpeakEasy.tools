import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Theme} from "../../utils";
import clsx from "clsx";
import {GetLessons, GetStudents} from "../../Queries";
import Typography from "@material-ui/core/Typography";
import {ExpandMore, Grade} from "@material-ui/icons";
import {ExpansionPanel, ExpansionPanelDetails, TableCell} from "@material-ui/core";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import {v4 as uuid} from 'uuid';
import IconButton from "@material-ui/core/IconButton";

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

export default ({courseId}) => {
    const classes = useStyles(Theme);

    const [students,] = GetStudents(courseId);
    const [lessons,] = GetLessons(courseId);

    return (
        <ExpansionPanel>
            <ExpansionPanelSummary
                expandIcon={<ExpandMore style={{color: Theme.palette.primary.main}}/>}
                style={{backgroundColor: Theme.palette.secondary.main}}
            >
                <Typography
                    color='primary'
                    variant='h6'>
                    Students
                </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails style={{padding: Theme.spacing(0)}}>
                <div className={clsx(classes.column)}>
                    <div className={clsx(classes.pad)}>
                        <TableContainer component={Paper}>
                            <Table className={clsx(classes.table)} aria-label='students table'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell
                                        >
                                        </TableCell>
                                        {lessons && lessons.map(l => (
                                            <TableCell key={uuid()}>Lesson: {l.name}</TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {students && students.map(s => (
                                        <TableRow key={uuid()}>
                                            <TableCell>{s['user']['name']}</TableCell>
                                            {lessons && lessons.map(l => (
                                                <TableCell key={uuid()}>
                                                    <div className={clsx(classes.pad)}>
                                                        <IconButton>
                                                            <Grade/>
                                                        </IconButton>
                                                    </div>
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
};