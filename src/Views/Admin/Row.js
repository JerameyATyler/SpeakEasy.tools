import React, {useState} from "react";
import TableCell from "@material-ui/core/TableCell";
import {Theme} from '../../Components/Theme';
import Input from "@material-ui/core/Input";
import {makeStyles, Typography} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import TableRow from "@material-ui/core/TableRow";
import HearingIcon from '@material-ui/icons/Hearing';
import Clear from '@material-ui/icons/Clear';
import Check from '@material-ui/icons/Check';
import gql from "graphql-tag";
import {useMutation} from "@apollo/react-hooks";
import {columns} from "./Header";
import Modal from "@material-ui/core/Modal";
import SampleCarousel from "./SampleCarousel";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
    carousel: {
        display: 'flex',
        width: '90%',
        height: '90%',
        justifyContent: 'center',
        alignContent: 'center'
    },
    modal: {
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
}));

const Row = ({data}) => {
    const classes = useStyles(Theme);

    const DELETE_LESSON = gql`
    mutation DeleteLesson($id: Int!) {
      delete_lessons(where: {id: {_eq: $id}}) {
        affected_rows
      }
    }
    `;

    const [deleteLessonMutation] = useMutation(DELETE_LESSON,
        {
            onCompleted() {
                window.location.reload();
            }
        });

    const deleteLesson = e => {
        e.preventDefault();
        e.stopPropagation();
        deleteLessonMutation({
            variables: {id: data.id}
        });
    };

    const [edit, setEdit] = useState(false);
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <TableRow hover role='checkbox' tabIndex={-1} key={data.id}>
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
                        defaultValue={data[column.id]}
                        style={{color: Theme.palette.secondary.contrastText}}
                    />
                    }
                    {!edit &&
                    <Typography
                        variant='subtitle1'
                    >
                        {data[column.id]}
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
                    onClick={handleOpen}
                >
                    <HearingIcon/>
                </IconButton>
                <Modal
                    open={open}
                    onClose={handleClose}
                    className={clsx(classes.modal)}
                >
                    <div className={clsx(classes.carousel)}>
                        {open && <SampleCarousel samples={data.samples}/>}
                    </div>
                </Modal>
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