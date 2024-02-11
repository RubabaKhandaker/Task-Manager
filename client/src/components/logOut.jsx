import React from 'react';
import { useHistory } from 'react-router-dom';

const Logout = ({ onLogout }) => {

  const history = useHistory();

  const handleLogout = () => {

    // Clear user token logging out
    localStorage.removeItem('userToken');

    if (onLogout) {

      onLogout();

    }

    // redirect to sign-up page once logged out
    history.push('/pages/signUp');

  };

  return (

    <button onClick={handleLogout}>Logout!</button>

  );

};

export default Logout;

