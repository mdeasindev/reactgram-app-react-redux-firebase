import React from 'react';
import { connect } from 'react-redux';
import { REACTGRAM } from '../../../constants';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

const HeaderBTN = props => {
  const { disableForm, share, reactgram, empty, auth, users } = props;
  const { image, error, caption, file } = reactgram.formData;

  const handleCancel = () => {
    disableForm();
  };

  const handleShare = () => {
    const currentUser = users.find(user => user.uid === auth.uid);
    if (image && caption && !error && users) {
      share({
        file,
        caption,
        uid: auth.uid,
        displayName: currentUser.name,
      });
    } else {
      empty();
    }
  };

  if (auth.uid) {
    return (
      <div className="header-btn">
        <div className="share-btn blue-text lighten-4" onClick={handleCancel}>
          Cancel
        </div>

        {reactgram.is_sharing ? (
          <div className="share-btn blue-text lighten-4">Sharing...</div>
        ) : (
          <div onClick={handleShare} className="share-btn blue-text lighten-4">
            Share
          </div>
        )}
      </div>
    );
  }
};

const mapDispatchToProps = dispatch => {
  return {
    disableForm: () => dispatch({ type: REACTGRAM.DISABLEFORM }),
    share: payload => dispatch({ type: REACTGRAM.SHARE, payload }),
    empty: () => dispatch({ type: REACTGRAM.EMPTYFIELDS }),
  };
};

const mapStateToProps = state => {
  return {
    reactgram: state.reactgram,
    auth: state.firebase.auth,
    users: state.firestore.ordered.users,
  };
};

export default compose(
  firestoreConnect(['users']),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(HeaderBTN);
