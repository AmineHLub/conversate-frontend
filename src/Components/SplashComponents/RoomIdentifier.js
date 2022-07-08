/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import axios from 'axios';
import LoadingSplash from './LoadingSplash';
import url from '../url';

export default function RoomIdentifier({ setRoomStatus, userCreation }) {
  const [Loading, setLoading] = useState(false);
  const [postPopup, setPostPopup] = useState(false);
  const [inputCapture, setInputCapture] = useState('');
  const [postCapture, setPostCapture] = useState('');
  const [header, setHeader] = useState('');

  const handleRoomSubmission = (type) => {
    if (type === 'create') {
      setLoading(true);
      if (postCapture) {
        setHeader('Creating your room & posting');
        setPostPopup(false);
        setTimeout(async () => {
          try {
            const response = await axios.post(`${url}/conversations`, {
              text: postCapture,
              user_id: userCreation.id,
            });
            setRoomStatus(response.data);
          } catch {
            setLoading(false);
            document.querySelector('.popup-content > h2').innerText = 'Room was not created';
          }
        },
        500);
      }
    } else if (inputCapture.length > 0) {
      setLoading(true);
      setHeader('Joining your room');
      setTimeout(async () => {
        try {
          const response = await axios.post(`${url}/reciption`, {
            password: inputCapture,
          });
          setRoomStatus(response.data);
          setLoading(false);
        } catch {
          setLoading(false);
          document.querySelector('.popup-content > h2').innerText = 'No room was found with that password';
        }
      },
      500);
    } else {
      document.querySelector('.popup-content > h2').innerText = 'Please enter a valid room password';
      document.querySelector('.popup-content > h2').classList.add('error-text-input');
    }
  };

  return (
    <>
      <div className="identifier-popup">
        {
      !Loading ? (
        <div className="popup-content dflex">
          <h2>Create or Join a room</h2>
          <div className="selection-section dflex">
            <div className="room-identifier-join-container dflex">
              <input placeholder="password" onChange={(e) => setInputCapture(e.target.value)} />
              <button className="splash-btn" type="button" onClick={() => handleRoomSubmission('join')}>Join</button>
            </div>
            <div className="selection-seperator-seperator" />
            <div className="room-identifier-create-container">
              <button className="splash-btn" type="button" onClick={() => setPostPopup(true)}>Create</button>
            </div>
          </div>
        </div>
      ) : <LoadingSplash header={header} />
    }
      </div>
      {
        postPopup ? (
          <div className="post-popup">
            <div className="popup-content postpopup-container dflex">
              <h2>Post</h2>
              <textarea value={postCapture} onChange={(e) => setPostCapture(e.target.value)} />
              <button
                className={postCapture ? 'splash-btn submit-post' : 'splash-btn submit-post inactive'}
                type="button"
                onClick={() => handleRoomSubmission('create')}
              >
                Post
              </button>
            </div>
          </div>
        ) : null
      }

    </>
  );
}
