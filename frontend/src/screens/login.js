import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import Input from '../components/Input';
import MyIcon from '../components/MyIcon';
import InputContainer from '../components/InputContainer';
import Button from '../components/Button';
import RegisterButton from '../components/RegisterButton';

const LOGIN = gql`
  mutation login($userName: String!, $password: String!) {
    login(userName: $userName, password: $password) {
      userName
      jwt
    }
  }
`;

const Login = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [borderUserName, setBorderUserName] = useState('');
  const [borderPassword, setBorderPassword] = useState('');

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

    return true;
  };

  useEffect(_ => {
    if(borderUserName === 'error')
      setBorderUserName('');
    if(borderPassword === 'error')
      setBorderPassword('');
  }, [userName, password]);

  return (
    <View style={{backgroundColor: '#fff', marginTop: 150}}>
      <InputContainer >
        <MyIcon name='user-alt' size={18} color='#fff' />
        <Input
          selectionColor='#4032DA'
          placeholder='Enter UserName'
          onChangeText={name => setUserName(name)}
          borderColor={borderUserName}
          value={userName}
        />
      </InputContainer>

      <InputContainer>
        <MyIcon name='lock' size={18} color='#fff' />
        <Input
          selectionColor='#4032DA'
          placeholder='Enter Password'
          onChangeText={pass => setPassword(pass)}
          borderColor={borderPassword}
          value={password}
          maxLength={15}
        />
      </InputContainer>

      <Mutation
        mutation={LOGIN}
        variables={{ userName, password }}
        onCompleted={navigation.navigate('List')}
        onError={_ => (
          Alert.alert(
            'A error happened',
            `Unable to signup :(`
          )
        )}
      >
        {(login, { data, loading, error }) => {
          if(loading) return <ProgressBarAndroid />
          if(error) return (
            <Text>{error.message}</Text>
          )

          return (
            <View style={{alignItems: 'center'}}>
              <Button title='Login' onPress={_ => {
                if(handleSubmit()) {
                  login();
                }
              }} />
            </View>
          )
        }}
      </Mutation>

      {/* <View style={{alignItems: 'center'}}>
        <Button title='Login' onPress={_ => {
          if(handleSubmit()){
            navigation.navigate('List')
          }
        }} />
      </View> */}
      <RegisterButton onPress={_ => { navigation.navigate('Signup')}} />
    </View>
  );
};

Login.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: navigation.getParam('headerTitle')
  }
};

// color: '#4032DA',
// color: '#382CBD'
// color: '#2F259E'
// color: '#251D7E'
// color: '#1D1661'
// color: '#120E3D'
export default Login;
