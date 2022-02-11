import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTodos } from './TodoSlice';
import { FlexboxGrid, List, IconButton, Icon } from 'rsuite';
import { Minus } from '@rsuite/icons';
import { del } from './TodoSlice';

const Todos = () => {
  const todos = useSelector(selectTodos);
  const dispatch = useDispatch();
  return (
    <List bordered>
      {todos.map(({ txt, id }) => (
        <FlexboxGrid key={id}>
          <FlexboxGrid.Item colspan={12}>
            <List.Item bordered>{txt}</List.Item>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={10}></FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={2}>
            {' '}
            <IconButton
              icon={<Minus />}
              color="red"
              appearance="primary"
              circle
              onClick={() => dispatch(del(id))}
            />
          </FlexboxGrid.Item>
        </FlexboxGrid>
      ))}
    </List>
  );
};

export default Todos;
