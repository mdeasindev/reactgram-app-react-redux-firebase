import React from 'react';
import { connect } from 'react-redux';
import { LOGOUT, LOGIN } from '../../constants';
import { Link } from 'react-router-dom';

const Logout = props => {
  const { logout, out } = props;

  return (
    <div className="logout-button">
      <Link
        className="red-text"
        onClick={() => {
          out();
          logout();
        }}
        to="login"
      >
        <strong>Logout</strong>
      </Link>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch({ type: LOGOUT.DONE }),
    out: () => dispatch({ type: LOGIN.OUT }),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Logout);
