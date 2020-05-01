import gql from "graphql-tag";
import {useEffect, useState} from "react";
import {useQuery} from "@apollo/react-hooks";

export const GetTranslations = () => {
    const TRANSLATIONS = gql`
        query getTranslations {
              translations(limit: 10) {
                id
                native_vocabulary_id
                target_vocabulary_id
              }
        }
    `;

    const [translations, setTranslations] = useState(null);
    const {data, refetch} = useQuery(TRANSLATIONS, {

        fetchPolicy: "cache-and-network"
    });
    useEffect(() => {
        if (!data) return;
        setTranslations(data.translations);
    }, [data]);

    return [translations, refetch]
};
export const GetNativeTranslations = vocabId => {
    const TRANSLATIONS = gql`
        query getNativeTranslations($vocabId: Int!) {
              translations(where: {native_vocabulary_id: {_eq: $vocabId}}) {
                id
                native_vocabulary_id
                target_vocabulary_id
              }
        }
    `;

    const [translations, setTranslations] = useState(null);
    const {data, refetch} = useQuery(TRANSLATIONS, {
        variables: {
            vocabId: vocabId
        },
        fetchPolicy: "cache-and-network"
    });
    useEffect(() => {
        if (!data) return;
        setTranslations(data['translations']);
    }, [data]);

    return [translations, refetch]
};
export const GetTargetTranslations = vocabId => {
    const TRANSLATIONS = gql`
        query getTargetTranslations($vocabId: Int!) {
              translations(where: {target_vocabulary_id: {_eq: $vocabId}}) {
                id
                native_vocabulary_id
                target_vocabulary_id
              }
        }
    `;

    const [translations, setTranslations] = useState(null);
    const {data, refetch} = useQuery(TRANSLATIONS, {
        variables: {
            vocabId: vocabId
        },
        fetchPolicy: "cache-and-network"
    });
    useEffect(() => {
        if (!data) return;
        setTranslations(data['translations']);
    }, [data]);

    return [translations, refetch]
};
