/* eslint-disable react/prop-types */
import { useState } from 'react';
import axios from 'axios';
import url from '../url';

export default function Post({ post, user }) {
  const [directCommentCapture, setDirectCommentCapture] = useState('');
  const [badComment, setBadComment] = useState(false);
  const [notAllowed, setNotAllowed] = useState(false);

  const notAllowedStyle = {
    cursor: 'not-allowed',
    opacity: '0.6',
  };

  console.log(post);
  const handleSubmittingDirectComment = async () => {
    if (!directCommentCapture) {
      setBadComment(true);
      setTimeout(() => setBadComment(false), 800);
    } else {
      setNotAllowed(true);
      const comment = {
        user_id: user.id,
        conversation_id: post.id,
        text: directCommentCapture,
      };
      console.log(comment);
      const response = await axios.post(`${url}/direct_comments`, comment);
      console.log(response.data);
    }
  };
  return (
    <div className="post-fixed-container">
      <h2>
        {post.text}
      </h2>
      <div className="direct-cmnt-container">
        <textarea
          className={badComment ? 'wrong-comment-txt' : null}
          type="text"
          placeholder="Type a comment..."
          onChange={(e) => setDirectCommentCapture(e.target.value)}
        />
        <button
          style={notAllowed ? notAllowedStyle : null}
          type="submit"
          className={directCommentCapture ? 'splash-btn dirct-cmnt' : 'splash-btn dirct-cmnt inactive'}
          onClick={() => handleSubmittingDirectComment()}
        >
          Send

        </button>
      </div>
    </div>
  );
}
