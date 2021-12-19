import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import Header from '../../components/header/Header';
import { AUTHENTICATION_API } from '../../services/api-url';

const Signup = () => {
  const [user, setUser] = useState({
    firstname: '',
    lastname: '',
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
    if (
      user.email !== '' &&
      user.password !== '' &&
      user.firstname !== '' &&
      user.lastname !== '' &&
      user.phone !== '' &&
      user.cpassword !== ''
    ) {
      e.preventDefault();

      const { firstname, lastname, email, phone, password, cpassword } = user;
      const res = await fetch(AUTHENTICATION_API.register, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstname: firstname.trim(),
          lastname: lastname.trim(),
          email: email.trim(),
          phone: phone.trim(),
          role: 'user',
          password: password.trim(),
          cpassword: cpassword.trim()
        })
      });
      const data = await res.json();
      if (res.status === 422 || !data) {
        Swal.fire({
          icon: 'error',
          title: 'Invalid Details',
          scrollbarPadding: false
        });
      } else {
        Swal.fire({
          title: 'Registration Successful',
          text: 'You will be redirected to login',
          timer: 1000,
          showConfirmButton: false,
          scrollbarPadding: false,
          icon: 'success'
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            history.push('/login');
          }
        });
      }
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
              <span className="label-input">First Name</span>
              <input
                className="input"
                type="text"
                name="firstname"
                required
                value={user.firstname}
                onChange={handleInputs}
                placeholder="First Name"
              />
              <span className="focus-input"></span>
            </div>

            <div className="wrap-input">
              <span className="label-input">Last Name</span>
              <input
                className="input"
                type="text"
                name="lastname"
                required
                value={user.lastname}
                onChange={handleInputs}
                placeholder="Last Name"
              />
              <span className="focus-input"></span>
            </div>

            <div className="wrap-input">
              <span className="label-input">Email</span>
              <input
                className="input"
                type="email"
                name="email"
                required
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
                required
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
                required
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
                required
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
