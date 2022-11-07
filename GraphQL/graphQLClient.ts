import { ApolloClient, InMemoryCache } from "@apollo/client";

// TODO: Swap on deploy
const endpoint =
  "http://cs302-api-gateway-4c723f2cbf13b8ea.elb.ap-southeast-1.amazonaws.com:6969";

const gqlclient = new ApolloClient({
  uri: endpoint,
  cache: new InMemoryCache(),
});

export default gqlclient;
