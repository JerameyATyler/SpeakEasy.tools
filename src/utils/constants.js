import config from "../config";

/*
* This file uses the constants we set in config.js to populate the URL we use to talk to the database. We do it this way
* for security purposes. By keeping the other file secret and setting variable at build-time we can control some of the
* code that the browser has access to.
*/
const HASURA_GRAPHQL_ENGINE_HOSTNAME = config.GRAPHQL_HOST;

export const GRAPHQL_URL = `https://${HASURA_GRAPHQL_ENGINE_HOSTNAME}/v1/graphql`;
