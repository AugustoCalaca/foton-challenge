import { AsyncStorage } from 'react-native';

const AUTH = 'AUTH'

const getToken = async _ => {
  const token = await AsyncStorage.getItem(AUTH);
  return token;
};

const signin = (newToken) => {
  const token = newToken;
  return AsyncStorage.setItem(AUTH, newToken);
};

const signout = _ => {
  return AsyncStorage.removeItem(AUTH);
};

module.exports = {
  getToken,
  signin,
  signout
};
