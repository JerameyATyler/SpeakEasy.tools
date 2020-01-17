import React, {Fragment, useEffect, useRef, useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Theme} from "../../Components";
import {GameWrapper} from "../../Components/GameWrapper";
import {WordPicker} from "../../Components/WordPicker";
import {Typography} from "@material-ui/core";
import clsx from "clsx";
import {useQuery} from "@apollo/react-hooks";
import gql from "graphql-tag";
import {Pitch} from "../../Visualizations";

const useStyles = makeStyles(theme => ({
    root: {
    },
    flashCard: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.contrastText,
        padding: theme.spacing(1),
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    titleBar: {
        width: '100%',
        justifyContent: 'center',
        display: 'flex',
    },
    typography: {
        padding: theme.spacing(1)
    },
    content: {
        height: 400,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    card: {
        width: '80%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonBar: {},
    icon: {
        width: 50,
        height: 50,
        margin: theme.spacing(1),
        padding: theme.spacing(1),
    },
    listening: {
        backgroundColor: theme.palette.error.main,
        color: theme.palette.error.contrastText,
    },
    notListening: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
    }
}));


export default () => {
    const GET_ALL_LESSONS = gql`
        {
          lessons {
            category
            chinese
            pinyin
            english
            synonyms
            tone
            audio
          }
        }
    `;

    const classes = useStyles(Theme);
    const [categoryTab, setCategoryTab] = useState(0);
    const [wordTab, setWordTab] = useState(0);
    const {loading, error, data} = useQuery(GET_ALL_LESSONS);

    const pageSize = 15;

    if (loading) {
        return <div>...loading</div>
    }
    if (error) {
        return <div>error {error.message}</div>
    }

    const getWords = () => {
        if(data && data.lessons){
            const lessons = data.lessons;
            return [...Array(Math.ceil(lessons.length/pageSize)).keys()].map(label => {
                return lessons.slice(label*pageSize, (label+1)*pageSize)
            });
        }
        else return {chinese: '', english: '', pinyin: ''}
    };

    const getWord = () => {
        return getWords()[categoryTab][wordTab];
    };

    const ToneTrainerComponent = () => {
        return (
            <div className={clsx(classes.root)}>
                <div className={clsx(classes.flashCard)}>
                    <WordPicker
                        words={getWords()}
                        categoryTab={categoryTab}
                        setCategoryTab={setCategoryTab}
                        wordTab={wordTab}
                        setWordTab={setWordTab}
                    />
                    <div className={clsx(classes.titleBar)}>
                        <Typography
                            variant='h4'
                            color='secondary'
                            className={clsx(classes.typography)}
                        >
                            {getWord().chinese}
                        </Typography>
                        <Typography
                            variant='h4'
                            color='secondary'
                            className={clsx(classes.typography)}
                        >
                            -
                        </Typography>
                        <Typography
                            variant='h4'
                            color='secondary'
                            className={clsx(classes.typography)}
                        >
                            {getWord().pinyin}
                        </Typography>
                        <Typography
                            variant='h4'
                            color='secondary'
                            className={clsx(classes.typography)}
                        >
                            -
                        </Typography>
                        <Typography
                            variant='h4'
                            color='secondary'
                            className={clsx(classes.typography)}
                        >
                            {getWord().english}
                        </Typography>
                    </div>
                    <div className={clsx(classes.content)}>
                        <Pitch/>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <GameWrapper>
            <Fragment/>
            <Fragment/>
            <ToneTrainerComponent/>
        </GameWrapper>
    );
};
