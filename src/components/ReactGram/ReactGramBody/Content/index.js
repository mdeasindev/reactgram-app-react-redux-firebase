import React from 'react';
import List from './List';
import { connect } from 'react-redux';
import StoryForm from './StoryForm';

const Content = props => {
  const { form } = props;
  return (
    <div className="reactgram-content">{form ? <StoryForm /> : <List />}</div>
  );
};

const mapStateToProps = state => {
  return {
    form: state.reactgram.form,
  };
};

export default connect(mapStateToProps)(Content);
