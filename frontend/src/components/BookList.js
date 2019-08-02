import React from 'react';
import {
  ProgressBarAndroid,
  FlatList,
  Alert,
} from 'react-native';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Item from '../components/Item';

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

const BookList = ({ navigation, searchText }) => {
  return (
    <Query
      query={searchText === '' ? BOOKS_QUERY : SEARCH_BOOKS_QUERY}
      variables={{search: searchText}}
    >
      {({loading, error, data}) => {
        if(loading) return <ProgressBarAndroid />
        if(error) return (
          Alert.alert('A error happened', `Unable to list books :(`)
        )

        const booksToRender = searchText === '' ? data.getBooks : data.searchBooks;

        const emptyComponent = _ => (
          <Item
            title='Sorry, no results'
            nameIcon='exclamation-triangle'
            backgroundIcon='rgba(207, 0, 15, 1)'
          />
        )

        const handleRenderItem = ({ item }) => (
          <Item
            key={item.id}
            title={item.title}
            nameIcon='book'
            onPress={_ => navigation.navigate('Detail', { id: item.id })}
          />
        );

        return (
          <FlatList
            data={booksToRender}
            renderItem={handleRenderItem}
            ListEmptyComponent={emptyComponent}
            style={{backgroundColor: '#ddd', padding: 15,}}
          />
        )
      }}
    </Query>
  )
};

export default BookList;
