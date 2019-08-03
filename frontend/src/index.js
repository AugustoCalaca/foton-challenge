import React from 'react';
import { StatusBar } from 'react-native';

import { ApolloProvider } from 'react-apollo';
import apolloClient from './services/apollo';

import Routes from './routes';

const App = _ => {
  return (
    <ApolloProvider client={apolloClient}>
      <StatusBar backgroundColor='#271E85' barStyle='light-content' />
      <Routes />
    </ApolloProvider>
  );
};

export default App;
