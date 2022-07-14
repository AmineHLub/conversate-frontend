import { useState } from 'react';
import './App.css';
import SplashScreen from './Components/SplashScreen';
import PostScreen from './Components/PostScreen';

function App() {
  const [userCreation, setUserCreation] = useState(null);
  const [roomStatus, setRoomStatus] = useState(null);
  return (
    <div className="App">
      {
        !roomStatus ? (
          <SplashScreen
            userCreation={userCreation}
            setUserCreation={setUserCreation}
            setRoomStatus={setRoomStatus}
          />
        ) : (
          <PostScreen
            roomStatus={roomStatus}
            userCreation={userCreation}
            setRoomStatus={setRoomStatus}
          />
        )
      }
    </div>
  );
}

export default App;
