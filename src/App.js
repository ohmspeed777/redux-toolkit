import './App.css';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add } from './features/todos/TodoSlice';

import {
  Button,
  Container,
  Header,
  Navbar,
  Content,
  FlexboxGrid,
  Panel,
  Form,
  ButtonToolbar,
  Divider,
} from 'rsuite';
import Todos from './features/todos/Todos';
import Posts from './features/posts/Posts';

function App() {
  const [todoTxt, setTodoTxt] = useState('');
  const dispatch = useDispatch();
  return (
    <div className="main">
      <Container>
        <Header style={{ marginBottom: '20px' }}>
          <Navbar appearance="inverse">
            <Navbar.Brand href="#">Todo app</Navbar.Brand>
          </Navbar>
        </Header>
        <Content>
          <FlexboxGrid justify="center">
            <FlexboxGrid.Item colspan={12}>
              <Panel header={<h3>Add ToDo</h3>} bordered>
                <Form fluid>
                  <Form.Group>
                    <Form.ControlLabel>What you want to do?</Form.ControlLabel>
                    <Form.Control
                      name="task"
                      value={todoTxt}
                      onChange={setTodoTxt}
                    />
                  </Form.Group>
                  <Form.Group>
                    <ButtonToolbar>
                      <Button
                        appearance="primary"
                        onClick={() => {
                          dispatch(
                            add({ txt: todoTxt, id: Date.now().toString() })
                          );
                          setTodoTxt('');
                        }}
                      >
                        Create
                      </Button>
                    </ButtonToolbar>
                  </Form.Group>
                </Form>
              </Panel>
              <Divider />
              <Todos />
              <Posts />
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Content>
      </Container>
    </div>
  );
}

export default App;
