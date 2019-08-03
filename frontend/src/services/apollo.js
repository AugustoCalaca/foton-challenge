import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { split } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { getToken } from '../utils/auth';

const URL = 'foton-server.herokuapp.com/graphql';

const authLink = setContext(async (req, { headers }) => {
  const token = await getToken();

  return {
    ...headers,
    headers: {
      authorization: token ? `Bearer ${token}` : null
    }
  };
});

const httpLink = new HttpLink({
  uri: `https://${URL}`
});

const httpWithAuthToken = authLink.concat(httpLink);

const wsLink = new WebSocketLink({
  uri: `wss://${URL}`,
  options: {
    reconnect: true,
    connectionParams: async _ => {
      const token = await getToken();
      return {
        headers: {
          authorization: token ? `Bearer ${token}` : null
        }
      }
    },
  }
});

const isSubscriptionOperation = ({ query }) => {
  const { kind, operation } = getMainDefinition(query);
  return (
    kind === 'OperationDefinition' && operation === 'subscription'
  );
};

const link = split(
  isSubscriptionOperation,
  wsLink,
  httpWithAuthToken,
);

const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache
});

export default client;
