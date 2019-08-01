import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const IconBackground = styled.View`
  top: 5;
  left: 18;
  width: 35;
  height: 35;
  border-radius: 20;
  position: absolute;
  align-items: center;
  justify-content: center;
  background-color: #120E3D;
`;

const MyIcon = ({ name, size, color }) => (
  <IconBackground>
    <Icon name={name} size={size} color={color} />
  </IconBackground>
);

export default MyIcon;
