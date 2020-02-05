import React, {useState} from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import {Theme} from "../../Components/Theme";
import IconButton from "@material-ui/core/IconButton";
import AddBox from "@material-ui/icons/AddBox";
import Input from "@material-ui/core/Input";
import Check from "@material-ui/icons/Check";
import Cancel from '@material-ui/icons/Cancel';
import {columns} from "./Header";
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import gql from 'graphql-tag';
import {useMutation} from "@apollo/react-hooks";
import {useAuth0} from "../../react-auth0-spa";


const AddRow = () => {
    const {user} = useAuth0();
    const [state, setstate] = useState({
        chinese: null,
        pinyin: null,
        english: null,
        synonyms: null,
        tone: null,
        audio: null,
        user_id: user.sub,
    });

    const INSERT_LESSON = gql`
    mutation DeleteLesson(
        $category: String!,
        $chinese: String!,
        $pinyin: String!,
        $english: String!,
        $synonyms: String,
        $tone: Int,
        $audio: String,
        $user_id: String!
    ) {
      insert_lessons(objects: {
        category: $category, 
        chinese: $chinese, 
        pinyin: $pinyin, 
        english: $english, 
        synonyms: $synonyms, 
        tone: $tone, 
        audio: $audio,
        user_id: $user_id
        }) {
        affected_rows
      }
    }
    `;

    const [insertLessonMutation] = useMutation(INSERT_LESSON,
        {
            onCompleted(){window.location.reload();}
        });

    const insertLesson = e => {
        e.preventDefault();
        e.stopPropagation();
        insertLessonMutation({
            variables: {...state}
        });
    };
    const [add, setAdd] = useState(false);

    const handleChange = (event, column) => {
        const newState = state;
        newState[column] = event.target.value;
        setstate(newState);
    };

    return (
        <TableRow hover role='checkbox' tabIndex={-1} key='add'>
            {columns.slice(0, 6).map(column => (
                <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                        minWidth: column.minWidth,
                        color: Theme.palette.secondary.contrastText,
                    }}
                >
                    {add && column.required &&
                    <Input required
                           defaultValue={state[column.id]}
                           style={
                               {
                                   minWidth: column.minWidth,
                                   color: Theme.palette.secondary.contrastText
                               }
                           }
                           onChange={event => handleChange(event, column.id)}
                    />
                    }
                    {add && !column.required &&
                    <Input
                        defaultValue={state[column.id]}
                        style={{color: Theme.palette.secondary.contrastText}}
                    />
                    }
                </TableCell>
            ))}
            <TableCell
                key='audio'
                style={{
                    minWidth: 85,
                    color: Theme.palette.secondary.contrastText
                }}
            >{
                add &&
                <IconButton
                    style={{color: Theme.palette.secondary.contrastText}}
                >
                    <RecordVoiceOverIcon/>
                </IconButton>
            }
            </TableCell>
            <TableCell
                key='edit'
                style={{
                    minWidth: 85,
                }}
            >{
                add ?
                <IconButton
                    style={{color: Theme.palette.secondary.contrastText}}
                    onClick={insertLesson}
                >
                    <Check/>
                </IconButton>
                    :
                    <IconButton
                    style={{color: Theme.palette.secondary.contrastText}}
                onClick={() => setAdd(true)}
                >
                <AddBox/>
                </IconButton>
            }
            </TableCell>
            <TableCell
                key='delete'
                style={{
                    minWidth: 85,
                }}
            >{
                add &&
                    <IconButton
                        style={{color: Theme.palette.secondary.contrastText}}
                        onClick={() => {
                            setstate({
                                chinese: null,
                                pinyin: null,
                                english: null,
                                synonyms: null,
                                tone: null,
                                audio: null,
                            });
                            setAdd(false);
                        }}
                    >
                        <Cancel/>
                    </IconButton>
            }
            </TableCell>
        </TableRow>
    );
};

export default AddRow;