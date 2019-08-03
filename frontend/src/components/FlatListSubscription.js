import React, { useEffect } from 'react';
import { FlatList} from 'react-native';
import styled from 'styled-components/native';

import Item from './Item';

const StyledFlatList = styled(FlatList)`
  background-color: #ddd;
  padding-top: 15;
  padding-bottom: 15;
  padding-left: 15;
  padding-right: 15;
`;

const FlatListSubscription = ({ navigation, subscribeToMore, data }) => {
  const handleRenderItem = ({ item }) => (
    <Item
      key={item.id}
      title={item.title}
      nameIcon='book'
      onPress={_ => navigation.navigate('Detail', { id: item.id })}
    />
  );

  const emptyComponent = _ => (
    <Item
      title='Sorry, no results'
      nameIcon='exclamation-triangle'
      backgroundIcon='rgba(207, 0, 15, 1)'
    />
  );

  useEffect(_ => {
    subscribeToMore();
  }, []);

  return (
    <StyledFlatList
      data={data}
      renderItem={handleRenderItem}
      ListEmptyComponent={emptyComponent}
    />
  )
};

export default FlatListSubscription;
