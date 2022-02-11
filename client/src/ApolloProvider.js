import React from "react";
// Wraps the entire app into the Apollo Provider (Connects to our server)
import App from "./App";
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
} from "@apollo/client";

const httplink = createHttpLink({
  // GraphQL Server Endpoint
  uri: "http://localhost:5000",
});

const client = new ApolloClient({
  link: httplink,
  cache: new InMemoryCache(),
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
