/* eslint-disable react/prop-types */
import React from 'react';

export default function Post({ post }) {
  return (
    <div className="post-fixed-container">
      <h2>
        {post}
      </h2>
      <div className="direct-cmnt-container">
        <textarea type="text" placeholder="Type a comment..." />
        <button type="submit" className="splash-btn dirct-cmnt">Send</button>
      </div>
    </div>
  );
}
