import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AUTHENTICATION_API } from '../../services/api-url';

const Logout = () => {
  const history = useHistory();

  useEffect(() => {
    fetch(AUTHENTICATION_API.logout, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json'
      },
      credentials: 'include'
    })
      .then((res) => {
        localStorage.clear();
        history.push('/login', { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="spinner-border text-info" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Logout;
