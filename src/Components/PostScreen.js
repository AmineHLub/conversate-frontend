/* eslint-disable react/prop-types */
import React from 'react';
import Comments from './PostComponents/Comments';
import Post from './PostComponents/Post';
import '../Stylesheets/post-screen.css';

export default function PostScreen({ roomStatus }) {
  console.log(roomStatus);
  return (
    <>
      <Post post={roomStatus.text} />
      <Comments />
    </>
  );
}
