/* eslint-disable react/prop-types */
import React from 'react';

export default function LoadingSplash({ header }) {
  return (
    <div className="popup-content dflex popup-onloading">
      <h2>{header}</h2>
    </div>
  );
}
