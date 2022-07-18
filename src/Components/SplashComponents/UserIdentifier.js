/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import axios from 'axios';
import LoadingSplash from './LoadingSplash';
import url from '../url';
import Mojis from './Mojis';
// import Mojis from './Mojis';

export default function UserIdentifier({ setUserCreation }) {
  const [Loading, setLoading] = useState(false);
  const [inputCapture, setInputCapture] = useState('');
  const [header, setHeader] = useState('Creating your account');
  const [mojiPopup, setMojiPopupt] = useState(false);
  const [usrSelectedImg, setUsrSelectedImg] = useState('https://i.postimg.cc/g2tLSzNd/userImg.png');
  const createUsername = () => {
    if (inputCapture.length > 0) {
      setLoading(true);
      setTimeout(async () => {
        try {
          const response = await axios.post(`${url}/users`, {
            name: inputCapture,
            img: usrSelectedImg,
          });
          setUserCreation(response.data);
          localStorage.setItem('user', JSON.stringify(response.data));
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
    <div className="identifier-popup" aria-hidden onClick={() => setMojiPopupt(false)}>
      {
      !Loading ? (
        <div className="popup-content dflex">
          <h2>Nicknames are fine, titles are discouraged</h2>
          <div className="input-img dflex">
            <img src={usrSelectedImg} alt="user" aria-hidden onClick={() => setTimeout(() => setMojiPopupt((prev) => !prev), 20)} />
            <input
              placeholder="username..."
              onChange={(e) => setInputCapture(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && createUsername()}
            />
            {mojiPopup && (
              <div className="moji-popup">
                { Mojis.map((moji, index) => (
                  <div className="moji-container" key={index} aria-hidden onClick={() => { setUsrSelectedImg(moji); setMojiPopupt(false); }}>
                    <img src={moji} alt="moji" />
                  </div>
                ))}
              </div>
            )}
          </div>
          <button className="splash-btn" type="button" onClick={() => createUsername()}>Create</button>
        </div>
      ) : <LoadingSplash header={header} />
    }
    </div>
  );
}
