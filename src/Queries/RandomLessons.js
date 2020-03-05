import {useQuery} from "@apollo/react-hooks";
import gql from 'graphql-tag';
import {useEffect, useState} from 'react';
import shuffle from "../utils/Shuffle";

const GET_MEMORY_BOARD = gql`
    query GetMemoryBoard($limit: Int!){  
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

export default (limit) => {
    const [lessons, setLessons] = useState(null);
    const {data, refetch} = useQuery(GET_MEMORY_BOARD, {
        variables: {
            limit: limit
        }
    });

    const formatLesson = (l) => {
        let formatted = l.random_lessons.map(rl => rl.lesson);
        formatted = formatted.concat(formatted);
        return shuffle(formatted);
    };

    useEffect(() => {
        if (!data) return;
        setLessons(formatLesson(data));
    }, [data]);

    return [lessons, refetch];
}