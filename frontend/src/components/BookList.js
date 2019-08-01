import React from 'react';
import {
  View,
  Text,
  ProgressBarAndroid,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Icon from 'react-native-vector-icons/FontAwesome5';

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
          <View style={styles.content}>
            <View style={styles.backgroundIcon}>
              <Icon name='info' size={18} color='#fff' />
            </View>
            <View style={styles.bookTitle}>
              <Text>Sorry, no results</Text>
            </View>
          </View>
        )

        const handleRenderItem = ({ item }) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.7}
            style={styles.content}
            onPress={_ => navigation.navigate('Detail', { id: item.id })}
          >
            <View style={styles.backgroundIcon}>
              <Icon name='book' size={18} color='#fff' />
            </View>
            <View style={styles.bookTitle} >
              <Text>{item.title}</Text>
            </View>
          </TouchableOpacity>
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

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginBottom: 5,
    padding:  10,
    borderRadius: 10,
  },
  backgroundIcon: {
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#120E3D'
  },
  bookTitle: {
    flex: 1,
    margin: 0,
    padding: 10,
    paddingTop: 0,
  },
});

export default BookList;
