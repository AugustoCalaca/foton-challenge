import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import {
  ProgressBarAndroid,
  Alert,
} from 'react-native';

import Input from '../components/Input';
import MyIcon from '../components/MyIcon';
import Header from '../components/Header';
import Button from '../components/Button';
import InputTitle from '../components/InputTitle';
import InputContainer from '../components/InputContainer';

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

const Create = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [borderTitle, setBorderTitle] = useState('');
  const [borderName, setBorderName] = useState('');
  const [borderAge, setBorderAge] = useState('');

  // only numeric characters
  const handleInputChange = ageInput => {
    if(/^\d+$/.test(ageInput) || ageInput === '')
      setAge(parseInt(ageInput));
  };

  const handleSubmit = _ => {
    if(title === '') {
      setBorderTitle('error');
      return false;
    } else {
      setBorderTitle('');
    }

    if(name === '') {
      setBorderName('error');
      return false;
    } else {
      setBorderName('');
    }

    if(age === 0) {
      setBorderAge('error');
      return false;
    } else {
      setBorderAge('');
    }

    return true;
  };

  const completedMutation = _ => {
    setTitle('');
    setName('');
    setAge('');
    Alert.alert(
      'Created Book',
      'You can create as many books as you like o/', [{
        text: 'Ok',
        onPress: _ => navigation.goBack()
      }]
    );
  };

  const onErrorMutation = error => (
    Alert.alert(
      'Unable to create book :(',
      `${error.message.split('GraphQL error:')[1]}`
    )
  );

  useEffect(_ => {
    if(borderTitle === 'error')
      setBorderTitle('');
    if(borderName === 'error')
      setBorderName('');
    if(borderAge === 'error')
      setBorderAge('');
  }, [title, name, age]);

  return (
    <>
      <Header nameIcon='book-open' />

      <InputTitle title='Title' />
      <InputContainer>
        <MyIcon name='bookmark' size={18} color='#fff' />
        <Input
          selectionColor='#4032DA'
          placeholder='Enter Title of the Book'
          multiline={true}
          scrollEnabled={true}
          onChangeText={title => setTitle(title)}
          borderColor={borderTitle}
          value={title}
        />
      </InputContainer>

      <InputTitle title='Author'/>
      <InputContainer>
        <MyIcon name='pen-fancy' size={18} color='#fff' />
        <Input
          selectionColor='#4032DA'
          placeholder='Enter Name of the Author'
          onChangeText={name => setName(name)}
          borderColor={borderName}
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
          borderColor={borderAge}
          value={age}
          maxLength={2}
        />
      </InputContainer>

      <Mutation
        mutation={NEW_BOOK_MUTATION}
        variables={{ title, author: { name, age } }}
        onCompleted={completedMutation}
        onError={onErrorMutation}
      >
        {(addBook, { loading }) => {
          if(loading) return <ProgressBarAndroid />

          return (
            <Button
              title='Create Book'
              onPress={_ => {
                if(handleSubmit()) {
                  addBook();
                }
              }}
            />
          )
        }}
      </Mutation>
    </>
  )
};

export default Create;
