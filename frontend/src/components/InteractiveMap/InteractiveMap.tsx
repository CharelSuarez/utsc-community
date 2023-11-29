'use client';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/images/marker-icon.png';
import { LatLngBounds } from 'leaflet';
import { connectToServer } from '@/api/grpc';

export default function InteractiveMap() {
    connectToServer();    

    return (
        <>
            <MapContainer 
                // bounds={new LatLngBounds([43.78208729192545, -79.19270133903615], [43.789134855988635, -79.18283161381771])}
                // boundsOptions={{padding: [0, 0]}}
                style={{ height: 'calc(100vh - 56px)', zIndex: '0!important' }} 
                center={[43.78393739345549, -79.18573731545196]} 
                zoom={20} 
                scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[51.505, -0.09]}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </>
    );
}
