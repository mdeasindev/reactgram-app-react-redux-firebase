import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import { REGISTER } from '../../constants';
import Preview from './Preview';
import { Link } from 'react-router-dom';

const Register = props => {
  const { textChange, register, submit } = props;

  useEffect(() => {
    if (register.success.length) {
      props.history.push('/login');
    }
  }, [props.history, register.success]);

  useEffect(() => {
    props.firebase.auth().onAuthStateChanged(user => {
      if (user) {
        props.history.push('/');
      }
    });
  }, [props.firebase, props.history]);

  const handleChange = e => {
    const payload = {
      ...register,
      [e.target.name]: e.target.value,
    };

    textChange(payload);
  };

  const handleSubmit = e => {
    e.preventDefault();
    submit(register);
  };

  return (
    <div className="register-form">
      <div className="row">
        <div className="col s12 m12 l6 pink darken-2 white-text">
          <form onSubmit={handleSubmit}>
            <h3>Register:</h3>
            <br />
            <div className="input-field">
              <label htmlFor="name">Name:</label>
              <br />
              <input
                type="text"
                name="name"
                id="name"
                onChange={handleChange}
              />
            </div>
            <div className="input-field">
              <label htmlFor="email">Email:</label>
              <br />
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleChange}
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
              />
            </div>
            <div className="input-field right-align">
              <button className="btn pink darken-3 z-depth-1">
                <strong>
                  {register.submitting ? 'Creating...' : 'Register'}
                </strong>
              </button>
              <p>
                If you already have an account, please{' '}
                <Link to="/login">Login</Link>
              </p>
              {register.error ? (
                <div className="section white red-text error">
                  {register.error}
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
    register: state.register,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    textChange: payload =>
      dispatch({
        type: REGISTER.CHANGE,
        payload,
      }),
    submit: payload => dispatch({ type: REGISTER.SUBMIT, payload }),
  };
};

export default compose(
  firebaseConnect(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Register);
