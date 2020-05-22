import gql from "graphql-tag";
import {useEffect, useState} from "react";
import {useMutation, useQuery} from "@apollo/react-hooks";

export const GetCourses = userId => {
    const COURSES = gql`
        query getCourses($userId: String!) {
            courses (where: {user_id: {_eq: $userId}}) {
                id
                name
                description
                registration_code
            }
        }
    `;

    const [courses, setCourses] = useState(null);
    const {data, refetch} = useQuery(COURSES, {
        variables: {
            userId: userId
        },
        fetchPolicy: "cache-and-network"
    });
    useEffect(() => {
        if(!data) return;
        setCourses(data['courses']);
    }, [data]);

    return [courses, refetch]
};

export const InsertCourse = (userId, name, description, registration_code) => {
    /* A GraphQL mutation. Mutations are like queries except they modify the graph. This one accepts variables. */
    const INSERT_COURSES = gql`
        mutation insertCourses($userId: String!, $name: String!, $description: String!, $registration_code: String!) {
            insert_courses(objects: {
                user_id: $userId,
                name: $name,
                description: $description,
                registration_code: $registration_code
            }) {
                returning {
                    id
                }
            }
        }
    `;

    /* useMutation returns a function for calling the mutation and the data returned. This mutation only returns the
     * number of configurations returned.
     */
    const [insertCourses, {data}] = useMutation(INSERT_COURSES);
    const [courseId, setCourseId] = useState(null);

    /* Check the configuration and call the mutation */
    useEffect(() => {
        if(!(userId && name && description && registration_code)) return;
        insertCourses({variables: {
                userId: userId,
                name: name,
                description: description,
                registration_code: registration_code
            }});
    }, [userId, name, description, registration_code, insertCourses]);
    /* Check the return value of the mutation and set output */
    useEffect(() => {
        if(!(data && data.insert_courses)) return;
        setCourseId(data.insert_courses.returning[0].id);
    }, [data]);

    return courseId;
};

export const UpdateCourse = (courseId, name, description) => {
    /* A GraphQL mutation. Mutations are like queries except they modify the graph. This one accepts variables. */
    const UPDATE_COURSES = gql`
        mutation updateCourses ($courseId: Int!, $name: String!, $description: String!){
          update_courses(where: {id: {_eq: $courseId}}, _set: {description: $description, name: $name}) {
            affected_rows
          }
        }
    `;

    /* useMutation returns a function for calling the mutation and the data returned. This mutation only returns the
     * number of configurations returned.
     */
    const [updateCourses, {data}] = useMutation(UPDATE_COURSES);
    const [rowsAffected, setRowsAffected] = useState(null);

    /* Check the configuration and call the mutation */
    useEffect(() => {
        if(!(courseId && name && description)) return;
        updateCourses({variables: {
                courseId: courseId,
                name: name,
                description: description
            }});
    }, [courseId, name, description, updateCourses]);
    /* Check the return value of the mutation and set output */
    useEffect(() => {
        if(!(data && data['update_courses'])) return;
        setRowsAffected(data);
    }, [data]);

    return rowsAffected;
};

export const DeleteCourse = (courseId) => {
    /* A GraphQL mutation. Mutations are like queries except they modify the graph. This one accepts variables. */
    const DELETE_COURSES = gql`
        mutation deleteCourses ($courseId: Int!){
          delete_courses(where: {id: {_eq: $courseId}}) {
            affected_rows
          }
        }
    `;

    /* useMutation returns a function for calling the mutation and the data returned. This mutation only returns the
     * number of configurations returned.
     */
    const [deleteCourses, {data}] = useMutation(DELETE_COURSES);
    const [rowsAffected, setRowsAffected] = useState(null);

    /* Check the configuration and call the mutation */
    useEffect(() => {
        if(!courseId) return;
        deleteCourses({variables: {
                courseId: courseId
            }});
    }, [courseId, deleteCourses]);
    /* Check the return value of the mutation and set output */
    useEffect(() => {
        if(!(data && data['delete_courses'])) return;
        setRowsAffected(data);
    }, [data]);

    return rowsAffected;
};