import React, {useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Theme} from "../../utils";
import clsx from "clsx";
import {Card} from "../../Components/Card";
import Typography from "@material-ui/core/Typography";
import {KeyboardArrowLeft, KeyboardArrowRight} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: '100%',
    },
    content: {
        width: '100%',
        display: 'flex',
        flexFlow: 'column noWrap'
    },
    column: {
        flex: '1 1 100%',
        display: 'flex',
        flexFlow: 'column noWrap',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    row: {
        flex: '1 1 100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    rowEnds: {
        flex: '1 1 100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    rowCenter: {
        flex: '1 1 100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    rowEnd: {
        flex: '1 1 100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'end',
        alignItems: 'center'
    },
    pad: {
        padding: theme.spacing(1),
    },
    answered: {
        backgroundColor: theme.palette.secondary.main
    },
    unanswered: {
        backgroundColor: theme.palette.primary.main
    },
    correct: {
        borderBottom: `thick solid green`
    },
    incorrect: {
        borderBottom: `thick solid red`,
    },
    wrong: {
        opacity: 0.2
    }
}));

export default ({question}) => {
    const classes = useStyles(Theme);

    const {
        currentQuestion,
        prevQuestion,
        nextQuestion,
        isAnswered,
        answerQuestion,
        answerId,
        responseId,
        totalCorrect,
        totalQuestions,
        currentIndex
    } = question;

    const getTitle = () => {
        const q = currentQuestion();
        const t = totalCorrect();

        if (!q) return;
        return (
            <div className={clsx(classes.content)}>
                <div className={clsx(classes.rowEnds)}>
                    <div className={clsx(classes.pad)}>
                        <Typography variant='h6' style={{color: Theme.palette.secondary.main}}>
                            Question # {currentIndex}
                        </Typography>
                    </div>
                    <div className={clsx(classes.pad)}>
                        <Typography variant='h6' style={{color: Theme.palette.secondary.main}}>
                            Score {t} / {totalQuestions}
                        </Typography>
                    </div>
                </div>
                <div className={clsx(classes.rowCenter)}>
                    <div className={clsx(classes.pad)}>
                        <Typography variant='h4' style={{color: Theme.palette.secondary.main}}>
                            Translate the word or phrase below
                        </Typography>
                    </div>
                </div>
                <div className={clsx(classes.rowCenter)}>
                    <div className={clsx(classes.pad)}>
                        <Typography variant='h2' style={{color: Theme.palette.secondary.main}}>
                            {q.questionText}
                        </Typography>
                    </div>
                </div>
            </div>
        )
    };
    const getBody = () => {
        const q = currentQuestion();

        if (!q) return;
        return (
            <div className={clsx(classes.content)}>
                <div className={clsx(classes.rowEnd)}>
                    <div className={clsx(classes.column)}>
                        <div className={clsx(classes.pad)}>
                            <Button
                                className={clsx({
                                    [classes.answered]: isAnswered(),
                                    [classes.unanswered] : !isAnswered()
                                })}
                                onClick={() => answerQuestion(q.answers[0].answerId)}
                                disabled={isAnswered()}
                            >
                                <div className={clsx(classes.pad)}>
                                    <Avatar style={{backgroundColor: Theme.palette.secondary.main}}>
                                        <Typography style={{color: Theme.palette.secondary.contrastText}} variant='h4'>
                                            A
                                        </Typography>
                                    </Avatar>
                                </div>
                            </Button>
                        </div>
                    </div>
                    <div className={clsx(classes.column)}>
                        <div className={clsx(classes.pad)}>
                            <Typography
                                variant='h4'
                                className={clsx({
                                    [classes.correct] : isAnswered() && answerId() === q.answers[0].answerId,
                                    [classes.wrong] : isAnswered() && !(answerId() === q.answers[0].answerId),
                                    [classes.incorrect] : isAnswered() && !(answerId() === q.answers[0].answerId) && responseId() === q.answers[0].answerId
                                })}
                            >
                                {q.answers[0].answerText}
                            </Typography>
                        </div>
                    </div>
                </div>
                <div className={clsx(classes.rowEnd)}>
                    <div className={clsx(classes.column)}>
                        <div className={clsx(classes.pad)}>
                            <Button
                                className={clsx({
                                    [classes.answered]: isAnswered(),
                                    [classes.unanswered] : !isAnswered()
                                })}
                                onClick={() => answerQuestion(q.answers[1].answerId)}
                                disabled={isAnswered()}
                            >
                                <div className={clsx(classes.pad)}>
                                    <Avatar style={{backgroundColor: Theme.palette.secondary.main}}>
                                        <Typography style={{color: Theme.palette.secondary.contrastText}} variant='h4'>
                                            B
                                        </Typography>
                                    </Avatar>
                                </div>
                            </Button>
                        </div>
                    </div>
                    <div className={clsx(classes.column)}>
                        <div className={clsx(classes.pad)}>
                            <Typography variant='h4'
                                        className={clsx({
                                            [classes.correct] : isAnswered() && answerId() === q.answers[1].answerId,
                                            [classes.wrong] : isAnswered() && !(answerId() === q.answers[1].answerId),
                                            [classes.incorrect] : isAnswered() && !(answerId() === q.answers[1].answerId) && responseId() === q.answers[1].answerId
                                        })}
                            >
                                {q.answers[1].answerText}
                            </Typography>
                        </div>
                    </div>
                </div>
                <div className={clsx(classes.rowEnd)}>
                    <div className={clsx(classes.column)}>
                        <div className={clsx(classes.pad)}>
                            <Button
                                className={clsx({
                                    [classes.answered]: isAnswered(),
                                    [classes.unanswered] : !isAnswered()
                                })}
                                onClick={() => answerQuestion(q.answers[2].answerId)}
                                disabled={isAnswered()}
                            >
                                <div className={clsx(classes.pad)}>
                                    <Avatar style={{backgroundColor: Theme.palette.secondary.main}}>
                                        <Typography style={{color: Theme.palette.secondary.contrastText}} variant='h4'>
                                            C
                                        </Typography>
                                    </Avatar>
                                </div>
                            </Button>
                        </div>
                    </div>
                    <div className={clsx(classes.column)}>
                        <div className={clsx(classes.pad)}>
                            <Typography variant='h4'
                                        className={clsx({
                                            [classes.correct] : isAnswered() && answerId() === q.answers[2].answerId,
                                            [classes.wrong] : isAnswered() && !(answerId() === q.answers[2].answerId),
                                            [classes.incorrect] : isAnswered() && !(answerId() === q.answers[2].answerId) && responseId() === q.answers[2].answerId
                                        })}
                            >
                                {q.answers[2].answerText}
                            </Typography>
                        </div>
                    </div>
                </div>
                <div className={clsx(classes.rowEnd)}>
                    <div className={clsx(classes.column)}>
                        <div className={clsx(classes.pad)}>
                            <Button
                                className={clsx({
                                    [classes.answered]: isAnswered(),
                                    [classes.unanswered] : !isAnswered()
                                })}
                                onClick={() => answerQuestion(q.answers[3].answerId)}
                                disabled={isAnswered()}
                            >
                                <div className={clsx(classes.pad)}>
                                    <Avatar style={{backgroundColor: Theme.palette.secondary.main}}>
                                        <Typography style={{color: Theme.palette.secondary.contrastText}} variant='h4'>
                                            D
                                        </Typography>
                                    </Avatar>
                                </div>
                            </Button>
                        </div>
                    </div>
                    <div className={clsx(classes.column)}>
                        <div className={clsx(classes.pad)}>
                            <Typography variant='h4'
                                        className={clsx({
                                            [classes.correct] : isAnswered() && answerId() === q.answers[3].answerId,
                                            [classes.wrong] : isAnswered() && !(answerId() === q.answers[3].answerId),
                                            [classes.incorrect] : isAnswered() && !(answerId() === q.answers[3].answerId) && responseId() === q.answers[3].answerId
                                        })}
                            >
                                {q.answers[3].answerText}
                            </Typography>
                        </div>
                    </div>
                </div>

                <div className={clsx(classes.rowEnds)}>
                    <div className={clsx(classes.pad)}>
                        <Button
                            style={{
                                backgroundColor: Theme.palette.primary.main
                            }}
                            onClick={prevQuestion}
                        >
                            <div className={clsx(classes.pad)}>
                                <Avatar
                                    style={{
                                        backgroundColor: Theme.palette.secondary.main
                                    }}
                                >
                                    <KeyboardArrowLeft
                                        style={{
                                            color: Theme.palette.secondary.contrastText
                                        }}
                                    />
                                </Avatar>
                            </div>
                            <div className={clsx(classes.pad)}>
                                <Typography variant='h6' style={{color: Theme.palette.secondary.main}}>
                                    Prev
                                </Typography>
                            </div>
                        </Button>
                    </div>
                    <div className={clsx(classes.pad)}>
                        <Button
                            style={{
                                backgroundColor: Theme.palette.primary.main
                            }}
                            onClick={nextQuestion}
                        >
                            <div className={clsx(classes.pad)}>
                                <Typography variant='h6' style={{color: Theme.palette.secondary.main}}>
                                    Next
                                </Typography>
                            </div>
                            <div className={clsx(classes.pad)}>
                                <Avatar
                                    style={{
                                        backgroundColor: Theme.palette.secondary.main
                                    }}
                                >
                                    <KeyboardArrowRight
                                        style={{
                                            color: Theme.palette.secondary.contrastText
                                        }}
                                    />
                                </Avatar>
                            </div>
                        </Button>
                    </div>
                </div>
            </div>
        )

    };
    useEffect(() => {
    }, [currentQuestion]);
    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.pad)}>
                <Card
                    darkMode={true}
                    stayOpen={true}
                    title={getTitle}
                    body={getBody}
                />
            </div>
        </div>
    )
}