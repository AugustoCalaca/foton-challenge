import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

const { width: WIDTH } = Dimensions.get('window');

const StyledTouchable = styled.TouchableOpacity`
  height: 35;
  margin-top: 30;
  margin-left: 20;
  border-width: 1;
  margin-right: 20;
  border-radius: 30;
  align-items: center;
  width: ${WIDTH - 20};
  justify-content: center;
  background-color: #4032DA;
  border-color: rgba(0, 0, 0, 0.35);
`;

const StyledText = styled.Text`
  color: #fff;
  font-weight: bold;
`;

const Button = ({ title, onPress }) => (
  <StyledTouchable activeOpacity={0.8} onPress={onPress}>
    <StyledText>{title}</StyledText>
  </StyledTouchable>
);

export default Button;
