

/* Get configurations that pertain to the panorama */
import gql from "graphql-tag";
import {useEffect, useState} from "react";
import {useMutation, useQuery} from "@apollo/react-hooks";

export const GetConfigs = moduleName => {
    /* The graphQL query */
    const MODULE_CONFIG = gql`
        query getConfig($moduleName: String!) {
            module_config( where: {
                module: {
                    name: {
                        _eq: $moduleName
                    }
                }
            }) {
                id
                config
            }
        }
    `;

    const [configs, setConfigs] = useState(null);
    const {data, refetch} = useQuery(MODULE_CONFIG, {
        variables: {
            moduleName: moduleName
        },
        fetchPolicy: "cache-and-network"
    });
    /* useEffects are how hooks handle component life-cycle, like onComponentDidMount. This one fires whenever data is
    * updated.
    */
    useEffect(() => {
        if(!data) return;
        let cs = [];
        if(data['module_config']) cs = data['module_config'].map(c => {return {...JSON.parse(c.config)}});
        setConfigs(cs);
    }, [data]);

    return [configs, refetch]
};

/* Insert a configuration */
export const InsertConfig = config => {
    /* A GraphQL mutation. Mutations are like queries except they modify the graph. This one accepts variables. */
    const INSERT_CONFIG = gql`
        mutation insertConfig($config: jsonb!) {
            insert_module_config(objects: {
                config: $config,
                module_id: 5
            }) {
                affected_rows
            }
        }
    `;

    /* useMutation returns a function for calling the mutation and the data returned. This mutation only returns the
     * number of configurations returned.
     */
    const [insertConfig, {data}] = useMutation(INSERT_CONFIG);
    const [affectedRows, setAffectedRows] = useState(null);
    /* Check the configuration and call the mutation */
    useEffect(() => {
        if(!config) return;
        insertConfig({variables: {config: JSON.stringify(config)}});
    }, [config, insertConfig]);
    /* Check the return value of the mutation and set output */
    useEffect(() => {
        if(!(data && data.insert_module_config && data.insert_module_config.affected_rows > 0)) return;
        setAffectedRows(data.insert_module_config.affected_rows);
    }, [data]);

    return affectedRows;
};