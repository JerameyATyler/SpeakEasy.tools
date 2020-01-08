import React from "react";
import {useApolloClient} from "@apollo/react-hooks";
import gql from "graphql-tag";
import IconButton from "@material-ui/core/IconButton";
import {KeyboardArrowRight} from "@material-ui/icons";

export const GetQuestion = (props) => {

    const client = useApolloClient();
    return (
        <>
            <IconButton
                variant='contained'
                color='primary'
                aria-controls="load-question"
                onClick={async () => {
                    const {data} = await client.query({
                        query: GET_QUESTION,
                        variables: {limit: 4},
                    });
                    props.setQuestion(formQuestion(data.random_lessons.map(l => l.lesson)));
                }}>
                <KeyboardArrowRight/>
            </IconButton>
        </>
    );
};