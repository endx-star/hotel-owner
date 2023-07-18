import { ApolloClient, InMemoryCache } from "@apollo/client";

const defaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

const Client = new ApolloClient({
  uri: `http://${process.env.NEXT_PUBLIC_APP_SERVER}:${process.env.NEXT_PUBLIC_APP_PORT}/graphql`,
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
});

export default Client;
