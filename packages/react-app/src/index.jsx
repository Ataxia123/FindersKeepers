import { ApolloClient, ApolloProvider, InMemoryCache, ApolloLink, HttpLink } from '@apollo/client';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

const subgraphUri = 'http://localhost:8000/subgraphs/name/scaffold-eth/your-contract';

const httpLink = new HttpLink({ uri: 'https://api.lens.dev/' });

// example how you can pass in the x-access-token into requests using `ApolloLink`
const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the authorization token from local storage.
  // if your using node etc you have to handle your auth different
  const token = localStorage.getItem('auth_token');

  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      'x-access-token': token ? `Bearer ${token}` : '',
    },
  });

  // Call the next link in the middleware chain.
  return forward(operation);
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App subgraphUri={subgraphUri} />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root'),
);
