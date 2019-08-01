import React, { useState, useEffect } from 'react';
import { View, ProgressBarAndroid , Alert} from 'react-native';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import Input from '../components/Input';
import MyIcon from '../components/MyIcon';
import InputContainer from '../components/InputContainer';
import Button from '../components/Button';
import RegisterButton from '../components/RegisterButton';
import VisiblePwd from '../components/VisiblePwd';

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
  const [visiblePwd, setVisiblePwd] = useState(true);

  const handleVisiblePwd = _ => {
    setVisiblePwd(!visiblePwd);
  };

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

  const onCompletedMutation = _ => navigation.navigate('List');

  const onErrorMutation = error => (
    Alert.alert(
      'Unable to Login :(',
      `${error.message.split('GraphQL error:')[1]}`
    )
  );

  useEffect(_ => {
    if(borderUserName === 'error')
      setBorderUserName('');
    if(borderPassword === 'error')
      setBorderPassword('');
  }, [userName, password]);

  return (
    <View style={{backgroundColor: '#fff', marginTop: 150}}>
      <InputContainer >
        <MyIcon name='user-alt' size={18} />
        <Input
          selectionColor='#4032DA'
          placeholder='Enter UserName'
          onChangeText={name => setUserName(name)}
          borderColor={borderUserName}
          value={userName}
        />
      </InputContainer>

      <InputContainer>
        <MyIcon name='lock' size={18} />
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

      <Mutation
        mutation={LOGIN}
        variables={{ userName, password }}
        onCompleted={onCompletedMutation}
        onError={onErrorMutation}
      >
        {(login, { loading }) => {
          if(loading) return <ProgressBarAndroid />

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

      <RegisterButton onPress={_ => { navigation.navigate('Signup')}} />
    </View>
  );
};

Login.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: navigation.getParam('headerTitle')
  }
};

export default Login;
