import { ApolloClient, InMemoryCache } from "@apollo/client";

const endpoint = "http://localhost:4000";

const gqlclient = new ApolloClient({
  uri: endpoint,
  cache: new InMemoryCache(),
});

export default gqlclient;
