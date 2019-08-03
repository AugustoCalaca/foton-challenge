import React, { useState, useEffect } from 'react';
import { View, ProgressBarAndroid, Alert } from 'react-native';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import MyIcon from '../components/MyIcon';
import Input from '../components/Input';
import InputContainer from '../components/InputContainer';
import InputTitle from '../components/InputTitle';
import Button from '../components/Button';
import VisiblePwd from '../components/VisiblePwd';

import { signin } from '../utils/auth';

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
  const [visiblePwd, setVisiblePwd] = useState(true);
  const [visibleConfirmPwd, setVisibleConfirmPwd] = useState(true);

  const handleVisiblePwd = _ => {
    setVisiblePwd(!visiblePwd);
  };

  const handleVisibleConfirmPwd = _ => {
    setVisibleConfirmPwd(!visibleConfirmPwd);
  };

  const handleSubmit = _ => {
    if(userName === '') {
      setBorderUserName('error');
      return false;
    } else {
      setBorderUserName('');
    }

    if(password === '') {
      setBorderPassword('error');
      return false;
    } else {
      setBorderPassword('');
    }
    if(confirm === '') {
      setBorderConfirm('error');
      return false;
    } else {
      setBorderConfirm('');
    }

    if(password !== confirm) {
      setBorderConfirm('error');
      Alert.alert(`Passwords don't match`);
      return false;
    }

    return true;
  };

  const onCompletedMutation = ({ signup }) => {
    signin(signup.jwt)
    Alert.alert('Signup Success :)', '', [{
        text: 'Ok',
        onPress: _ => navigation.navigate('List')
      }]
    );
  };

  const onErrorMutation = error => (
    Alert.alert(
      'Unable to Signup :(',
      `${error.message.split('GraphQL error:')[1]}`
    )
  );

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
        <MyIcon name='user-alt' color='#fff' />
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
        <MyIcon name='lock' />
        <Input
          selectionColor='#4032DA'
          placeholder='Enter Password'
          onChangeText={pass => setPassword(pass)}
          borderColor={borderPassword}
          value={password}
          secureTextEntry={visiblePwd}
          maxLength={15}
        />
        <VisiblePwd visible={visiblePwd} onPress={handleVisiblePwd} />
      </InputContainer>

      <InputTitle title='Confirm'/>
      <InputContainer>
        <MyIcon name='lock' size={18} />
        <Input
          selectionColor='#4032DA'
          placeholder='Confirm Password'
          onChangeText={pass => setConfirm(pass)}
          borderColor={borderConfirm}
          value={confirm}
          secureTextEntry={visibleConfirmPwd}
          maxLength={15}
        />
        <VisiblePwd visible={visibleConfirmPwd} onPress={handleVisibleConfirmPwd} />
      </InputContainer>

      <Mutation
        mutation={SIGNUP}
        variables={{userName, password }}
        onCompleted={onCompletedMutation}
        onError={onErrorMutation}
      >
        {(signup, { loading }) => {
          if(loading) return <ProgressBarAndroid />

          return (
            <Button
              title='Signup'
              onPress={_ => {
                if(handleSubmit()) {
                  signup();
                }
              }}
            />
          )
        }}
      </Mutation>
    </View>
  );
};

export default Signup;
