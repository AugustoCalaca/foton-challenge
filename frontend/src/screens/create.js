import React, { useState } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import {
  View,
  StyleSheet,
  ProgressBarAndroid,
  Text,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Input from '../components/Input';
import InputContainer from '../components/InputContainer';
import InputTitle from '../components/InputTitle';
import MyIcon from '../components/MyIcon';

const NEW_BOOK_MUTATION = gql`
  mutation addBook($title: String!, $author: AuthorInput!) {
    addBook(title: $title, author: $author) {
      title
      author {
        name
        age
      }
    }
  }
`;

const { width: WIDTH } = Dimensions.get('window');

const Create = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  // only numeric characters
  const handleInputChange = ageInput => {
    if(/^\d+$/.test(ageInput) || ageInput === '')
      setAge(parseInt(ageInput));
  };

  const completedMutation = _ => {
    setTitle('');
    setName('');
    setAge('');
    Alert.alert('Created Book',
      'You can create as many books as you like o/', [{
        text: 'Ok',
        onPress: _ => navigation.goBack()
      }]
    );
  };

  return (
    <>
      <View style={styles.head}>
        <Icon name='book-open' size={80} color='#fff' />
      </View>

      <InputTitle title='Title' />
      <InputContainer>
        <MyIcon name='bookmark' size={18} color='#fff' />
        <Input
          selectionColor='#4032DA'
          placeholder='Enter Title of the Book'
          multiline={true}
          onChangeText={title => setTitle(title)}
          value={title}
        />
      </InputContainer>

      <InputTitle title='Author'/>
      <InputContainer>
        <MyIcon name='pen-fancy' size={18} color='#fff' />
        <Input
          selectionColor='#4032DA'
          placeholder='Enter Name of the Author'
          multiline={true}
          onChangeText={name => setName(name)}
          value={name}
        />
      </InputContainer>

      <InputTitle title='Age'/>
      <InputContainer>
        <MyIcon name='heart' size={18} color='#fff' />
        <Input
          selectionColor='#4032DA'
          placeholder='Enter Age of the Auhtor'
          keyboardType='numeric'
          onChangeText={handleInputChange}
          value={age}
          maxLength={2}
        />
      </InputContainer>

      <Mutation
        mutation={NEW_BOOK_MUTATION}
        variables={{ title, author: { name, age } }}
        onCompleted={completedMutation}
        onError={_ => (
          Alert.alert(
            'A error happened',
            `Unable to create book :(`
          )
        )}
      >
        {(addBook, { data, loading, error }) => {
          if(loading) return <ProgressBarAndroid />
          if(error) return (
            <Text>{error.message}</Text>
          )

          return (
            <View style={styles.buttonContent}>
              <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={_ => {
                if(title === '' || name === '' || age === '')
                  Alert.alert('Blank Field', `Fill them all :/`);
                else
                  addBook();
              }}>
                <Text style={styles.textButton}>Create Book</Text>
              </TouchableOpacity>
            </View>
          )
        }}
      </Mutation>
    </>
  )
};

const styles = StyleSheet.create({
  buttonContent: {
    width: null,
    height: null,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  head: {
    height: 180,
    backgroundColor: '#2F259E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: WIDTH - 20,
    marginTop: 30,
    height: 40,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: 'rgba(0, 0, 0, 0.35)',
    marginHorizontal: 20,
    backgroundColor: '#4032DA'
  },
  textButton: {
    color: '#fff',
    fontWeight: 'bold'
  },
  text: {
    color: '#1D1661',
  }
});

export default Create;
