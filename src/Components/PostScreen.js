/* eslint-disable react/prop-types */
import { useState } from 'react';
import Comments from './PostComponents/Comments';
import Post from './PostComponents/Post';
import '../Stylesheets/post-screen.css';

export default function PostScreen({ roomStatus, userCreation, setRoomStatus }) {
  const [addedNewComment, setAddedNewComment] = useState(0);
  return (
    <>
      <Post
        post={roomStatus}
        user={userCreation}
        setAddedNewComment={setAddedNewComment}
        setRoomStatus={setRoomStatus}
      />
      <Comments
        post={roomStatus}
        user={userCreation}
        setAddedNewComment={setAddedNewComment}
        addedNewComment={addedNewComment}
      />
    </>
  );
}
