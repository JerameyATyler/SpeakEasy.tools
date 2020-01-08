import config from "../config";

const HASURA_GRAPHQL_ENGINE_HOSTNAME = config.GRAPHQL_HOST;

export const GRAPHQL_URL = `https://${HASURA_GRAPHQL_ENGINE_HOSTNAME}/v1/graphql`;
export const REALTIME_GRAPHQL_URL = `ws${HASURA_GRAPHQL_ENGINE_HOSTNAME}/v1/graphql`;
