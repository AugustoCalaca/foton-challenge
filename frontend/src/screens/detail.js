import React from 'react';
import {
  View,
  Text,
  ProgressBarAndroid,
  StyleSheet,
  ScrollView,
} from 'react-native';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Icon from 'react-native-vector-icons/FontAwesome5';

const BOOK_QUERY = gql`
  query getBook($id: ID!) {
    getBook(id: $id) {
      title
      author {
        name
        age
      }
    }
  }
`;

const Detail = ({ navigation }) => {
  const id = navigation.getParam('id');

  return (
    <Query query={BOOK_QUERY} variables={{ id }}>
      {({loading, error, data}) => {
        if(loading) return <ProgressBarAndroid />
        if(error) return (
          Alert.alert('A error happened', `Unable to detail books :(`)
        )

        const bookToRender = data.getBook;

        return (
          <ScrollView>
            <View style={styles.head}>
              <Icon name='book-reader' size={80} color='#fff' />
            </View>

            <View style={styles.container}>
              <View style={styles.textContainer}>
                <Text style={styles.text}>Book's title</Text>
              </View>
              <View style={styles.content}>
                <View style={styles.backgroundIcon}>
                  <Icon name='bookmark' size={18} color='#fff' />
                </View>
                <View style={styles.bookTitle}>
                  <Text>{bookToRender.title}</Text>
                </View>
              </View>

              <View style={styles.textContainer}>
                <Text style={styles.text}>Book's author</Text>
              </View>
              <View style={styles.content}>
                <View style={styles.backgroundIcon}>
                  <Icon name='pen-fancy' size={18} color='#fff' />
                </View>
                <View style={styles.bookTitle}>
                  <Text>{bookToRender.author.name}</Text>
                </View>
              </View>

              <View style={styles.textContainer}>
                <Text style={styles.text}>Age book's author</Text>
              </View>
              <View style={styles.content}>
                <View style={styles.backgroundIcon}>
                  <Icon name='heart' size={18} color='#fff' />
                </View>
                <View style={styles.bookTitle}>
                  <Text>{bookToRender.author.age}</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        )
      }}
    </Query>
  )
};

const styles = StyleSheet.create({
  head: {
    height: 180,
    backgroundColor: '#2F259E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  imageContainer: {
    borderRadius: 20,
    width: 50,
    height: 50,
  },
  content: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginBottom: 5,
    padding:  10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.35)',
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
  textContainer: {
    paddingLeft: 10,
    marginBottom: 5,
    alignItems: 'flex-start',
  },
  text: {
    color: '#1D1661',
  }
});

export default Detail;
