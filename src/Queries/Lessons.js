import gql from "graphql-tag";
import {useEffect, useState} from "react";
import {useMutation, useQuery} from "@apollo/react-hooks";

export const GetLessons = courseId => {
    const LESSONS = gql`
        query getLessons($courseId: Int!) {
            lessons (where: {course_id: {_eq: $courseId}}) {
                id
                name
                description
            }
        }
    `;

    const [lessons, setLessons] = useState(null);
    const {data, refetch} = useQuery(LESSONS, {
        variables: {
            courseId: courseId
        }
    });
    useEffect(() => {
        if(!data) return;
        setLessons(data['lessons']);
    }, [data]);

    return [lessons, refetch]
};

export const GetLessonsByUser = userId => {
    const LESSONS = gql`
        query getLessons($userId: String!) {
            lessons (where: {user_id: {_eq: $userId}}) {
                id
                name
                description
                course {
                    name
                }
            }
        }
    `;

    const [lessons, setLessons] = useState(null);
    const {data, refetch} = useQuery(LESSONS, {
        variables: {
            userId: userId
        }
    });
    useEffect(() => {
        if(!data) return;
        setLessons(data['lessons'].map(l => {return {...l, courseName: l['course']['name']}}));
    }, [data]);

    return [lessons, refetch]
};

export const InsertLesson = (courseId, userId, name, description) => {
    /* A GraphQL mutation. Mutations are like queries except they modify the graph. This one accepts variables. */
    const INSERT_LESSONS = gql`
        mutation insertLessons($courseId: Int!, $userId: String!, $name: String!, $description: String!) {
            insert_lessons(objects: {
                course_id: $courseId,
                user_id: $userId,
                name: $name,
                description: $description
            }) {
                affected_rows
                returning {
                    id
                }
            }
        }
    `;

    /* useMutation returns a function for calling the mutation and the data returned. This mutation only returns the
     * number of configurations returned.
     */
    const [insertLessons, {data}] = useMutation(INSERT_LESSONS);
    const [lessonId, setLessonId] = useState(null);

    /* Check the configuration and call the mutation */
    useEffect(() => {
        if(!(courseId && userId && name && description)) return;
        insertLessons({variables: {
                courseId: courseId,
                userId: userId,
                name: name,
                description: description
            }});
    }, [courseId, userId, name, description, insertLessons]);
    /* Check the return value of the mutation and set output */
    useEffect(() => {
        if(!(data && data['insert_lessons'])) return;
        setLessonId(data['insert_lessons']['returning'][0].id);
    }, [data]);

    return lessonId;
};

export const UpdateLesson = (lessonId, name, description) => {
    /* A GraphQL mutation. Mutations are like queries except they modify the graph. This one accepts variables. */
    const UPDATE_LESSONS = gql`
        mutation updateLessons ($lessonId: Int!, $name: String!, $description: String!){
          update_lessons(where: {id: {_eq: $lessonId}}, _set: {description: $description, name: $name}) {
            affected_rows
          }
        }
    `;

    /* useMutation returns a function for calling the mutation and the data returned. This mutation only returns the
     * number of configurations returned.
     */
    const [updateLessons, {data}] = useMutation(UPDATE_LESSONS);
    const [rowsAffected, setRowsAffected] = useState(null);

    /* Check the configuration and call the mutation */
    useEffect(() => {
        if(!(lessonId && name && description)) return;
        updateLessons({variables: {
                lessonId: lessonId,
                name: name,
                description: description,
            }});
    }, [lessonId, name, description, updateLessons]);
    /* Check the return value of the mutation and set output */
    useEffect(() => {
        if(!(data && data['update_lessons'])) return;
        setRowsAffected(data);
    }, [data]);

    return rowsAffected;
};

export const DeleteLesson = (lessonId) => {
    /* A GraphQL mutation. Mutations are like queries except they modify the graph. This one accepts variables. */
    const DELETE_LESSONS = gql`
        mutation deleteLessons ($lessonId: Int!){
          delete_lessons(where: {id: {_eq: $lessonId}}) {
            affected_rows
          }
        }
    `;

    /* useMutation returns a function for calling the mutation and the data returned. This mutation only returns the
     * number of configurations returned.
     */
    const [deleteLessons, {data}] = useMutation(DELETE_LESSONS);
    const [rowsAffected, setRowsAffected] = useState(null);

    /* Check the configuration and call the mutation */
    useEffect(() => {
        if(!lessonId) return;
        deleteLessons({variables: {
                lessonId: lessonId
            }});
    }, [lessonId, deleteLessons]);
    /* Check the return value of the mutation and set output */
    useEffect(() => {
        if(!(data && data['delete_lessons'])) return;
        setRowsAffected(data);
    }, [data]);

    return rowsAffected;
};