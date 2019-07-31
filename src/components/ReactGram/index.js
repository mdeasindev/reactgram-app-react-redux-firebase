import React, { useEffect } from 'react';
import ReactGramBody from './ReactGramBody';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';

const ReactGram = props => {
  useEffect(() => {
    props.firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        props.history.push('/login');
      }
    });
  }, []);

  return (
    <div className="reactgram-app section">
      <ReactGramBody />
    </div>
  );
};

const mapsStateToProps = state => {
  return {
    auth: state.firebase.auth,
  };
};

export default compose(
  firebaseConnect(),
  connect(mapsStateToProps)
)(ReactGram);
