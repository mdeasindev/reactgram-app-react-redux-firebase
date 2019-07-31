import React from 'react';
import { connect } from 'react-redux';
import { changeForm } from '../../../../store/Actions/reactGramAction';

const StoryForm = props => {
  const { change, formData } = props;

  const handleFileChange = e => {
    const file = e.target.files[0];
    const allowedExtensions = /(image\/jpg|image\/jpeg|image\/png|image\/gif)$/i;
    let error = '';
    if (file) {
      const FileSize = Math.round(file.size / 1024 / 1024);
      if (FileSize > 2) {
        error = 'Please upload image under 2MB';
      }
      if (!allowedExtensions.exec(file.type)) {
        error = 'Please Upload an valid Image';
      }

      const payload = {
        ...formData,
        image: error.length === 0 ? URL.createObjectURL(file) : '',
        filesize: FileSize,
        error,
        file,
      };

      change(payload);
    }
  };

  const handleTextChange = e => {
    const payload = {
      ...formData,
      caption: e.target.value,
      error: !e.target.value ? 'Caption is required.' : '',
    };
    change(payload);
  };

  return (
    <div className="story-form">
      <form>
        <div className="input-field">
          <label htmlFor="photo">Upload Photo</label>
          <br />
          <input
            type="file"
            name="photo"
            id="photo"
            onChange={handleFileChange}
          />
        </div>

        <div
          className={formData.image ? 'photo-preview added' : 'photo-preview'}
          style={{ backgroundImage: `url(${formData.image})` }}
        ></div>
        <div className="input-field">
          <label htmlFor="caption">Caption</label>
          <br />
          <textarea
            onChange={handleTextChange}
            className="materialize-textarea"
            name="caption"
            id="caption"
          />
        </div>
        {formData.error ? (
          <div className="error btn red white-text">{formData.error}</div>
        ) : (
          ''
        )}
      </form>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    change: payload => dispatch(changeForm(payload)),
  };
};

const mapStateToProps = state => {
  return {
    formData: state.reactgram.formData,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StoryForm);
