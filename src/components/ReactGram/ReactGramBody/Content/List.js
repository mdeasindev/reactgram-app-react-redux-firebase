import React from 'react';
import Details from './Details';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

const List = props => {
  const { stories, auth } = props;

  return (
    <div className="content-list">
      {stories && auth.uid ? (
        stories.length ? (
          stories.map(story => (
            <Details key={story.id} uid={auth.uid} story={story} />
          ))
        ) : (
          <p className="flow-text extra-info">No stories found</p>
        )
      ) : (
        <p className="flow-text extra-info">Loading...</p>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    stories: state.firestore.ordered.stories,
    auth: state.firebase.auth,
  };
};

export default compose(
  firestoreConnect([{ collection: 'stories', orderBy: ['createdAt', 'desc'] }]),
  connect(mapStateToProps)
)(List);
