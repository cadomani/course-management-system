import React, { useState, useEffect } from "react";
import 'bulma/css/bulma.min.css';
import { Button, Columns, Notification, Card, Media, Image, Heading, Content, Container, Form, Icon } from 'react-bulma-components';
import { listUsers, checkUsernameAvailable } from './API';

const App = () => {
  // Define states
  const [username, setUsername] = useState('');
  const [usernameStatus, setUsernameStatus] = useState('This username is available...');

  // List all users on console only while page loads (debug)
  useEffect(() => {
    (async () => {
      const users = await listUsers();
      console.log(users);
    })();
  }, []);

  // useEffect(() => {
  //   const available = (async (username) => {
  //     const available = await checkUsernameAvailable(username);
  //     return available;
  //   })();
  //   console.log(available);
  // }, [username]);

  return (
    <div className="App">
      <Container>
        <form>
          <Form.Field>
            <Form.Label>Username</Form.Label>
            <Form.Control>
              <Form.Input
                color="success"
                value={username}
                onChange={(e) => {
                  return setUsername(e.target.value);
                }}
              />
              <Icon align="left" size="small">
                <i className="fas fa-user" />
              </Icon>
              <Icon align="right" size="small">
                <i className="fas fa-check" />
              </Icon>
            </Form.Control>
            {/* <Form.Control>
              <Form.Input
                color="failure"
                value={usernameStatus}
                onChange={(e) => {
                  return setUsernameStatus(e.target.value);
                }}
              />
              <Icon align="left" size="small">
                <i className="fas fa-user" />
              </Icon>
              <Icon align="right" size="small">
                <i className="fas fa-check" />
              </Icon>
            </Form.Control> */}
            <Form.Help color="success"></Form.Help>
          </Form.Field>
        </form>
      </Container>
    </div>
  );
}

export default App;
