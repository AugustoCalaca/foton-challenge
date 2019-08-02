import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const StyledTouchable = styled.TouchableOpacity`
  flex-direction: row;
  background-color: #fff;
  margin-left: 10;
  margin-right: 10;
  margin-bottom: 5;
  padding-right: 10;
  padding-left: 10;
  padding-top: 10;
  padding-bottom: 10;
  border-radius: 10;
`;

const StyledViewIcon = styled.View`
  width: 35;
  height: 35;
  align-items: center;
  justify-content: center;
  border-radius: 20;
  background-color: ${props => props.backgroundIcon
    ? props.backgroundIcon
    : '#120E3D'
  };
`;

const StyledViewText = styled.View`
  flex: 1;
  margin: 0;
  padding-left: 10;
  padding-right: 10;
  padding-bottom: 10;
  padding-top: 0;
`;

const Item = ({ title, nameIcon, backgroundIcon, onPress }) => (
  <StyledTouchable onPress={onPress}>
    <StyledViewIcon backgroundIcon={backgroundIcon}>
      <Icon
        name={nameIcon}
        size={18}
        color='#fff'
      />
    </StyledViewIcon>

    <StyledViewText>
      <Text>{title}</Text>
    </StyledViewText>
  </StyledTouchable>
);

export default Item;
