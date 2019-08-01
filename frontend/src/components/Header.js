import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const StyledView = styled.View`
  height: 180;
  background-color: #2F259E;
  justify-content: center;
  align-items: center;
`;

const Header = ({ nameIcon }) => (
  <StyledView>
    <Icon name={nameIcon} size={80} color='#fff' />
  </StyledView>
);

export default Header;
