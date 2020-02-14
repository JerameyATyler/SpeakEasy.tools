import React from "react";
import {useApolloClient} from "@apollo/react-hooks";
import gql from "graphql-tag";
import {Theme} from "../../Components/Theme";
import RecordVoiceOverIcon from "@material-ui/icons/RecordVoiceOver";
import IconButton from "@material-ui/core/IconButton";

export default (props) => {
    const graphemes = props.graphemes;
    const GET_NATIVE_EXAMPLES = gql`
        query GetNativeExamples($graphemes: String!) {
            corpus(limit: 10, where: {graphemes: {_eq: $graphemes}}) {
                id
                graphemes
                phonemes
                wav
            }
            corpus_aggregate(where: {graphemes: {_eq: $graphemes}}) {
                aggregate {
                    count
                }
            }
        }
    `;

    const client = useApolloClient();
    return (
        <>
            <IconButton
                style={{color: Theme.palette.secondary.contrastText}}
                onClick={async () => {
                    const {data} = await client.query({
                        query: GET_NATIVE_EXAMPLES,
                        variables: {graphemes: graphemes},
                    });
                    props.setNatives(data.corpus);
                    props.setOpen(true);
                }}
            >
                <RecordVoiceOverIcon/>
            </IconButton>
        </>
    );
};