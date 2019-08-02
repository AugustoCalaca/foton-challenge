import { AsyncStorage } from 'react-native';

const AUTH = 'A_AUTH_TOKEN_VERY_STRONG'

const getToken = async _ => {
  const token = await AsyncStorage.getItem(AUTH);
  return token;
};

const signin = async (newToken) => {
  await AsyncStorage.setItem(AUTH, newToken);
};

const signout = _ => {
  AsyncStorage.removeItem(AUTH);
};

module.exports = {
  getToken,
  signin,
  signout
};
