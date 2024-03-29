/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import axios from 'axios';
import url from '../url';
import '../../Stylesheets/comments-section.css';
import arrowbtn from '../../Assets/button-arrow.png';

export default function Comments({
  post, user, setAddedNewComment, addedNewComment,
}) {
  const [directCommentCapture, setDirectCommentCapture] = useState('');
  const [showNestedComments, setShowNestedComments] = useState(null);
  const [badComment, setBadComment] = useState(null);
  const [data, setData] = useState(null);
  const [notAllowed, setNotAllowed] = useState(false);

  const notAllowedStyle = {
    cursor: 'not-allowed',
    opacity: '0.6',
  };

  const loadData = async () => {
    try {
      const response = await axios.post(`${url}/reciption`, { password: post.password });
      setData(response.data);
    } catch {
      console.log('error');
    }
    setTimeout(() => loadData(), 5000);
  };

  useEffect(() => {
    loadData();
  }, [addedNewComment, showNestedComments, document.visibilityState, directCommentCapture]);

  const handleNestedComment = (commentId) => {
    if (commentId === showNestedComments) {
      setShowNestedComments(null);
    } else { setShowNestedComments(commentId); }
  };

  const handleSubmittingNestedComment = async (commentId, e) => {
    if (!directCommentCapture) {
      setBadComment(commentId);
      setTimeout(() => setBadComment(false), 800);
    } else {
      setNotAllowed(commentId);
      const comment = {
        user_id: user.id,
        direct_comment_id: commentId,
        text: directCommentCapture,
      };
      await axios.post(`${url}/nested_comments`, comment);
      setTimeout(() => setNotAllowed(false), 800);
      setShowNestedComments(commentId);
      setAddedNewComment((prev) => prev + 1);
      setDirectCommentCapture('');
      e.target.previousSibling.value = '';
    }
  };

  return (
    <div className="comments-container">
      {data?.comments?.length > 0 ? (
        <>
          {
              data?.comments?.map((comment) => (
                <div key={comment.direct_comment.id} className="full-comment">
                  {
                    comment.nested_comments.length > 0 ? (
                      <div className="show-nested-comments" aria-hidden onClick={() => handleNestedComment(comment.direct_comment.id)}>
                        <img style={comment.direct_comment.id === showNestedComments ? { transform: 'rotate(180deg)', transition: 'transform 0.3s ease-in-out' } : { transition: 'transform 0.3s ease-in-out' }} src={arrowbtn} alt="arrowbtn" />
                      </div>
                    ) : null
                  }
                  <div className="comment-container dflex">
                    <div className="user-info dflex">
                      <img className="user-img" src={JSON.parse(comment.direct_comment.username).img} alt="user" />
                    </div>
                    <div className="comment-msg-container">
                      <p>
                        <strong>
                          {JSON.parse(comment.direct_comment.username).name}
                          :
                          {' '}
                        </strong>
                        {comment.direct_comment.text}
                      </p>
                    </div>
                  </div>
                  {
                comment.direct_comment.id === showNestedComments
                 && comment.nested_comments?.map((nestedComment) => (
                   <div key={nestedComment.id} className="nested-comment-container">
                     <div className="nested-comment-container dflex">
                       <div className="nested-user-info dflex">
                         <img className="nested-user-img" src={JSON.parse(nestedComment.username).img} alt="user" />
                       </div>
                       <div className="nested-comment-msg-container">
                         <p>
                           <strong>
                             {JSON.parse(nestedComment.username).name}
                             :
                             {' '}
                           </strong>
                           {nestedComment.text}
                         </p>
                       </div>
                     </div>
                   </div>
                 ))
      }
                  <div className="add-comment-container">
                    <textarea
                      type="text"
                      className={badComment === comment.direct_comment.id ? 'wrong-comment-txt' : null}
                      placeholder="Type a comment..."
                      onChange={(e) => setDirectCommentCapture(e.target.value)}
                    />
                    <button
                      style={notAllowed === comment.direct_comment.id ? notAllowedStyle : null}
                      type="submit"
                      className="splash-btn dirct-cmnt"
                      onClick={(e) => handleSubmittingNestedComment(comment.direct_comment.id, e)}
                    >
                      Send
                    </button>
                  </div>
                </div>
              ))
            }
        </>
      ) : (
        <div className="no-comments-alert">
          <h2 style={{ color: 'white' }}>
            No comments yet.
          </h2>
        </div>
      )}
    </div>
  );
}
