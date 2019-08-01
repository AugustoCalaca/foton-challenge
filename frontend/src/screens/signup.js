import React, { useState, useEffect } from 'react';
import { View, ProgressBarAndroid, Alert } from 'react-native';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import MyIcon from '../components/MyIcon';
import Input from '../components/Input';
import InputContainer from '../components/InputContainer';
import InputTitle from '../components/InputTitle';
import Button from '../components/Button';

const SIGNUP = gql`
  mutation signup($userName: String!, $password: String!) {
    signup(userName: $userName, password: $password) {
      userName
      jwt
    }
  }
`;

const Signup = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [borderUserName, setBorderUserName] = useState('');
  const [borderPassword, setBorderPassword] = useState('');
  const [borderConfirm, setBorderConfirm] = useState('');

  const handleSubmit = _ => {
    if(userName === '') {
      setBorderUserName('error')
      return false;
    } else {
      setBorderUserName('')
    }

    if(password === '') {
      setBorderPassword('error')
      return false;
    } else {
      setBorderPassword('')
    }
    if(confirm === '') {
      setBorderConfirm('error')
      return false;
    } else {
      setBorderConfirm('')
    }

    return true;
  };

  useEffect(_ => {
    if(borderUserName === 'error')
      setBorderUserName('');
    if(borderPassword === 'error')
      setBorderPassword('');
    if(borderConfirm === 'error')
      setBorderConfirm('');
  }, [userName, password, confirm]);

  return (
    <View style={{backgroundColor: '#fff', marginTop: 120}}>
      <InputTitle title='UserName' />
      <InputContainer>
        <MyIcon name='user-alt' size={18} color='#fff' />
        <Input
          selectionColor='#4032DA'
          placeholder='Enter UserName'
          onChangeText={name => setUserName(name)}
          borderColor={borderUserName}
          value={userName}
          />
      </InputContainer>

      <InputTitle title='Password'/>
      <InputContainer>
        <MyIcon name='lock' size={18} color='#fff' />
        <Input
          selectionColor='#4032DA'
          placeholder='Enter Password'
          onChangeText={pass => setPassword(pass)}
          borderColor={borderPassword}
          value={password}
          />
      </InputContainer>

      <InputTitle title='Confirm'/>
      <InputContainer>
        <MyIcon name='lock' size={18} color='#fff' />
        <Input
          selectionColor='#4032DA'
          placeholder='Confirm Password'
          onChangeText={pass => setConfirm(pass)}
          borderColor={borderConfirm}
          value={confirm}
          maxLength={15}
        />
      </InputContainer>

      <Mutation
        mutation={SIGNUP}
        variables={{userName, password }}
        onCompleted={navigation.navigate('List')}
        onError={_ => (
          Alert.alert(
            'A error happened',
            `Unable to signup :(`
          )
        )}
      >
        {(signup, { data, loading, error }) => {
          if(loading) return <ProgressBarAndroid />
          if(error) return (
            <Text>{error.message}</Text>
          )

          return (
            <View style={{alignItems: 'center'}}>
              <Button title='Signup' onPress={_ => {
                if(handleSubmit()) {
                  signup();
                }
              }} />
            </View>
          )
        }}
      </Mutation>
    </View>
  );
};

export default Signup;
