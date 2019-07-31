import React from 'react';
import HeaderBTN from './HeaderBTN';
import { connect } from 'react-redux';

const Header = props => {
  const { form } = props;
  return (
    <div className="reactgram-header">
      {form ? <HeaderBTN /> : ''}

      <h1>ReactGram</h1>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    form: state.reactgram.form,
  };
};

export default connect(mapStateToProps)(Header);
