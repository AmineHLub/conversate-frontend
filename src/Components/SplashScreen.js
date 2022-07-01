import { useState } from 'react';
import '../Stylesheets/splash-screen-room.css';
import RoomIdentifier from './SplashComponents/RoomIdentifier';
import UserIdentifier from './SplashComponents/UserIdentifier';

export default function SplashScreen() {
  const [userCreation, setUserCreation] = useState(null);
  return (
    <main className="splash-screen-main">
      {
        userCreation ? <RoomIdentifier /> : <UserIdentifier setUserCreation={setUserCreation} />
      }
    </main>
  );
}
