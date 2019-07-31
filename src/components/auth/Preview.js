import React from 'react';
import preview from '../assets/preview.png';

const Preview = () => {
  return (
    <div className="preview-section">
      <div className="preview-thumb">
        <img src={preview} alt="" />
      </div>
    </div>
  );
};

export default Preview;
