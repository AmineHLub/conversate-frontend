/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import axios from 'axios';
import LoadingSplash from './LoadingSplash';
import url from '../url';

export default function RoomIdentifier() {
  const [Loading, setLoading] = useState(false);
  const [inputCapture, setInputCapture] = useState('');
  const [header, setHeader] = useState('Creating your account');

  const createUsername = () => {
    if (inputCapture.length > 0) {
      setLoading(true);
      setTimeout(async () => {
        try {
          const response = await axios.post(`${url}/users`, {
            name: inputCapture,
          });
          console.log(response);
        } catch {
          setHeader('Error creating user');
        }
        setInputCapture('');
      },
      500);
    } else {
      document.querySelector('.popup-content > h2').innerText = 'Please enter a username';
      document.querySelector('.popup-content > h2').classList.add('error-text-input');
    }
  };

  return (
    <div className="identifier-popup">
      {
      !Loading ? (
        <div className="popup-content dflex">
          <h2>Create or Join a room</h2>
          <div className="selection-section dflex">
            <div className="room-identifier-join-container dflex">
              <input placeholder="password" onChange={(e) => setInputCapture(e.target.value)} />
              <button className="splash-btn" type="button" onClick={() => createUsername()}>Join</button>
            </div>
            <div className="selection-seperator-seperator" />
            <div className="room-identifier-create-container">
              <button className="splash-btn" type="button" onClick={() => createUsername()}>Create</button>
            </div>
          </div>
        </div>
      ) : <LoadingSplash header={header} />
    }
    </div>
  );
}
