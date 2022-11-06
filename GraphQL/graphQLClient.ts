import { ApolloClient, InMemoryCache } from "@apollo/client";

// TODO: Swap on deploy
const endpoint = "http://localhost:6969";

const gqlclient = new ApolloClient({
  uri: endpoint,
  cache: new InMemoryCache(),
});

export default gqlclient;
