import { ApolloClient, ApolloLink, ApolloProvider, InMemoryCache, HttpLink } from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';
import App from './App';
import './index.css';

import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';

const httpLink = new HttpLink({ uri: 'https://api.lens.dev/' });

const alchemyId = process.env.ALCHEMY_ID;
const infuraId = process.env.INFURA_ID;

const { chains, provider, webSocketProvider } = configureChains(
  [chain.mainnet, chain.polygon],
  [
    alchemyProvider({ apiKey: alchemyId, priority: 1 }),
    infuraProvider({ apiKey: infuraId, priority: 2 }),
    publicProvider({ priority: 0 }),
  ],
);

const client = createClient({
  autoConnect: false,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'scaffold-eth',
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
});

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

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
ReactDOM.render(
  <WagmiConfig client={client}>
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <App subgraphUri={authLink.concat(httpLink)} />
      </BrowserRouter>
    </ApolloProvider>
  </WagmiConfig>,
  document.getElementById('root'),
);
