import React, {useEffect, useState} from "react";
import {GameWrapper, Theme} from "../../Components";
import Instructions from './Instructions';
import clsx from "clsx";
import {makeStyles, Typography, Divider, Button} from "@material-ui/core";
import {Question} from "../../Queries";
import {sum} from "mathjs";

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
        flex: '1 1 100%',
        padding: theme.spacing(1),
        display: 'flex',
        flexFlow: 'column',
    },
    row: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: theme.spacing(1)

    },
    questionRow: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(1)

    },
    column: {
        height: '100%',
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    pad: {
        display: 'flex',
    },
    header: {
        display: 'flex',
    },
    buttonText: {
        fontSize: 24
    },
    correct: {
        border: `thick solid ${theme.palette.primary.main}`,
        textShadow: `0px 0px 4px ${theme.palette.primary.main}`,
    },
    selectedIncorrect: {
        border: `thick solid ${theme.palette.error.main}`,
        textShadow: `0px 0px 4px ${theme.palette.error.main}`,
    },
}));

export const PopQuiz = () => {
    const classes = useStyles(Theme);

    const [questions, setQuestions] = useState([]);
    const [questionIndex, setQuestionIndex] = useState(0);

    const [nextQuestion, refetch] = Question();
    useEffect(() => {
        if (!nextQuestion) return;
        setQuestions(prevState => [...prevState, nextQuestion]);
    }, [nextQuestion]);

    const handlePrevQuestion = () => {
        setQuestionIndex(prevState => prevState - 1);
    };
    const handleNextQuestion = () => {
        if(questionIndex < questions.length - 1) {
            setQuestionIndex(prevState => prevState + 1);
        }
        else {
            const t = questions.length;
            console.log(t);
            refetch();
            setQuestionIndex(t);
        }
    };
    const handleAnswer = id => {
        const qs = [...questions];
        qs[questionIndex].selected = id;
        setQuestions(qs);
    };
    useEffect(() => {
    }, [questions]);

    const getScore = () => {
        const t = sum(questions.map(q => q.question.id === q.selected ? 1 : 0));
        const s = t > 0 ? Math.round(((100 * t / questions.length) + Number.EPSILON) * 100) / 100 : 0;
        return `${t}/${questions.length} = ${s}`;
    };

    const PopQuizComponent = () => {
        return (
            <div className={clsx(classes.root)}>
                <div className={clsx(classes.row)}>
                    <div className={clsx(classes.pad)}>
                        <Typography
                            variant='h4'
                            color='primary'
                        >
                            Question # {questionIndex + 1}
                        </Typography>
                    </div>
                    <div className={clsx(classes.pad)}>
                        <Typography
                            variant='h2'
                            color='primary'
                        >
                            Pop Quiz
                        </Typography>
                    </div>
                    <div className={clsx(classes.pad)}>
                        <Typography
                            variant='h4'
                            color='primary'
                        >
                            Score: {getScore()}%
                        </Typography>
                    </div>
                </div>
                <Divider/>
                {questions && questions.length > questionIndex &&
                <>
                    <div className={clsx(classes.row)}>
                        <div className={clsx(classes.pad)}>
                            <Typography
                                variant='h6'
                                color='primary'
                            >
                                What is the correct translation for the word or phrase below?
                            </Typography>
                        </div>
                    </div>
                    <div className={clsx(classes.questionRow)}>
                        <div className={clsx(classes.pad)}>
                            <Typography
                                variant='h2'
                                color='primary'
                            >
                                {questions[questionIndex].question.text}
                            </Typography>
                        </div>
                    </div>
                    <div className={clsx(classes.row)}>
                        <div className={clsx(classes.pad)}>
                            <Button
                                variant='contained'
                                color='primary'
                                disabled={questionIndex <= 0}
                                onClick={handlePrevQuestion}
                            >
                                <Typography
                                    variant='h6'
                                    color='secondary'
                                >
                                    Prev
                                </Typography>
                            </Button>
                        </div>
                        <div className={clsx(classes.column)}>
                            <div className={clsx(classes.row)}>
                                <div className={clsx(classes.pad)}>
                                    <Button
                                        variant='contained'
                                        color='primary'
                                        onClick={() => handleAnswer(questions[questionIndex].answers[0].id)}
                                        disabled={
                                            questions[questionIndex] &&
                                            questions[questionIndex].selected !== undefined
                                        }
                                        className={clsx({
                                            [classes.correct]: questions[questionIndex].selected &&
                                            questions[questionIndex].question.id === questions[questionIndex].answers[0].id,
                                            [classes.selectedIncorrect]: questions[questionIndex].selected &&
                                            questions[questionIndex].selected === questions[questionIndex].answers[0].id &&
                                            questions[questionIndex].selected !== questions[questionIndex].question.id
                                        })}
                                    >
                                        <Typography
                                            variant='h6'
                                            color='secondary'
                                        >
                                            A. {questions[questionIndex].answers[0].text}
                                        </Typography>
                                    </Button>
                                </div>
                                <div className={clsx(classes.pad)}>
                                    <Button
                                        variant='contained'
                                        color='primary'
                                        onClick={() => handleAnswer(questions[questionIndex].answers[1].id)}
                                        disabled={
                                            questions[questionIndex] &&
                                            questions[questionIndex].selected !== undefined
                                        }
                                        className={clsx({
                                            [classes.correct]: questions[questionIndex].selected &&
                                            questions[questionIndex].question.id === questions[questionIndex].answers[1].id,
                                            [classes.selectedIncorrect]: questions[questionIndex].selected &&
                                            questions[questionIndex].selected === questions[questionIndex].answers[1].id &&
                                            questions[questionIndex].selected !== questions[questionIndex].question.id
                                        })}
                                    >
                                        <Typography
                                            variant='h6'
                                            color='secondary'
                                        >
                                            B. {questions[questionIndex].answers[1].text}
                                        </Typography>
                                    </Button>
                                </div>
                            </div>
                            <div className={clsx(classes.row)}>
                                <div className={clsx(classes.pad)}>
                                    <Button
                                        variant='contained'
                                        color='primary'
                                        onClick={() => handleAnswer(questions[questionIndex].answers[2].id)}
                                        disabled={
                                            questions[questionIndex] &&
                                            questions[questionIndex].selected !== undefined
                                        }
                                        className={clsx({
                                            [classes.correct]: questions[questionIndex].selected &&
                                            questions[questionIndex].question.id === questions[questionIndex].answers[2].id,
                                            [classes.selectedIncorrect]: questions[questionIndex].selected &&
                                            questions[questionIndex].selected === questions[questionIndex].answers[2].id &&
                                            questions[questionIndex].selected !== questions[questionIndex].question.id
                                        })}
                                    >
                                        <Typography
                                            variant='h6'
                                            color='secondary'
                                        >
                                            C. {questions[questionIndex].answers[2].text}
                                        </Typography>
                                    </Button>
                                </div>
                                <div className={clsx(classes.pad)}>
                                    <Button
                                        variant='contained'
                                        color='primary'
                                        onClick={() => handleAnswer(questions[questionIndex].answers[3].id)}
                                        disabled={
                                            questions[questionIndex] &&
                                            questions[questionIndex].selected !== undefined
                                        }
                                        className={clsx({
                                            [classes.correct]: questions[questionIndex].selected &&
                                            questions[questionIndex].question.id === questions[questionIndex].answers[3].id,
                                            [classes.selectedIncorrect]: questions[questionIndex].selected &&
                                            questions[questionIndex].selected === questions[questionIndex].answers[3].id &&
                                            questions[questionIndex].selected !== questions[questionIndex].question.id
                                        })}
                                    >
                                        <Typography
                                            variant='h6'
                                            color='secondary'
                                        >
                                            D. {questions[questionIndex].answers[3].text}
                                        </Typography>
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className={clsx(classes.pad)}>
                            <Button
                                variant='contained'
                                color='primary'
                                onClick={handleNextQuestion}
                            >
                                <Typography
                                    variant='h6'
                                    color='secondary'
                                >
                                    Next
                                </Typography>
                            </Button>
                        </div>
                    </div>
                </>
                }
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
