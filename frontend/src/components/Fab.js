import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styled from 'styled-components/native';

const StyledTouchable = styled.TouchableOpacity`
  right: 15;
  bottom: 15;
  width: 55;
  height: 55;
  border-radius:  50;
  position: absolute;
  align-items: center;
  justify-content: center;
  background-color: #3227AB;
`;

const Fab = ({ navigation }) => {
  return (
    <StyledTouchable
      activeOpacity={0.7}
      onPress={_ => navigation.navigate('Create')}
    >
      <Icon name='plus' size={20} color='#fff' />
    </StyledTouchable>
  )
};

export default Fab;
