import React from 'react';
import {
  ProgressBarAndroid,
  Alert
} from 'react-native';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import FlatListSubscription from './FlatListSubscription';

const BOOKS_QUERY = gql`
  query getBooks {
    getBooks {
      id
      title
    }
  }
`;

const SEARCH_BOOKS_QUERY = gql`
  query searchBooks($search: String!) {
    searchBooks(search: $search) {
      id
      title
    }
  }
`;

const BOOK_ADDED = gql`
  subscription bookAdded {
    bookAdded {
      id
      title
    }
  }
`;

const BookList = ({ navigation, searchText }) => {
  const onErrorQuery = _ => {
    return (
      Alert.alert(
        'A error happened',
        `Unable to list books :(`)
    )
  };

  return (
    <Query
      query={searchText === '' ? BOOKS_QUERY : SEARCH_BOOKS_QUERY}
      variables={{search: searchText}}
      onError={onErrorQuery}
    >
      {({loading, data, subscribeToMore}) => {
        if(loading) return <ProgressBarAndroid />

        const handleSubscribeToMore = subscribeToMore => {
          subscribeToMore({
            document: BOOK_ADDED,
            updateQuery: (prev, { subscriptionData }) => {
              if(!subscriptionData.data) return prev;

              const newBook = subscriptionData.data.bookAdded;

              return Object.assign({}, prev, {
                getBooks: [
                  newBook,
                  ...prev.getBooks
                ]
              })
            }
          })
        };

        return (
          <FlatListSubscription
            navigation={navigation}
            subscribeToMore={_ => handleSubscribeToMore(subscribeToMore)}
            data={searchText === '' ? data.getBooks : data.searchBooks}
          />
        )
      }}
    </Query>
  )
};

export default BookList;
