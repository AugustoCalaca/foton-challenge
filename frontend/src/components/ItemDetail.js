import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const StyledViewContainer = styled.View`
  flex-direction: row;
  background-color: #fff;
  margin-left: 20;
  margin-right: 20;
  margin-bottom: 5;
  padding-left: 10;
  padding-right: 10;
  padding-bottom: 10;
  padding-top: 10;
  border-radius: 10;
  border-width: 1;
  border-color: rgba(0, 0, 0, 0.35);
`;

const StyledViewIcon = styled.View`
  width: 35;
  height: 35;
  align-items: center;
  justify-content: center;
  border-radius: 20;
  background-color: #120E3D;
`;

const StyledViewText = styled.View`
  flex: 1;
  margin: 0;
  padding-left: 10;
  padding-right: 10;
  padding-bottom: 10;
  padding-top: 0;
`;

const ItemDetail = ({ title, nameIcon }) => (
  <StyledViewContainer>
    <StyledViewIcon>
      <Icon
        name={nameIcon}
        size={18}
        color='#fff'
      />
    </StyledViewIcon>
    <StyledViewText>
      <Text>{title}</Text>
    </StyledViewText>
  </StyledViewContainer>
);

export default ItemDetail;
