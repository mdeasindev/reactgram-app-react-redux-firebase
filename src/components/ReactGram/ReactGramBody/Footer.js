import React from 'react';
import { connect } from 'react-redux';
import { REACTGRAM } from '../../../constants';
import Logout from '../../auth/Logout';

const Footer = props => {
  const { enableForm, form, disableForm } = props;
  return (
    <div className="reactgram-footer">
      {form ? (
        <i className="fas fa-home" onClick={() => disableForm()}></i>
      ) : (
        <i className="far fa-plus-square" onClick={() => enableForm()}></i>
      )}

      <Logout />
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    enableForm: () => dispatch({ type: REACTGRAM.ENABLEFORM }),
    disableForm: () => dispatch({ type: REACTGRAM.DISABLEFORM }),
  };
};

const mapStateToProps = state => {
  return {
    form: state.reactgram.form,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer);
