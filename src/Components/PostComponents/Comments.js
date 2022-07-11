/* eslint-disable react/prop-types */
import { useState } from 'react';
import '../../Stylesheets/comments-section.css';
import arrowbtn from '../../Assets/button-arrow.png';

export default function Comments({ post, user }) {
  const [directCommentCapture, setDirectCommentCapture] = useState('');
  const [showNestedComments, setShowNestedComments] = useState(false);
  const [btnRotation, setBtnRotation] = useState(false);

  console.log(post, user, btnRotation);
  return (
    <div className="comments-container">
      <div className="full-comment">
        <div className="show-nested-comments" aria-hidden onClick={() => { setShowNestedComments(!showNestedComments); setBtnRotation(!btnRotation); }}>
          <img style={btnRotation ? { transform: 'rotate(180deg)', transition: 'transform 0.3s ease-in-out' } : { transition: 'transform 0.3s ease-in-out' }} src={arrowbtn} alt="arrowbtn" />
        </div>
        <div className="comment-container dflex">
          <div className="user-info dflex">
            <img className="user-img" src="https://i.imgur.com/Xj0Z9qg.png" alt="user" />
          </div>
          <div className="comment-msg-container">
            <p>
              <strong>Anon46541: </strong>
              There are many variations of passages of Lorem Ipsum available, but the
              majority have suffered alteration in some form, by injected humour, or
              randomised words which don&apos;t look even slightly believable. If you are
              going to use a passage of Lorem Ipsum, you
            </p>
          </div>
        </div>
        {
          showNestedComments ? (
            <>
              <div className="nested-comment-container">
                <div className="nested-comment-container dflex">
                  <div className="nested-user-info dflex">
                    <img className="nested-user-img" src="https://i.imgur.com/Xj0Z9qg.png" alt="user" />
                  </div>
                  <div className="nested-comment-msg-container">
                    <p>
                      <strong>Anon46541: </strong>
                      There are many variations of passages of Lorem Ipsum available, but the
                      majority have suffered alteration in some form, by injected humour, or
                      randomised words which don&apos;t look even slightly believable. If you are
                      going to use a passage of Lorem Ipsum, you
                    </p>
                  </div>
                </div>
              </div>
              <div className="nested-comment-container">
                <div className="nested-comment-container dflex">
                  <div className="nested-user-info dflex">
                    <img className="nested-user-img" src="https://i.imgur.com/Xj0Z9qg.png" alt="user" />
                  </div>
                  <div className="nested-comment-msg-container">
                    <p>
                      <strong>Anon46541: </strong>
                      There are many variations of passages of Lorem Ipsum available, but the
                      majority have suffered alteration in some form, by injected humour, or
                      randomised words which don&apos;t look even slightly believable. If you are
                      going to use a passage of Lorem Ipsum, you
                    </p>
                  </div>
                </div>
              </div>
              <div className="nested-comment-container">
                <div className="nested-comment-container dflex">
                  <div className="nested-user-info dflex">
                    <img className="nested-user-img" src="https://i.imgur.com/Xj0Z9qg.png" alt="user" />
                  </div>
                  <div className="nested-comment-msg-container">
                    <p>
                      <strong>Anon46541: </strong>
                      There are many variations of passages of Lorem Ipsum available, but the
                      majority have suffered alteration in some form, by injected humour, or
                      randomised words which don&apos;t look even slightly believable. If you are
                      going to use a passage of Lorem Ipsum, you
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : null
}
        <div className="add-comment-container">
          <textarea
            type="text"
            placeholder="Type a comment..."
            onChange={(e) => setDirectCommentCapture(e.target.value)}
          />
          <button
            type="submit"
            className={directCommentCapture ? 'splash-btn dirct-cmnt' : 'splash-btn dirct-cmnt inactive'}
            // onClick={() => handleSubmittingDirectComment()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
