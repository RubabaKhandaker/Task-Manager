import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const SIGN_UP = gql`

  mutation SignUp($username: String!, $email: String!, $password: String!) {

    signUp(username: $username, email: $email, password: $password) {

      id
      username
      email

    }

  }

`;

const SignUp = ({ onSignUpSuccess }) => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [signUp] = useMutation(SIGN_UP);

  const handleSignUp = async () => {

    try {

      const response = await signUp({ variables: { username, email, password } });
      console.log('User registered successfully:', response.data.signUp);
      // handling successful sign-up
      onSignUpSuccess();

    } catch (error) {

      console.error('Oh no, there has been an error signing-up:', error.message);

    }

  };

  return (

    <div>

      <h2>Sign Up Here</h2>
      <input type="text" placeholder="Create a username!" onChange={(e) => setUsername(e.target.value)} />
      <input type="text" placeholder="Type your email!" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Type a password!" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignUp}>Sign Up!</button>

    </div>

  );

};

export default SignUp;
