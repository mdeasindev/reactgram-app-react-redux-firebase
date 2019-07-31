import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import { LOGIN } from '../../constants';
import { Link } from 'react-router-dom';
import Preview from './Preview';

const Login = props => {
  const { login, inputChange, submit } = props;

  useEffect(() => {
    if (login.success.length) {
      props.history.push('/');
    }
  }, [login.success.length, props.history]);

  useEffect(() => {
    props.firebase.auth().onAuthStateChanged(user => {
      if (user) {
        props.history.push('/');
      }
    });
  }, [props.firebase, props.history]);

  const handleChange = e => {
    const payload = {
      ...login,
      [e.target.name]: e.target.value,
    };
    inputChange(payload);
  };

  const handleSubmit = e => {
    e.preventDefault();
    submit(login);
  };

  // if (login.success.length > 0) return <Redirect to="/" />;

  return (
    <div className="login-form">
      <div className="row">
        <div className="col s12 m12 l6 pink darken-2 white-text">
          <form onSubmit={handleSubmit}>
            <h3>Login</h3>
            <br />
            <div className="input-field">
              <label htmlFor="email">Email:</label>
              <br />
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleChange}
                value={login.email}
              />
            </div>
            <div className="input-field">
              <label htmlFor="password">Password:</label>
              <br />
              <input
                type="password"
                name="password"
                id="password"
                onChange={handleChange}
                value={login.password}
              />
            </div>
            <div className="input-field right-align">
              <button className="btn pink darken-3 z-depth-1">
                <strong>{login.submitting ? 'Logging...' : 'Login'}</strong>
              </button>
              <p>
                If you don't have an account, please{' '}
                <Link to="/register">Register</Link>
              </p>
              {login.error ? (
                <div className="section white red-text error">
                  {login.error}
                </div>
              ) : (
                ''
              )}
            </div>
          </form>

          <div className="copyright">
            <p>
              Developed by{' '}
              <a href="http://mdeasin.com/" className="btn pink darken-2">
                Md Easin
              </a>
              <a href="#" className="btn pink darken-2">
                Github
              </a>
            </p>
          </div>
        </div>
        <div className="col s6 hide-on-med-and-down">
          <Preview />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    login: state.login,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    inputChange: payload => {
      dispatch({
        type: LOGIN.CHANGE,
        payload,
      });
    },
    submit: payload => dispatch({ type: LOGIN.SUBMIT, payload }),
  };
};

export default compose(
  firebaseConnect(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Login);
