

/* Get configurations that pertain to the panorama */
import gql from "graphql-tag";
import {useEffect, useState} from "react";
import {useMutation, useQuery} from "@apollo/react-hooks";

export const GetConfigs = moduleId => {
    /* The graphQL query */
    const MODULE_CONFIG = gql`
        query getConfig($moduleId: Int!) {
            module_configs( where: {
                module: {
                    id: {
                        _eq: $moduleId
                    }
                }
            }) {
                id
                name
                config
            }
        }
    `;

    const [configs, setConfigs] = useState(null);
    const {data, refetch} = useQuery(MODULE_CONFIG, {
        variables: {
            moduleId: moduleId
        },
        fetchPolicy: "cache-and-network"
    });
    /* useEffects are how hooks handle component life-cycle, like onComponentDidMount. This one fires whenever data is
    * updated.
    */
    useEffect(() => {
        if(!data) return;
        setConfigs(data['module_configs']);
    }, [data]);

    return [configs, refetch]
};

export const GetConfigsByName = moduleName => {
    /* The graphQL query */
    const MODULE_CONFIG = gql`
        query getConfig($moduleName: String!) {
            module_configs( where: {
                module: {
                    name: {
                        _eq: $moduleName
                    }
                }
            }) {
                id
                name
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
        setConfigs(data['module_configs']);
    }, [data]);

    return [configs, refetch]
};

/* Insert a configuration */
export const InsertConfig = (moduleId, name, config) => {
    /* A GraphQL mutation. Mutations are like queries except they modify the graph. This one accepts variables. */
    const INSERT_CONFIG = gql`
        mutation insertConfig($moduleId: Int!, $name: String!, $config: jsonb!) {
            insert_module_configs(objects: {
                module_id: $moduleId,
                name: $name,
                config: $config
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
        if(!(moduleId && name && config)) return;
        console.log(config);

        insertConfig({
            variables: {
                moduleId: moduleId,
                name: name,
                config: JSON.stringify(config)
            }
        });


    }, [moduleId, name, config, insertConfig]);
    /* Check the return value of the mutation and set output */
    useEffect(() => {
        if(!(data && data['insert_module_configs'] && data['insert_module_configs']['affected_rows'] > 0)) return;
        setAffectedRows(data['insert_module_configs']['affected_rows']);
    }, [data]);

    return affectedRows;
};

export const UpdateConfig = (configId, name, config) => {
    /* A GraphQL mutation. Mutations are like queries except they modify the graph. This one accepts variables. */
    const UPDATE_CONFIGS = gql`
        mutation updateConfig ($configId: Int!, $name: String!, $config: jsonb!){
          update_module_configs(where: {id: {_eq: $configId}}, _set: {config: $config, name: $name}) {
            affected_rows
          }
        }
    `;

    /* useMutation returns a function for calling the mutation and the data returned. This mutation only returns the
     * number of configurations returned.
     */
    const [updateConfigs, {data}] = useMutation(UPDATE_CONFIGS);
    const [rowsAffected, setRowsAffected] = useState(null);

    /* Check the configuration and call the mutation */
    useEffect(() => {
        if(!(configId && name && config)) return;
        updateConfigs({variables: {
                configId: configId,
                name: name,
                config: config,
            }});
    }, [configId, name, config, updateConfigs]);
    /* Check the return value of the mutation and set output */
    useEffect(() => {
        if(!(data && data['update_module_configs'])) return;
        setRowsAffected(data);
    }, [data]);

    return rowsAffected;
};

export const DeleteConfig = (configId) => {
    /* A GraphQL mutation. Mutations are like queries except they modify the graph. This one accepts variables. */
    const DELETE_CONFIGS = gql`
        mutation deleteConfigs ($configId: Int!){
          delete_module_configs(where: {id: {_eq: $configId}}) {
            affected_rows
          }
        }
    `;

    /* useMutation returns a function for calling the mutation and the data returned. This mutation only returns the
     * number of configurations returned.
     */
    const [deleteConfigs, {data}] = useMutation(DELETE_CONFIGS);
    const [rowsAffected, setRowsAffected] = useState(null);

    /* Check the configuration and call the mutation */
    useEffect(() => {
        if(!configId) return;
        deleteConfigs({variables: {
                configId: configId
            }});
    }, [configId, deleteConfigs]);
    /* Check the return value of the mutation and set output */
    useEffect(() => {
        if(!(data && data['delete_module_configs'])) return;
        setRowsAffected(data);
    }, [data]);

    return rowsAffected;
};