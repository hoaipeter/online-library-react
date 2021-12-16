import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../../components/header/Header';

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: password
      }),
      credentials: 'include'
    });
    const data = await res.json();
    localStorage.setItem('user-info', JSON.stringify(data));
    if (res.status === 400 || !data) {
      window.alert('Invalid Credentials');
    } else {
      history.push('/admin-dashboard');
      window.alert('Login Successful');
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
