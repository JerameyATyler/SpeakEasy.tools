import React from "react";
import CSVReader from 'react-csv-reader';
import clsx from "clsx";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Theme} from "../../Components";
import {useMutation} from "react-apollo";
import gql from 'graphql-tag';
import {useAuth0} from "../../react-auth0-spa";

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
    container: {}
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

    const papaParseOptions = {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        transformHeader: header => header.toLowerCase().replace(/\W/g, '_')
    };
    const classes = useStyles(Theme);
    return (
        <div className={clsx(classes.container)}>
            <CSVReader
                cssClass={'react-csv-input'}
                label="Select CSV file to upload"
                onFileLoaded={handleLoad}
                parserOptions={papaParseOptions}
            />
        </div>)
};

export default UploadFile;