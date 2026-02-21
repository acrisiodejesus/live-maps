import { useState, useEffect } from "react";
import socket from "./services/socket";
import useGeolocation from "./hooks/useGeolocation";
import MapView from "./components/MapView";
import UserCounter from "./components/UserCounter";
import ErrorBanner from "./components/ErrorBanner";

export default function App() {
  const [users, setUsers] = useState({});
  const [socketId, setSocketId] = useState(null);
  const { position, error: geoError } = useGeolocation();

  useEffect(() => {
    socket.on("connect", () => setSocketId(socket.id));
    socket.on("usersUpdate", (updatedUsers) => setUsers(updatedUsers));

    return () => {
      socket.off("connect");
      socket.off("usersUpdate");
    };
  }, []);

  useEffect(() => {
    if (position) {
      socket.emit("updateLocation", position);
    }
  }, [position]);

  const userCount = Object.keys(users).length;

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <div className="logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
            <h1>Live Maps</h1>
          </div>
          <UserCounter count={userCount} />
        </div>
      </header>

      <ErrorBanner message={geoError} />

      <main className="main">
        <MapView users={users} currentSocketId={socketId} />
      </main>
    </div>
  );
}
