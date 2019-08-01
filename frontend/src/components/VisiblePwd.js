import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const IconTouchable = styled.TouchableOpacity`
  top: 5;
  width: 35;
  height: 35;
  border-radius: 20;
  position: absolute;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  right: 20;
`;

const VisiblePwd = ({ visible, onPress }) => (
  <IconTouchable activeOpacity={0.7} onPress={onPress}>
    <Icon name={visible ? 'eye-slash' : 'eye'} size={18} color='rgba(0, 0, 0, 0.35)' />
  </IconTouchable>
);

export default VisiblePwd;
