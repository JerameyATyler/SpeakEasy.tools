/* Get configurations that pertain to the panorama */
import gql from "graphql-tag";
import {useEffect, useState} from "react";
import {useMutation, useQuery} from "@apollo/react-hooks";

export const GetScores = userId => {
    /* The graphQL query */
    const SCORES = gql`
        query getScores($userId: String!) {
            scores(where: {user_id: {_eq: $userId}}) {
                id
                score
                scores_modules {
                    id
                    name
                }
            }
        }
    `;

    const [scores, setScores] = useState(null);
    const {data, refetch} = useQuery(SCORES, {
        variables: {
            userId: userId
        },
        fetchPolicy: "cache-and-network"
    });
    /* useEffects are how hooks handle component life-cycle, like onComponentDidMount. This one fires whenever data is
    * updated.
    */
    useEffect(() => {
        if (!data) return;
        setScores(data.scores)
    }, [data]);

    return [scores, refetch]
};

/* Insert a configuration */
export const InsertScore = (userId, moduleId, score) => {
    /* A GraphQL mutation. Mutations are like queries except they modify the graph. This one accepts variables. */
    const INSERT_SCORE = gql`
        mutation insertScore($userId: String!, $moduleId: Int!, $score: jsonb!) {
            insert_score(objects: {
                score: $score,
                module_id: $moduleId
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
    const [insertScore, {data}] = useMutation(INSERT_SCORE);
    const [affectedRows, setAffectedRows] = useState(null);
    /* Check the configuration and call the mutation */
    useEffect(() => {
        if (!score) return;
        insertScore({
            variables: {
                user_id: userId,
                score: JSON.stringify(score),
                module_id: moduleId
            }
        });
    }, [score, insertScore, userId, moduleId]);
    /* Check the return value of the mutation and set output */
    useEffect(() => {
        if (!(data && data.insert_score && data.insert_score.affected_rows > 0)) return;
        setAffectedRows(data.insert_score.affected_rows);
    }, [data]);

    return affectedRows;
};