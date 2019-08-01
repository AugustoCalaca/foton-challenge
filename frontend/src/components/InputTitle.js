import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components';

const StyledView = styled.View`
  padding-left: 30;
  margin-top: 5;
  margin-bottom: 2;
  align-items: flex-start;
`;

const InputTitle = ({ title }) => (
  <StyledView>
    <Text style={{color: '#1D1661'}}>{title}</Text>
  </StyledView>
);

export default InputTitle;
