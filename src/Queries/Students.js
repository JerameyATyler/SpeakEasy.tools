import gql from "graphql-tag";
import {useEffect, useState} from "react";
import {useMutation, useQuery} from "@apollo/react-hooks";

export const GetStudents = courseId => {
    const STUDENTS = gql`
        query getStudents($courseId: Int!) {
            courses (where: {id: {_eq: $courseId}}) {
                courses_students {
                    user {
                        id
                        name
                        last_seen
                    }
                }
            }
        }
    `;

    const [students, setStudents] = useState(null);
    const {data, refetch} = useQuery(STUDENTS, {
        variables: {
            courseId: courseId
        },
        fetchPolicy: "cache-and-network"
    });
    useEffect(() => {
        if(!data) return;
        setStudents(data['courses'][0]['courses_students']);
    }, [data]);

    return [students, refetch]
};

export const GetStudentsCourses = userId => {
    const STUDENTS_COURSES = gql`
        query getStudentsCourses($userId: String!) {
            students (where: {user_id: {_eq: $userId}}) {
                course {
                    id
                    name
                    description
                    registration_code
                }
            }
        }
    `;

    const [students, setStudents] = useState(null);
    const {data, refetch} = useQuery(STUDENTS_COURSES, {
        variables: {
            userId: userId
        },
    });
    useEffect(() => {
        if(!data) return;
        console.log(data);
        setStudents(data['students'].map(d => d['course']));
    }, [data]);

    return [students, refetch]
};

/* Insert a configuration */
export const InsertStudent = (userId, registration_code) => {
    /* A GraphQL mutation. Mutations are like queries except they modify the graph. This one accepts variables. */
    const INSERT_STUDENTS = gql`
        mutation insertStudents($userId: String!, $registration_code: String!) {
            insert_students(objects: {
                user_id: $userId,
                registration_code: $registration_code
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
    const [insertStudents, {data}] = useMutation(INSERT_STUDENTS);
    const [affectedRows, setAffectedRows] = useState(null);

    /* Check the configuration and call the mutation */
    useEffect(() => {
        if(!(userId && registration_code)) return;
        insertStudents({variables: {
                userId: userId,
                registration_code: registration_code
            }});
    }, [userId, registration_code, insertStudents]);
    /* Check the return value of the mutation and set output */
    useEffect(() => {
        if(!(data && data['insert_students'])) return;
        setAffectedRows(data['insert_students']);
    }, [data]);

    return affectedRows;
};

export const GetStudentProfile = userId => {
    const STUDENTS_PROFILE = gql`
        query getStudentProfile($userId: String!) {
            students (where: {user_id: {_eq: $userId}}) {
                course {
                    id
                    name
                    description
                    registration_code
                    lessons {
                        id
                        name
                        description
                        vocabulary_lists {
                            id
                            name
                            description
                            vocabulary_list_words {
                                translation {
                                    vocabulary_1 {
                                        id
                                        word
                                        language {
                                            language_label
                                        }
                                    }
                                    vocabulary_2 {
                                        id
                                        word
                                        language {
                                            language_label
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    `;

    const [profile, setProfile] = useState(null);
    const {data, refetch} = useQuery(STUDENTS_PROFILE, {
        variables: {
            userId: userId
        },
    });
    useEffect(() => {
        if(!data) return;
        setProfile(data['students']);
    }, [data]);

    return [profile, refetch]
}