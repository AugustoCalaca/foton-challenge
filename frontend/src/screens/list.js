import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import BookList from '../components/BookList';
import Fab from '../components/Fab';

const { width: WIDTH } = Dimensions.get('window');

const List = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');

  useEffect(_ => {
    navigation.setParams({
      setSearchText: setSearchText
    })
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
      <View style={styles.inputContainer}>
        <Icon name='search' size={14} color='#fff' style={styles.icon} />
        <TextInput
          selectionColor='#4032DA'
          placeholder='Search'
          placeholderTextColor='rgba(255, 255, 255, 0.35)'
          onChangeText={text => navigation.getParam('setSearchText')(text)}
          style={styles.input}
        />
      </View>
    )
  }
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#120E3D',
    borderWidth: 1,
    borderRadius: 30,
    borderColor: 'rgba(255, 255, 255, 0.35)',
    marginHorizontal: 10,
  },
  input: {
    width: 150,
    height: 38,
    paddingLeft: 30,
    paddingRight: 15,
    color: '#fff'
  },
  icon: {
    left: 10,
    position: 'absolute',
  },
})

export default List;
