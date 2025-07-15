'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';

interface MapWrapperProps {
  className?: string;
}

export default function MapWrapper({ className }: MapWrapperProps) {
  const petLocation: [number, number] = [-3.68274, -40.3512];
  const [raioKm, setRaioKm] = useState(1); // valor padrão de 1km

  useEffect(() => {
    L.Icon.Default.mergeOptions({
      iconUrl: '/assets/icons/marker-icon.png',
      iconRetinaUrl: '/assets/icons/marker-icon-2x.png',
      shadowUrl: '/assets/icons//marker-shadow.png',
    });
  }, []);

  return (
    <div className="space-y-4">
      {/* Campo para digitar o raio */}
      <div className="flex items-center gap-2">
        <label htmlFor="raio" className="font-medium text-sm text-green-600">Raio em km:</label>
        <input
          id="raio"
          type="number"
          value={raioKm}
          onChange={(e) => setRaioKm(Number(e.target.value))}
          className="border px-2 py-1 rounded w-20 text-gray-400"
          min={0}
        />
      </div>

      {/* Mapa */}
      <MapContainer
        center={petLocation}
        zoom={13}
        scrollWheelZoom={true}
        className={className}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={petLocation}>
          <Popup>Seu pet está aqui! (Localização genérica)</Popup>
        </Marker>

        {/* Círculo com raio em metros */}
        <Circle
          center={petLocation}
          radius={raioKm * 1000} // converte km para metros
          pathOptions={{ color: 'blue', fillOpacity: 0.2 }}
        />
      </MapContainer>
    </div>
  );
}
