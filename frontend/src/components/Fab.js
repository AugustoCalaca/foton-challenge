import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styled from 'styled-components/native';

const StyledTouchable = styled.TouchableOpacity`
  right: 20;
  bottom: 20;
  width: 60;
  height: 60;
  border-radius:  50;
  position: absolute;
  align-items: center;
  justify-content: center;
  background-color: #1D1661;
`;

const Fab = ({ navigation }) => {
  return (
    <StyledTouchable
      activeOpacity={0.7}
      onPress={_ => navigation.navigate('Create')}
    >
      <Icon name='plus'  size={25} color='#fff' />
    </StyledTouchable>
  )
};

export default Fab;
