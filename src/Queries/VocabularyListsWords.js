import gql from "graphql-tag";
import {useEffect, useState} from "react";
import {useMutation, useQuery} from "@apollo/react-hooks";

export const GetVocabularyListsWords = vocabularyListId => {
    const VOCABULARYLISTSWORDS = gql`
        query getVocabularyListsWords($vocabularyListId: Int!) {
            vocabulary_lists_words (where: {vocabulary_lists_id: {_eq: $vocabularyListId}}) {
                id
                translations_id
            }
        }
    `;

    const [vocabularyListsWords, setVocabularyListsWords] = useState(null);
    const {data, refetch} = useQuery(VOCABULARYLISTSWORDS, {
        variables: {
            vocabularyListId: vocabularyListId
        }
    });
    useEffect(() => {
        if(!data) return;
        setVocabularyListsWords(data['vocabulary_lists_words']);
    }, [data]);

    return [vocabularyListsWords, refetch];
};

export const InsertVocabularyListsWords = (vocabularyListsId, translationId) => {
    /* A GraphQL mutation. Mutations are like queries except they modify the graph. This one accepts variables. */
    const INSERT_VOCABULARY_LISTS_WORDS = gql`
        mutation insertVocabularyLists($vocabularyListsId: Int!, $translationId) {
            insert_vocabulary_lists(objects: {
                vocabulary_lists_id: $vocabularyListsId,
                translations_id: $translationId
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
    const [insertVocabularyListsWords, {data}] = useMutation(INSERT_VOCABULARY_LISTS_WORDS);
    const [vocabularyListWordsId, setVocabularyListWordsId] = useState(null);

    /* Check the configuration and call the mutation */
    useEffect(() => {
        if(!(vocabularyListsId, translationId)) return;
        console.log(vocabularyListsId, translationId)
        insertVocabularyListsWords({
            variables: {
                vocabularyListsId: vocabularyListsId,
                translationId: translationId
            }});
    }, [vocabularyListsId, translationId]);
    /* Check the return value of the mutation and set output */
    useEffect(() => {
        if(!(data && data['insert_vocabulary_lists_words'])) return;
        setVocabularyListWordsId(data['insert_vocabulary_lists_words']['returning'][0].id);
    }, [data]);

    return vocabularyListWordsId;
};

export const DeleteVocabularyListsWords = (vocabularyListWordsId) => {
    /* A GraphQL mutation. Mutations are like queries except they modify the graph. This one accepts variables. */
    const DELETE_VOCABULARY_LISTS_WORDS = gql`
        mutation deleteVocabularyLists ($vocabularyListWordsId: Int!){
          delete_vocabulary_lists(where: {id: {_eq: $vocabularyListWordsId}}) {
            affected_rows
          }
        }
    `;

    /* useMutation returns a function for calling the mutation and the data returned. This mutation only returns the
     * number of configurations returned.
     */
    const [deleteVocabularyListsWords, {data}] = useMutation(DELETE_VOCABULARY_LISTS_WORDS);
    const [rowsAffected, setRowsAffected] = useState(null);

    /* Check the configuration and call the mutation */
    useEffect(() => {
        if(!vocabularyListWordsId) return;
        deleteVocabularyListsWords({variables: {
                vocabularyListWordsId: vocabularyListWordsId
            }});
    }, [vocabularyListWordsId, deleteVocabularyListsWords]);
    /* Check the return value of the mutation and set output */
    useEffect(() => {
        if(!(data && data['delete_vocabulary_lists_words'])) return;
        setRowsAffected(data);
    }, [data]);

    return rowsAffected;
};