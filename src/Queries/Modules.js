/* Get configurations that pertain to the panorama */
import gql from "graphql-tag";
import {useEffect, useState} from "react";
import {useQuery} from "@apollo/react-hooks";

export const GetModules = () => {
    /* The graphQL query */
    const MODULES = gql`
        query getModules {
            modules{
                id
                name
            }
        }
    `;

    const [modules, setModules] = useState(null);
    const {data, refetch} = useQuery(MODULES, {
        fetchPolicy: "cache-and-network"
    });
    /* useEffects are how hooks handle component life-cycle, like onComponentDidMount. This one fires whenever data is
    * updated.
    */
    useEffect(() => {
        if (!data) return;
        console.log(modules)
        setModules(data.modules);
    }, [data, modules]);

    return [modules, refetch]
};
