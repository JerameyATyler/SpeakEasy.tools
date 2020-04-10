import {useQuery} from "@apollo/react-hooks";
import gql from "graphql-tag";
import {useEffect, useState} from "react";

const GET_SAMPLES = gql`
    query GetSamples($sampleLimit: Int!, $sampleOffset: Int!, $graphemes: String!) {
        corpus(limit: $sampleLimit, offset: $sampleOffset, where: {graphemes: {_eq: $graphemes}}) {
            id
            graphemes
            phonemes
            wav
        }
        corpus_aggregate(where: {graphemes: {_eq: $graphemes}}) {
            aggregate {
                count(distinct: true)
            }
        }
    }
`;

export default ({sampleLimit = 5, samplePage = 0, graphemes = ''}) => {
    const {data} = useQuery(GET_SAMPLES, {
        variables: {
            sampleLimit: sampleLimit,
            sampleOffset: sampleLimit * samplePage,
            graphemes: graphemes,
        },
        fetchPolicy: "cache-and-network"
    });

    const [outData, setOutData] = useState(null);
    const [totalPages, setTotalPages] = useState(null);


    useEffect(() => {
        if(!data) return;
        setOutData(data.corpus.map(d => {
            return{
                ...d,
                sampleRate: d.wav.samplerate,
                wav: d.wav.data,
                phonemes: d.phonemes.phonemes
            }
        }));
        setTotalPages(Math.ceil(data.corpus_aggregate.aggregate.count/sampleLimit))
    }, [data, sampleLimit]);

    return [outData, totalPages];
}