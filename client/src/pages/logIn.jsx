import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const LOGIN = gql`

  mutation Login($email: String!, $password: String!) {

    login(email: $email, password: $password) {

      token
      user {

        id
        username
        email

      }

    }

  }

`;

const Login = ({ onLoginSuccess }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [login] = useMutation(LOGIN);

  const handleLogin = async () => {

    try {

      const response = await login({ variables: { email, password } });
      console.log('User has successfully logged in:', response.data.login);
      // handling a successful login
      onLoginSuccess(response.data.login);

    } catch (error) {

      console.error('Oh no, there has been an error logging in:', error.message);

    }

  };

  return (

    <div>

      <h2>Log In Here</h2>
      <input type="text" placeholder="Type your email here!" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Type your password here!" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login!</button>

    </div>

  );

};

export default Login;
