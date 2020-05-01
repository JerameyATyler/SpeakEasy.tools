import gql from "graphql-tag";
import {useEffect, useState} from "react";
import {useQuery} from "@apollo/react-hooks";

export const GetRandomLessons = (limit) => {
    const RANDOM_LESSONS = gql`
        query getRandomLesson ($limit: Int!) {
            random_lessons (limit: $limit) {
                lesson {
                    id
                    chinese
                    pinyin
                    english
                    }
            }
        }
    `;

    const [lessons, setLessons] = useState(null);
    const {data, refetch} = useQuery(RANDOM_LESSONS, {
        variables: {
            limit: limit,
        }
    });
    useEffect(() => {
        if (!data) return;
        setLessons(data.random_lessons)
    }, [data]);

    return [lessons, refetch]
};
