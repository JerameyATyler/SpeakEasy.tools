import {useQuery} from "@apollo/react-hooks";
import gql from "graphql-tag";
import {useEffect, useState} from "react";

const PAGINATE_LESSONS = gql`
    query PaginateLessons($lessonLimit: Int!, $lessonOffset: Int!) {
        lessons(limit: $lessonLimit, offset: $lessonOffset, order_by: {pinyin: asc}) {
            id
            chinese
            pinyin
            english
        }
        lessons_aggregate {
            aggregate {
                count
            }
        }
    }
`;

export default ({lessonLimit = 5, lessonPage = 0}) => {
    const {data} = useQuery(PAGINATE_LESSONS, {
        variables: {
            lessonLimit: lessonLimit,
            lessonOffset: lessonLimit * lessonPage,
        },
        fetchPolicy: "cache-and-network"
    });

    const [outData, setOutData] = useState(null);
    const [totalPages, setTotalPages] = useState(null);

    useEffect(() => {
        if(!data) return;
        setOutData(data.lessons);
        setTotalPages(Math.ceil(data.lessons_aggregate.aggregate.count/lessonLimit))
    }, [data, lessonLimit]);

    return [outData, totalPages];
}