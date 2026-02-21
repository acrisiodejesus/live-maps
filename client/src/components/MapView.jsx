import { useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const CURRENT_USER_ICON = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const OTHER_USER_ICON = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function FlyToUser({ position }) {
  const map = useMap();
  const hasFlewRef = useRef(false);

  if (position && !hasFlewRef.current) {
    map.flyTo(position, 15, { duration: 1.5 });
    hasFlewRef.current = true;
  }

  return null;
}

export default function MapView({ users, currentSocketId }) {
  const entries = Object.entries(users);
  const currentUser = users[currentSocketId];

  const userPosition = currentUser
    ? [currentUser.lat, currentUser.lng]
    : null;

  return (
    <MapContainer center={[-8.8383, 13.2344]} zoom={13} className="map-container">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FlyToUser position={userPosition} />
      {entries.map(([id, { lat, lng }]) => {
        const isCurrentUser = id === currentSocketId;
        return (
          <Marker
            key={id}
            position={[lat, lng]}
            icon={isCurrentUser ? CURRENT_USER_ICON : OTHER_USER_ICON}
          >
            <Popup>
              <div className="marker-popup">
                <strong>{isCurrentUser ? "Tu" : `Usuário ${id.slice(0, 6)}`}</strong>
                <span>Lat: {lat.toFixed(6)}</span>
                <span>Lng: {lng.toFixed(6)}</span>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
