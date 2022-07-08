import '../Stylesheets/splash-screen-room.css';
import RoomIdentifier from './SplashComponents/RoomIdentifier';
import UserIdentifier from './SplashComponents/UserIdentifier';

// eslint-disable-next-line react/prop-types
export default function SplashScreen({ userCreation, setUserCreation, setRoomStatus }) {
  return (
    <main className="splash-screen-main">
      {
        userCreation ? <RoomIdentifier setRoomStatus={setRoomStatus} userCreation={userCreation} />
          : <UserIdentifier setUserCreation={setUserCreation} />
      }
    </main>
  );
}
