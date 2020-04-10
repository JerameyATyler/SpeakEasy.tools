import {useQuery} from "@apollo/react-hooks";
import gql from 'graphql-tag';
import {useEffect, useState} from 'react';

const GET_QUESTION = gql`
    query GetPopQuizQuestion($limit: Int!){
        random_lessons(limit: $limit){
            lesson {
                id
                english
                chinese
                pinyin
            }
        }
    }
`;

export default () => {
    const [questions, setQuestions] = useState(null);
    const {data, refetch} = useQuery(GET_QUESTION, {
        variables: {
            limit: 4
        }
    });

    const formatQuestion = (d) => {
        let languages = ['chinese', 'pinyin', 'english'];
        const questionLanguage = languages.splice(Math.floor(Math.random() * languages.length), 1);
        const answerLanguage = languages.splice(Math.floor(Math.random() * languages.length), 1);
        const q = d[Math.floor(Math.random() * d.length)];
        return {
            questionLanguage: questionLanguage,
            answerLanguage: answerLanguage,
            question: {
                text: q.lesson[questionLanguage],
                id: q.lesson.id,
            },
            answers: d.map(l => {
                return {
                    text: l.lesson[answerLanguage],
                    id: l.lesson.id
                }
            }),
        };
    };

    useEffect(() => {
        if (!data) return;
        setQuestions(formatQuestion(data.random_lessons));
    }, [data]);

    const handleRefetch = () => {
        refetch();
        setQuestions(formatQuestion(data))
    }

    return [questions, refetch];
}