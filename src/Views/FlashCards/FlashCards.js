import React, {Fragment, useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Theme} from "../../Components";
import {GameWrapper} from "../../Components/GameWrapper";
import {WordPicker} from "../../Components/WordPicker";
import {Typography} from "@material-ui/core";
import clsx from "clsx";
import Divider from "@material-ui/core/Divider";
import RecordVoiceOver from '@material-ui/icons/RecordVoiceOver';
import Hearing from '@material-ui/icons/Hearing';
import IconButton from "@material-ui/core/IconButton";
import {useQuery} from "@apollo/react-hooks";
import gql from "graphql-tag";

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
    sideNav: {
        maxWidth: '20%',
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        height: 400,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    card: {
        width: '80%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonBar: {}
}));


export const FlashCards = () => {
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

    const FlashCardsComponent = () => {
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
                    <div className={clsx(classes.content)}>
                        <div className={clsx(classes.sideNav)}>
                            <Typography
                                variant='h4'
                                color='secondary'
                            >
                                {getWord().chinese}
                            </Typography>
                            <Divider/>
                            <Typography
                                variant='h4'
                                color='secondary'
                            >
                                {getWord().pinyin}
                            </Typography>
                            <Divider/>
                            <Typography
                                variant='h4'
                                color='secondary'
                            >
                                {getWord().english}
                            </Typography>
                        </div>
                        <div className={clsx(classes.card)}>
                            <Typography
                                variant='h2'
                                color='secondary'
                            >
                                {getWord().chinese}
                            </Typography>
                            <div className={clsx(classes.buttonBar)}>
                                <IconButton
                                    color='secondary'
                                >
                                    <Hearing/>
                                </IconButton>
                                <IconButton
                                    color='secondary'
                                >
                                    <RecordVoiceOver/>
                                </IconButton>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    };

    return (
        <GameWrapper>
            <Fragment/>
            <Fragment/>
            <FlashCardsComponent/>
        </GameWrapper>
    );
};
