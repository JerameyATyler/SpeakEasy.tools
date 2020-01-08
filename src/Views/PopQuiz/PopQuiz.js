import React, {useState} from "react";
import {GameWrapper, Theme} from "../../Components";
import Instructions from './Instructions';
import clsx from "clsx";
import {makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import {KeyboardArrowLeft, KeyboardArrowRight} from "@material-ui/icons";
import {useQuery} from "@apollo/react-hooks";
import gql from "graphql-tag";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: 300,
    },
    question: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    choices: {
        display: 'flex',
        justifyContent: 'center'
    },
    button: {
        width: 150,
        height: 100,
    },
    selected: {
        border: `thin solid ${theme.palette.secondary.contrastText}`,
        boxShadow: `${theme.palette.secondary.contrastText} 0 0 5px`,
        textShadow: `${theme.palette.secondary.contrastText} 0 0 5px`,
    },
    correct: {
        border: `thin solid ${theme.palette.primary.main}`,
        boxShadow: `${theme.palette.primary.main} 0 0 5px`,
        textShadow: `${theme.palette.primary.main} 0 0 5px`,
    },
    incorrect: {
        border: `thin solid ${theme.palette.error.main}`,
        boxShadow: `${theme.palette.error.main} 0 0 5px`,
        textShadow: `${theme.palette.error.main} 0 0 5px`,
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
    }
}));

export const PopQuiz = () => {
    const GET_QUESTION = gql`
        query GetPopQuizQuestion($limit: Int!){  
          random_lessons(limit: $limit) {
            lesson {
            english
            chinese
            id
            pinyin
            }
          }
        }
    `;

    const formQuestion = lessons => {
        let languages = ['chinese', 'pinyin', 'english'];
        const questionLanguage = languages.splice(Math.floor(Math.random() * languages.length), 1);
        const choiceLanguage = languages.splice(Math.floor(Math.random() * languages.length), 1);
        const q = lessons[Math.floor(Math.random() * lessons.length)];
        return {
            questionLanguage: questionLanguage,
            choiceLanguage: choiceLanguage,
            question: {
                text: q[questionLanguage],
                id: q.id,
            },
            choices: lessons.map(l => {
                return {
                    text: l[choiceLanguage],
                    id: l.id,
                }
            }),
            ids: lessons.map(l => l.id),
        };
    };

    const classes = useStyles(Theme);
    const [index, setIndex] = useState(0);
    const [questions, setQuestions] = useState([{
        question: {text: 'Start', id: ['a', 'b', 'c', 'd'][Math.floor(Math.random() * 4)]},
        choices: [
            {text: 'A', id: 'a'},
            {text: 'B', id: 'b'},
            {text: 'C', id: 'c'},
            {text: 'D', id: 'd'},
        ]
    }]);
    const [answers, setAnswers] = useState([null]);
    const [key, setKey] = useState([null]);
    const [grade, setGrade] = useState(0);
    const {loading, error, data, refetch} = useQuery(GET_QUESTION, {variables: {limit: 4}});

    if (loading) return null;
    if (error) return `Error! ${error.message}`;

    const setQuestion = question => {
        const newQuestions = questions;
        newQuestions.push(question);
        setQuestions(newQuestions);
        setIndex(prevState => prevState + 1);

        const newAnswers = answers;
        newAnswers.push(null);
        setAnswers(newAnswers);

        const newKey = [...key];
        newKey.push(null);
        setKey(newKey);
    };

    const setAnswer = indx => {
        if (answers[index] === null) {
            const newAnswers = [...answers];
            newAnswers[index] = indx;
            setAnswers(newAnswers);
            const newKey = [...key];
            newKey[index] = questions[index].question.id;
            setKey(newKey);
        }
    };

    const handleRefetch = () => {
        refetch();
        setQuestion(formQuestion(data.random_lessons.map(l => l.lesson)));
    };

    const handleNextQuestion = () => {
        setIndex(Math.min(index + 1, questions.length - 1));
    };

    const handlePrevQuestion = () => {
        setIndex(Math.max(0, index - 1));
    };

    const handleChoice = id => {
        setAnswer(id);
        if(index !== 0 && id === questions[index].question.id) setGrade(grade + 1);
    };

    const getPercent = () => {
        const score = (grade/Math.max(1, questions.length - 1)) * 100;
        return (Math.round(score * 100) / 100).toFixed(2);
    };

    const PopQuizComponent = () => {
        return (
            <div className={clsx(classes.root)}>
                <div className={clsx(classes.header)}>
                    <Typography
                        variant='h6'
                        color='primary'
                    >
                        Translate
                    </Typography>
                    <Typography
                        variant='h6'
                        color='primary'
                    >
                        # {index}
                    </Typography>
                    <Typography
                        variant='h6'
                        color='primary'
                    >
                        {grade}/{questions.length - 1} = {getPercent()}%
                    </Typography>
                </div>
                <Divider/>
                <div className={clsx(classes.question)}>
                    {index > 0 &&
                    <IconButton
                        color='primary'
                        onClick={handlePrevQuestion}
                    >
                        <KeyboardArrowLeft/>
                    </IconButton>
                    }
                    <Typography
                        variant='h4'
                        color='primary'
                    >
                        {questions[index].question.text}
                    </Typography>
                    <IconButton
                        color='primary'
                        onClick={() => (index + 1) >= questions.length ? handleRefetch() : handleNextQuestion()}>
                        <KeyboardArrowRight/>
                    </IconButton>
                </div>
                <div className={clsx(classes.choices)}>
                    {questions[index].choices.slice(0, 2).map(c =>
                        <Button
                            key={c.id}
                            color='primary'
                            variant='contained'
                            onClick={() => handleChoice(c.id)}
                            disabled={answers[index] !== null}
                            className={clsx({
                                [classes.selected]:
                                answers[index] !== null && answers[index] === c.id,
                                [classes.correct]:
                                answers[index] !== null && key[index] === c.id,
                                [classes.incorrect]:
                                answers[index] !== null && answers[index] === c.id && key[index] !== c.id,
                            })}
                        >
                            {c.text}
                        </Button>
                    )}
                </div>
                <div className={clsx(classes.choices)}>
                    {questions[index].choices.slice(2).map(c =>
                        <Button
                            key={c.id}
                            color='primary'
                            variant='contained'
                            onClick={() => handleChoice(c.id)}
                            disabled={answers[index] !== null}
                            className={clsx({
                                [classes.selected]:
                                answers[index] !== null && answers[index] === c.id,
                                [classes.correct]:
                                answers[index] !== null && key[index] === c.id,
                                [classes.incorrect]:
                                answers[index] !== null && answers[index] === c.id && key[index] !== c.id,
                            })}
                        >
                            {c.text}
                        </Button>
                    )}
                </div>
            </div>
        )
    };

    return (
        <GameWrapper>
            <></>
            <Instructions/>
            <PopQuizComponent/>
        </GameWrapper>
    );
};
