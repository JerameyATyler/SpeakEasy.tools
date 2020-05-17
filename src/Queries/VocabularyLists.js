import gql from "graphql-tag";
import {useEffect, useState} from "react";
import {useMutation, useQuery} from "@apollo/react-hooks";

export const GetVocabularyLists = lessonId => {
    const VOCABULARYLISTS = gql`
        query getVocabularyLists($lessonId: Int!) {
            vocabulary_lists (where: {lesson_id: {_eq: $lessonId}}) {
                id
                name
                description
                is_public
            }
        }
    `;

    const [vocabularyLists, setVocabularyLists] = useState(null);
    const {data, refetch} = useQuery(VOCABULARYLISTS, {
        variables: {
            lessonId: lessonId
        }
    });
    useEffect(() => {
        if(!data) return;
        setVocabularyLists(data['vocabulary_lists']);
    }, [data]);

    return [vocabularyLists, refetch];
};

export const InsertVocabularyLists = (lessonId, name, description, isPublic) => {
    /* A GraphQL mutation. Mutations are like queries except they modify the graph. This one accepts variables. */
    const INSERT_VOCABULARY_LISTS = gql`
        mutation insertVocabularyLists($lessonId: Int!, $name: String!, $description: String!, $isPublic: Boolean!) {
            insert_vocabulary_lists(objects: {
                lesson_id: $lessonId
                name: $name,
                description: $description,
                is_public: $isPublic
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
    const [insertVocabularyLists, {data}] = useMutation(INSERT_VOCABULARY_LISTS);
    const [vocabularyListId, setVocabularyListId] = useState(null);

    /* Check the configuration and call the mutation */
    useEffect(() => {
        if(!(lessonId && isPublic && name && description)) return;
        insertVocabularyLists({
            variables: {
                lessonId: lessonId,
                name: name,
                description: description,
                isPublic: isPublic
            }});
    }, [lessonId, isPublic, name, description, insertVocabularyLists]);
    /* Check the return value of the mutation and set output */
    useEffect(() => {
        if(!(data && data['insert_vocabulary_lists'])) return;
        setVocabularyListId(data['insert_vocabulary_lists']['returning'][0].id);
    }, [data]);

    return vocabularyListId;
};

export const UpdateVocabularyList = (vocabularyListId, name, description) => {
    /* A GraphQL mutation. Mutations are like queries except they modify the graph. This one accepts variables. */
    const UPDATE_VOCABULARY_LISTS = gql`
        mutation updateVocabularyLists ($vocabularyListId: Int!, $name: String!, $description: String!){
          update_vocabulary_lists(where: {id: {_eq: $vocabularyListId}}, _set: {description: $description, name: $name, translations: $translations}) {
            affected_rows
          }
        }
    `;

    /* useMutation returns a function for calling the mutation and the data returned. This mutation only returns the
     * number of configurations returned.
     */
    const [updateVocabularyLists, {data}] = useMutation(UPDATE_VOCABULARY_LISTS);
    const [rowsAffected, setRowsAffected] = useState(null);

    /* Check the configuration and call the mutation */
    useEffect(() => {
        if(!(vocabularyListId && name && description)) return;
        updateVocabularyLists({
            variables: {
                vocabularyListId: vocabularyListId,
                name: name,
                description: description
            }});
    }, [vocabularyListId, name, description, updateVocabularyLists]);
    /* Check the return value of the mutation and set output */
    useEffect(() => {
        if(!(data && data['update_vocabulary_lists'])) return;
        setRowsAffected(data);
    }, [data]);

    return rowsAffected;
};

export const DeleteVocabularyList = (vocabularyListId) => {
    /* A GraphQL mutation. Mutations are like queries except they modify the graph. This one accepts variables. */
    const DELETE_VOCABULARY_LISTS = gql`
        mutation deleteVocabularyLists ($vocabularyListId: Int!){
          delete_vocabulary_lists(where: {id: {_eq: $vocabularyListId}}) {
            affected_rows
          }
        }
    `;

    /* useMutation returns a function for calling the mutation and the data returned. This mutation only returns the
     * number of configurations returned.
     */
    const [deleteVocabularyLists, {data}] = useMutation(DELETE_VOCABULARY_LISTS);
    const [rowsAffected, setRowsAffected] = useState(null);

    /* Check the configuration and call the mutation */
    useEffect(() => {
        if(!vocabularyListId) return;
        deleteVocabularyLists({variables: {
                vocabularyListId: vocabularyListId
            }});
    }, [vocabularyListId, deleteVocabularyLists]);
    /* Check the return value of the mutation and set output */
    useEffect(() => {
        if(!(data && data['delete_vocabulary_lists'])) return;
        setRowsAffected(data);
    }, [data]);

    return rowsAffected;
};