import React, {useState} from "react";
import TableCell from "@material-ui/core/TableCell";
import {Theme} from '../../Components/Theme';
import Input from "@material-ui/core/Input";
import {Typography} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import TableRow from "@material-ui/core/TableRow";
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import Add from '@material-ui/icons/Add';
import Clear from '@material-ui/icons/Clear';
import Check from '@material-ui/icons/Check';
import gql from "graphql-tag";
import {useMutation} from "@apollo/react-hooks";
import {columns} from "./Header";

const Row = (props) => {
    const lesson = props.data;
    const DELETE_LESSON = gql`
    mutation DeleteLesson($id: Int!) {
      delete_lessons(where: {id: {_eq: $id}}) {
        affected_rows
      }
    }
    `;

    const [deleteLessonMutation] = useMutation(DELETE_LESSON,
        {
            onCompleted(){window.location.reload();}
        });

    const deleteLesson = e => {
        e.preventDefault();
        e.stopPropagation();
        deleteLessonMutation({
            variables: {id: lesson.id}
        });
    };

    const [edit, setEdit] = useState(false);


    return (
        <TableRow hover role='checkbox' tabIndex={-1} key={lesson.id}>
            {columns.slice(0, 6).map(column => (
                <TableCell
                key={column.id}
                style={{
                    minWidth: column.minWidth,
                    color: Theme.palette.secondary.contrastText,
                }}
                >
                    {edit &&
                    <Input
                        defaultValue={lesson[column.id]}
                        style={{color: Theme.palette.secondary.contrastText}}
                    />
                    }
                    {!edit &&
                        <Typography
                            variant='subtitle1'
                            >
                            {lesson[column.id]}
                        </Typography>
                    }
                </TableCell>
            ))}
            <TableCell
                key='wav'
                style={{
                    minWidth: 85,
                    color: Theme.palette.secondary.contrastText
                }}
            >

                <IconButton
                    style={{color: Theme.palette.secondary.contrastText}}
                >
                    {
                        edit ?
                            <Add/>
                            :
                            <RecordVoiceOverIcon/>
                    }
                </IconButton>
            </TableCell>
            <TableCell
                key='edit'
                style={{
                    minWidth: 85,
                }}
            >
                <IconButton
                    style={{color: Theme.palette.secondary.contrastText}}
                    onClick={() => setEdit(!edit)}
                >
                    {
                        edit ?
                            <Clear/>
                            :
                            <Edit/>
                    }
                </IconButton>
            </TableCell>
            <TableCell
                key='delete'
                style={{
                    minWidth: 85,
                }}
            >
                {
                    edit ?
                        <IconButton
                            style={{color: Theme.palette.secondary.contrastText}}
                        >
                            <Check/>
                        </IconButton>
                        :
                        <IconButton
                            style={{color: Theme.palette.secondary.contrastText}}
                            onClick={deleteLesson}
                        >
                            <Delete/>
                        </IconButton>
                }
            </TableCell>
        </TableRow>
    )
};

export default Row;