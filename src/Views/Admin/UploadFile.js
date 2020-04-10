import React from "react";
import clsx from "clsx";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Theme} from "../../Components";
import {useMutation} from "react-apollo";
import gql from 'graphql-tag';
import {useAuth0} from "../../react-auth0-spa";
import UploadIcon from '@material-ui/icons/Publish';
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import PapaParse from 'papaparse';

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


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    }
}));

const UploadFile = () => {
    const {user} = useAuth0();

    const [insertLessonMutation] = useMutation(INSERT_LESSON);

    const handleLoad = data => {
        data.map(row => {
                console.log(row.chinese, row.pinyin, row.english);
                return insertLessonMutation({
                    variables: {
                        category: row.category ? row.category : 'default',
                        chinese: row.chinese,
                        pinyin: row.pinyin,
                        english: row.english,
                        synonyms: null,
                        tone: null,
                        audio: null,
                        user_id: user.sub,
                    }
                })
            }
        );
        window.location.reload();
    };

    const encoding = 'UTF-8';
    const handleChangeFile = e => {
        const reader = new FileReader();
        if (e.target.files.length > 0) {
            const fileName = e.target.files[0].name;

            reader.onload = event => {
                const csvData = PapaParse.parse(
                    event.target.result,
                    {
                        onError: null,
                        encoding: encoding,
                        header: true,
                        dynamicTyping: true,
                        skipEmptyLines: true,
                        transformHeader: header => header.toLowerCase().replace(/\W/g, '_')
                    },
                );
                handleLoad(csvData.data, fileName);
            };

            reader.readAsText(e.target.files[0], encoding);
        }
    };

    const classes = useStyles(Theme);
    return (
        <div className={clsx(classes.root)}>
            <input
                type='file'
                accept='text/csv'
                style={{display: "none"}}
                id='upload'
                onChange={handleChangeFile}
            />
            <label htmlFor='upload'>
                <IconButton
                    style={{color: Theme.palette.secondary.contrastText}}
                    component='span'
                >
                    <UploadIcon/>
                </IconButton>
                <Typography
                    variant='subtitle1'
                    style={{color: Theme.palette.secondary.contrastText}}
                >
                    CSV upload
                </Typography>
            </label>
        </div>
    )
};

export default UploadFile;