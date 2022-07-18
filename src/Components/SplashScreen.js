import { useEffect } from 'react';
import '../Stylesheets/splash-screen-room.css';
import RoomIdentifier from './SplashComponents/RoomIdentifier';
import UserIdentifier from './SplashComponents/UserIdentifier';

// eslint-disable-next-line react/prop-types
export default function SplashScreen({ userCreation, setUserCreation, setRoomStatus }) {
  useEffect(() => {
    if (JSON.parse(localStorage.getItem('user'))) {
      const user = JSON.parse(localStorage.getItem('user'));
      setUserCreation(user);
    }
  }, []);

  return (
    <main className="splash-screen-main">
      {
        userCreation ? (
          <RoomIdentifier
            setRoomStatus={setRoomStatus}
            userCreation={userCreation}
            setUserCreation={setUserCreation}
          />
        )
          : <UserIdentifier setUserCreation={setUserCreation} />
      }
    </main>
  );
}
