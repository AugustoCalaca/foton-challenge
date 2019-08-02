import React from 'react';
import styled from 'styled-components/native';

const StyledTouchable = styled.TouchableOpacity`
  height: 35;
  justify-content: center;
  margin-right: 10;
  margin-left: 0;
  padding-left: 5;
  padding-right: 5;
  background-color: rgba(217, 30, 24, 1);
`;

const StyledText = styled.Text`
  color: #fff;
`;

const SignOutButton = ({ onPress }) => (
  <StyledTouchable activeOpacity={0.4} onPress={onPress}>
    <StyledText>Sign Out</StyledText>
  </StyledTouchable>
);

export default SignOutButton;
