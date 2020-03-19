import ApolloClient from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

import { getUser } from "./queries";
import queryMockConfig from "./queryMock";

const MOCK_DOMAIN = "http://localhost:4001/graphql";
const PROD_DOMAIN = "http://localhost:4000/graphql";

// Controls redirect to mock server
// Specify globally for all queries (headers)
// Specify at query level (queryMockConfig)
const customFetch = (uri, options) => {
  console.log("options: ", options);
  const { operationName } = JSON.parse(options.body);
  const { mock } = options.headers;
  const gql_uri =
    mock || queryMockConfig[operationName] ? MOCK_DOMAIN : PROD_DOMAIN;
  return fetch(gql_uri, options);
};

const link = createHttpLink({
  fetch: customFetch
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

// Query graphql server without hooks and apollo provider
export const getUserQuery = userId => {
  client
    .query({
      query: getUser,
      variables: {
        userId
      },
      context: {
        headers: {
          mock: false
        }
      }
    })
    .then(result => console.log(result));
};

export default client;
