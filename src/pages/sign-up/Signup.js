import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../../components/header/Header';

const Signup = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    cpassword: ''
  });

  const history = useHistory();

  let name, value;
  const handleInputs = (e) => {
    // console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault();

    const { name, email, phone, password, cpassword } = user;
    const res = await fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name,
        email: email,
        phone: phone,
        role: 'user',
        password: password,
        cpassword: cpassword
      })
    });
    const data = await res.json();
    if (res.status === 422 || !data) {
      window.alert('Invalid Details');
    } else {
      window.alert('Registration Successful');
      history.push('/login');
    }
  };

  return (
    <div>
      <Header />
      <div className="container-signup">
        <div className="signup-more"></div>
        <div className="wrap-signup">
          <form className="signup-form">
            <span className="signup-form-title">Sign Up</span>

            <div className="wrap-input">
              <span className="label-input">Name</span>
              <input
                className="input"
                type="text"
                name="name"
                value={user.name}
                onChange={handleInputs}
                placeholder="Username"
              />
              <span className="focus-input"></span>
            </div>

            <div className="wrap-input">
              <span className="label-input">Email</span>
              <input
                className="input"
                type="email"
                name="email"
                value={user.email}
                onChange={handleInputs}
                placeholder="Email Address"
              />
              <span className="focus-input"></span>
            </div>

            <div className="wrap-input">
              <span className="label-input">Phone</span>
              <input
                className="input"
                type="Number"
                name="phone"
                value={user.phone}
                onChange={handleInputs}
                placeholder="Phone Number"
              />
              <span className="focus-input"></span>
            </div>

            <div className="wrap-input">
              <span className="label-input">Password</span>
              <input
                className="input"
                type="password"
                name="password"
                value={user.password}
                onChange={handleInputs}
                placeholder="**********"
              />
              <span className="focus-input"></span>
            </div>

            <div className="wrap-input">
              <span className="label-input">Confirm Password</span>
              <input
                className="input"
                type="password"
                name="cpassword"
                value={user.cpassword}
                onChange={handleInputs}
                placeholder="**********"
              />
              <span className="focus-input"></span>
            </div>

            <div className="container-signup-form-btn">
              <div className="wrap-signup-form-btn">
                <button className="signup-form-btn" onClick={postData}>
                  Sign Up
                </button>
              </div>

              <Link className="login-button hov1" to="/login">
                Sign in <i className="fas fa-sign-in-alt" />
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
