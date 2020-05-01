import {GetRandomLessons} from "../../Queries";
import {useEffect, useState} from "react";

export default () => {
    const [randomLessons, refetch] = GetRandomLessons(4);
    const [questions, setQuestions] = useState([]);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [questionKeys, setQuestionKeys] = useState([]);
    const [responses, setResponses] = useState([]);

    const getPreviousQuestion = () => {
        setQuestionIndex(prevState => Math.max(0, prevState - 1));
    };
    const getCurrentQuestion = () => {
        if(questions.length <= questionIndex) return;
        return questions[questionIndex];
    };
    const getNextQuestion = () => {
        setQuestionIndex(prevState => prevState + 1);
    };

    const checkAnswer = () => {
        if(responses[questionIndex] == null) return;
        return responses[questionIndex] === questionKeys[questionIndex];
    };
    const isAnswered = () => {
        return responses[questionIndex] != null;
    };
    const answerQuestion = id => {
        let newResponses = [...responses];
        newResponses[questionIndex] = id;
        setResponses(newResponses);
    };
    const getAnswerId = () => {
        if (!isAnswered()) return;
        return questionKeys[questionIndex];
    };
    const getResponseId = () => {
        if (!isAnswered()) return;
        return responses[questionIndex];
    };

    const totalCorrect = () => {
        let t = 0;
        responses.forEach((r, i) => {
            if(!r) return;
            if(responses[i] === questionKeys[i]) t++;
        });
        return t;
    };

    useEffect(() => {
        if(questionIndex == null) return;
        if(questionIndex >= questions.length) refetch();
    }, [questionIndex, questions, refetch]);

    useEffect(() => {
        if(!randomLessons) return;

        const answerIndex = Math.floor(Math.random() * 4);
        const languages = ['english', 'pinyin', 'chinese'];
        const questionLanguage = languages[Math.floor(Math.random() * languages.length)];
        languages.splice(languages.indexOf(questionLanguage), 1);
        const answersLanguage = languages[Math.floor(Math.random() * languages.length)];

        let q = {
            questionText: randomLessons[answerIndex]['lesson'][answersLanguage],
            answers: [
                {answerText: randomLessons[0]['lesson'][questionLanguage], answerId: randomLessons[0]['lesson'].id},
                {answerText: randomLessons[1]['lesson'][questionLanguage], answerId: randomLessons[1]['lesson'].id},
                {answerText: randomLessons[2]['lesson'][questionLanguage], answerId: randomLessons[2]['lesson'].id},
                {answerText: randomLessons[3]['lesson'][questionLanguage], answerId: randomLessons[3]['lesson'].id},
            ],
        };

        setQuestions(prevState => [...prevState, q]);
        setQuestionKeys(prevState => [...prevState, randomLessons[answerIndex]['lesson'].id]);
        setResponses(prevState => [...prevState, null]);

    }, [randomLessons]);

    const question = {
        currentQuestion: getCurrentQuestion,
        prevQuestion: getPreviousQuestion,
        nextQuestion: getNextQuestion,

        isAnswered: isAnswered,
        answerQuestion: answerQuestion,
        checkAnswer: checkAnswer,
        answerId: getAnswerId,
        responseId: getResponseId,
        totalCorrect: totalCorrect,

        totalQuestions: questions.length,
        currentIndex: questionIndex
    };

    return question;
}