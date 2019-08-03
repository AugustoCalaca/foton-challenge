import React from 'react';
import {
  View,
  ProgressBarAndroid,
  ScrollView,
} from 'react-native';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import Header from '../components/Header';
import ItemDetail from '../components/ItemDetail';
import InputTitle from '../components/InputTitle';

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
            <Header nameIcon='book-reader' />

            <View style={{marginTop: 15}}>
              <InputTitle title={'Book Title'} />
              <ItemDetail
                title={bookToRender.title}
                nameIcon='bookmark'
              />

              <InputTitle title={'Book Author'} />
              <ItemDetail
                title={bookToRender.author.name}
                nameIcon='pen-fancy'
              />

              <InputTitle title={'Author Age'} />
              <ItemDetail
                title={bookToRender.author.age}
                nameIcon='heart'
              />
            </View>
          </ScrollView>
        )
      }}
    </Query>
  )
};

export default Detail;
