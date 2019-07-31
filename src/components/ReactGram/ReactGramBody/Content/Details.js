import React from 'react';
import { connect } from 'react-redux';
import { REACTGRAM } from '../../../../constants';

const Details = props => {
  const { story, doLike, uid } = props;
  const Background = story.image_url;
  const likes = story.likes;
  const likesCount = Object.keys(likes).length;

  const handleLikes = () => {
    doLike(story.id, uid);
  };

  return (
    <div className="reactgram-details section">
      <div className="author-title">
        <h3>{story.displayName}</h3>
      </div>
      <div
        className="thumbnail"
        style={{
          backgroundImage: `url(${Background})`,
        }}
      ></div>
      <div className="meta">
        {likes[uid] ? (
          <i className="fas fa-heart fa-lg"></i>
        ) : (
          <i onClick={handleLikes} className="far fa-heart fa-lg"></i>
        )}

        <span>
          {likesCount} {likesCount === 0 ? 'Like' : 'Likes'}
        </span>
      </div>
      <div className="caption">
        <p>
          <strong>{story.displayName}</strong>
          {story.caption}
        </p>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    doLike: (doc_id, u_id) => dispatch({ type: REACTGRAM.LIKE, doc_id, u_id }),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Details);
