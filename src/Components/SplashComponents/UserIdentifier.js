/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import axios from 'axios';
import LoadingSplash from './LoadingSplash';
import url from '../url';

export default function UserIdentifier({ setUserCreation }) {
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
          setUserCreation(response.data);
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
          <h2>Nicknames are fine, titles are discouraged</h2>
          <input placeholder="username..." onChange={(e) => setInputCapture(e.target.value)} />
          <button className="splash-btn" type="button" onClick={() => createUsername()}>Create</button>
        </div>
      ) : <LoadingSplash header={header} />
    }
    </div>
  );
}
