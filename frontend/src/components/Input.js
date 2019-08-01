import React from 'react';
import { Dimensions, TextInput } from 'react-native';
import styled from 'styled-components/native';

const { width: WIDTH } = Dimensions.get('window');

const Input = styled.TextInput`
  width: ${WIDTH - 20};
  height: 45;
  border-width: 1;
  border-radius: 30;
  border-color: ${props => props.borderColor === 'error'
    ? 'rgba(207, 0, 15, 1)'
    : 'rgba(0, 0, 0, 0.35)'
  };
  margin-left: 20;
  margin-right: 20;
  padding-left: 50;
`;

export default Input;
