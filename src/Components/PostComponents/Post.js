/* eslint-disable react/prop-types */
import { useState } from 'react';
import axios from 'axios';
import url from '../url';

export default function Post({
  post, user, setAddedNewComment, setRoomStatus,
}) {
  const [directCommentCapture, setDirectCommentCapture] = useState('');
  const [badComment, setBadComment] = useState(false);
  const [notAllowed, setNotAllowed] = useState(false);

  const notAllowedStyle = {
    cursor: 'not-allowed',
    opacity: '0.6',
  };

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
      await axios.post(`${url}/direct_comments`, comment);
      setTimeout(() => setNotAllowed(false), 800);
      setAddedNewComment((prev) => prev + 1);
      setDirectCommentCapture('');
      if (window.screen.width >= 600) {
        if (document.querySelectorAll('.full-comment').length > 2) {
          const fullComment = document.querySelectorAll('.full-comment');
          fullComment[fullComment.length - 1].scrollIntoView();
        } else {
          document.querySelector('.comments-container').scrollIntoView();
        }
      }
    }
  };
  return (
    <div className="post-fixed-container">
      <button className="go-back-button" type="button" onClick={() => setRoomStatus(null)}>➜</button>
      <h2>
        {post.text}
      </h2>
      <div className="direct-cmnt-container">
        <textarea
          className={badComment ? 'wrong-comment-txt' : null}
          type="text"
          value={directCommentCapture}
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
      <p className="room-pwd">
        <strong>Room Password : </strong>
        {post.password}
      </p>
    </div>
  );
}
