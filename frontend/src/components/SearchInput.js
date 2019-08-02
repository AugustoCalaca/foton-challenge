import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const StyledContainer = styled.View`
  flex-direction: row;
  margin-left: 5;
  margin-right: 5;
  justify-content: center;
  align-items: center;
  background-color: #120E3D;
  border-width: 1;
  border-radius: 30;
  border-color: rgba(255, 255, 255, 0.35);
  margin-left: 10;
  margin-right: 10;
`;

const StyledIcon = styled(Icon)`
  left: 10;
  position: absolute;
`;

const StyledInput = styled.TextInput`
  width: 150;
  height: 38;
  padding-left: 30;
  padding-right: 15;
  color: #fff;
`;

const SearchInput = ({ onChangeText }) => (
  <StyledContainer>
    <StyledIcon name='search' size={14} color='#fff' />
    <StyledInput
      selectionColor='#4032DA'
      placeholder='Search'
      placeholderTextColor='rgba(255, 255, 255, 0.35)'
      onChangeText={onChangeText}
    />
  </StyledContainer>
);

export default SearchInput;
