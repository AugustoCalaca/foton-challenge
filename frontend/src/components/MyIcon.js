import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const IconBackground = styled.View`
  top: 5;
  left: 15;
  width: 35;
  height: 35;
  border-radius: 20;
  position: absolute;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.background ? props.background : '#120E3D'};
`;

const MyIcon = ({ name, size, color, background }) => (
  <IconBackground background={background}>
    <Icon name={name} size={size} color={color ? color : '#fff'} />
  </IconBackground>
);

export default MyIcon;
