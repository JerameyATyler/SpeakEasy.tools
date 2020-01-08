import React from "react";
import {useApolloClient} from "@apollo/react-hooks";
import Button from "@material-ui/core/Button";
import gql from "graphql-tag";
import shuffle from "../../utils/Shuffle";

export const GetBoard = (props) => {
    const GET_MEMORY_BOARD = gql`
        query GetMemoryBoard($limit: Int!){  
          random_lessons(limit: $limit) {
            lesson {
            english
            chinese
            id
            pinyin
            }
          }
        }
    `;

    const boardSize = props.boardSize;
    const tileToFetch = Math.ceil(parseInt(boardSize)/2);

    const client = useApolloClient();
    return (
        <>
            <Button
                variant='contained'
                color='secondary'
                aria-controls="load-board"
                onClick={async () => {
                    const {data} = await client.query({
                        query: GET_MEMORY_BOARD,
                        variables: {limit: tileToFetch},
                    });
                    props.setBoard(shuffle(data.random_lessons.concat(data.random_lessons)).map(t=> t.lesson));
                }}>
                Load Board
            </Button>
        </>
    );
};