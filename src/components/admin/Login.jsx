import React, { useState, useEffect } from 'react';
import { NavLink, Link, useHistory } from 'react-router-dom';

import { toast } from 'react-toastify';
import axios from 'axios';

function Login() {
  const history = useHistory();
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [disable, setDisable] = useState(false);

  const InputEvent = (e) => {
    const newLoginInfo = { ...loginInfo };
    newLoginInfo[e.target.name] = e.target.value;
    setLoginInfo(newLoginInfo);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (validate()) {
      setDisable(true);
      const { email, password } = loginInfo;

      // var bodyFormData = new FormData();
      // bodyFormData.append('email', userData.inputEmail);
      // bodyFormData.append('password', userData.inputPassword);
      // axios({
      //     method: "post",
      //     url: myurl,
      //     data: bodyFormData,
      //     headers: { "Content-Type": "multipart/form-data" },
      // }).then((response) => {
      //     console.log("Response", response);

      // }).catch((error) => {
      //     console.log("Errors", error);
      // })

      const myurl = 'http://54.177.165.108:3000/api/admin/login';
      var bodyFormData = new URLSearchParams();
      bodyFormData.append('email', email);
      bodyFormData.append('password', password);
      axios({
        method: 'post',
        url: myurl,
        data: bodyFormData,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
        .then((response) => {
          // console.log(response);
          if (response.data.sucecess == true) {
            localStorage.setItem('BRUD_Admin_ID', response.data.data.id);
            localStorage.setItem('BRUD_Admin_EMAIL', response.data.data.email);
            localStorage.setItem('BRUD_Admin_NAME', response.data.data.name);
            toast.success('Login Successfully...!');
            history.push(`/dashboard`);
          } else {
            setDisable(false);
            toast.error('Your Email Id and Password does not match...!');
          }
        })
        .catch((error) => {
          console.log('Errors', error);
        });
    } else {
      setDisable(false);
    }
  };

  const validate = () => {
    let input = loginInfo;

    let errors = {};
    let isValid = true;

    if (!input['email']) {
      isValid = false;
      errors['email_err'] = 'Please enter email';
    }
    if (!input['password']) {
      isValid = false;
      errors['password_err'] = 'Please enter password';
    }

    setErrors(errors);
    return isValid;
  };

  useEffect(() => {
    document.getElementById('page-loader').style.display = 'none';

    var element = document.getElementById('page-container');
    element.classList.add('show');
  }, []);

  return (
    <>
      <div id="page-loader" className="fade show">
        <span className="spinner"></span>
      </div>

      <div className="login-cover">
        <div
          className="login-cover-image"
          style={{
            backgroundImage: 'url(assets/img/login-bg/login-bg-17.jpg)',
          }}
          data-id="login-cover-image"
        ></div>
        <div className="login-cover-bg"></div>
      </div>

      <div id="page-container" className="fade">
        <div
          className="login login-v2"
          data-pageload-addclassName="animated fadeIn"
        >
          <div className="login-header">
            <div className="brand">
              <span className="logo"></span> <b>BRUD</b> Admin
              <small>Login for BRUD admin panel</small>
            </div>
            <div className="icon">
              <i className="fa fa-lock"></i>
            </div>
          </div>

          <div className="login-content">
            <form onSubmit={(e) => submitHandler(e)}>
              <div className="form-group m-b-20">
                <input
                  type="text"
                  className="form-control form-control-lg ml-0"
                  placeholder="Email Address"
                  name="email"
                  onChange={InputEvent}
                />
                <div className="text-danger">{errors.email_err}</div>
              </div>
              <div className="form-group m-b-20">
                <input
                  type="password"
                  className="form-control form-control-lg ml-0"
                  placeholder="Password"
                  name="password"
                  onChange={InputEvent}
                />
                <div className="text-danger">{errors.password_err}</div>
              </div>

              <div className="login-buttons">
                <button
                  type="submit"
                  class="btn btn-success btn-block btn-lg"
                  disabled={disable}
                >
                  {disable ? 'Processing...' : 'Sign me in'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
