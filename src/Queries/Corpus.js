import gql from "graphql-tag";
import {useEffect, useState} from "react";
import {useQuery} from "@apollo/react-hooks";

export const GetCorpus = grapheme => {
    const CORPUS = gql`
        query getCorpus($graphemes: String!) {
            corpus (limit: 10, where: {graphemes: {_eq: $graphemes}}) {
                id
                graphemes
                phonemes
                wav
                is_good
            }
        }
    `;

    const [corpus, setCorpus] = useState(null);
    const {data, refetch} = useQuery(CORPUS, {
        variables: {
            graphemes: grapheme
        },
        fetchPolicy: "cache-and-network"
    });
    useEffect(() => {
        if (!data) return;
        setCorpus(data.corpus);
    }, [data]);

    return [corpus, refetch]
};
export const GetCorpusById = id => {
    const CORPUS = gql`
        query getCorpus($id: String!) {
            corpus (limit: 10, where: {id: {_eq: $id}}) {
                id
                graphemes
                phonemes
                wav
                is_good
            }
        }
    `;

    const [corpus, setCorpus] = useState(null);
    const {data, refetch} = useQuery(CORPUS, {
        variables: {
            id: id
        },
        fetchPolicy: "cache-and-network"
    });
    useEffect(() => {
        if (!data) return;
        setCorpus(data.corpus);
    }, [data]);

    return [corpus, refetch]
};

export const GetRandomCorpus = grapheme => {
    const RANDOM_CORPUS = gql`
        query getRandomCorpus($graphemes: String!) {
            random_corpus (limit: 10, where: {corpus: {graphemes: {_eq: $graphemes}}}) {
                corpus {
                id
                graphemes
                phonemes
                wav
                is_good
                }
            }
        }
    `;

    const [corpus, setCorpus] = useState(null);
    const {data, refetch} = useQuery(RANDOM_CORPUS, {
        variables: {
            graphemes: grapheme
        },
        fetchPolicy: "cache-and-network"
    });
    useEffect(() => {
        if (!data) return;
        setCorpus(data.random_corpus);
    }, [data]);

    return [corpus, refetch]
};

