import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';

const StyledView = styled.View`
  margin-top: 10;
  align-items: flex-end;
`;

const StyledTouchable = styled.TouchableOpacity`
  padding-left: 10;
  padding-right: 10;
  margin-right: 20;
  margin-left: 20;
  border-width: 1;
  border-radius: 20;
  border-color: #120E3D;
`;

const StyledText = styled.Text`
  font-size: 12;
  color: #120E3D;
`;

const RegisterButton = ({ onPress }) => (
  <StyledView>
    <StyledTouchable activeOpacity={0.7} onPress={onPress}>
      <StyledText>Register</StyledText>
    </StyledTouchable>
  </StyledView>
);

export default RegisterButton;
