import React, { useState, useEffect } from 'react';
import BookList from '../components/BookList';
import Fab from '../components/Fab';

import { signout } from '../utils/auth';
import SignOutButton from '../components/SignOutButton';
import SearchInput from '../components/SearchInput';

const List = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');

  useEffect(_ => {
    navigation.setParams({
      setSearchText: setSearchText,
    });
  }, []);

  return (
    <>
      <BookList navigation={navigation} searchText={searchText} />
      <Fab navigation={navigation} />
    </>
  )
};

List.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: 'Book List',
    headerLeft: null,
    headerRight: (
      <>
        <SearchInput
          onChangeText={text => navigation.getParam('setSearchText')(text)}
        />
        <SignOutButton
          onPress={_ => {
            signout();
            navigation.popToTop();
          }}
        />
      </>
    )
  }
};

export default List;
