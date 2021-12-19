import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import Header from '../../components/header/Header';
import { AUTHENTICATION_API } from '../../services/api-url';

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async (e) => {
    if (email !== '' && password !== '') {
      e.preventDefault();
      const res = await fetch(AUTHENTICATION_API.signIn, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          password: password
        }),
        credentials: 'include'
      });
      const data = await res.json();

      if (res.status === 400 || !data) {
        Swal.fire({
          icon: 'error',
          title: 'Invalid Credentials',
          scrollbarPadding: false
        });
      } else {
        localStorage.setItem('user-info', JSON.stringify(data));
        history.push('/admin-dashboard');
      }
    }
  };

  return (
    <div>
      <Header />
      <div className="container-signin">
        <div className="signin-more"></div>
        <div className="wrap-signin">
          <form className="signin-form">
            <span className="signin-form-title">Log in</span>

            <div className="wrap-input">
              <span className="label-input">Email</span>
              <input
                className="input"
                type="email"
                name="email"
                value={email}
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Email Address"
              />
              <span className="focus-input"></span>
            </div>

            <div className="wrap-input">
              <span className="label-input">Password</span>
              <input
                className="input"
                type="password"
                name="password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="**********"
              />
              <span className="focus-input"></span>
            </div>

            <div className="container-signin-form-btn">
              <div className="wrap-signin-form-btn">
                <button className="signin-form-btn" onClick={loginUser}>
                  Login
                </button>
              </div>
              <Link className="signup-button hov1" to="/signup">
                Sign up <i className="fas fa-user-plus" />
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
