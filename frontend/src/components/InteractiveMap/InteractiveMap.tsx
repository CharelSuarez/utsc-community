'use client';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/images/marker-icon.png';
import { DivIcon, Icon, LatLngBounds} from 'leaflet';
import { connectToLocationService, disconnectFromLocationService } from '@/api/location';
import { useEffect, useState } from 'react';
import './InteractiveMap.css';
import MemoizedMarker from './MemoizedMarker/MemoizedMarker';
import MemoizedBuildingMarker from './MemoizedBuildingMarker/MemoizedBuildingMarker';

export interface Building {
    name: string;
    location: {
        latitude: number;
        longitude: number;
    };
}

const BUILDING : {[buildingName: string] : Building} = {
    SCIENCE_WING: {name: "Science Wing", location: {latitude: 43.783412263866765, longitude: -79.18798282511081}},
    HUMANITIES_WING: {name: "Humanities Wing", location: {latitude: 43.78315068397239, longitude: -79.18703884105001}},
    HIGHLAND_HALL: {name: "Highland Hall", location: {latitude: 43.78472223363929, longitude: -79.18598860752395}},
}

export default function InteractiveMap() {
    const [personLocations, setPersonLocations] = useState<Array<any>>([]);

    useEffect(() => {
        connectToLocationService((personLocations) => {
            // Prevent elements being re-rendered unnecessarily
            setPersonLocations((prevPersonLocations) => {
                const newPersonLocations = [...prevPersonLocations];
                personLocations.forEach((personLocation) => {
                    const index = newPersonLocations.findIndex((newPersonLocation) => {
                        return newPersonLocation.personId === personLocation.personId;
                    });
                    if (index === -1) {
                        newPersonLocations.push(personLocation);
                    } else {
                        if (newPersonLocations[index].location.latitude !== personLocation.location.latitude ||
                            newPersonLocations[index].location.longitude !== personLocation.location.longitude) {
                            newPersonLocations[index] = personLocation;
                        }
                    }
                });
                return newPersonLocations;
            });
        });

        return () => {
            disconnectFromLocationService();
        };
    }, []);

    return (
        <>
            <MapContainer
                style={{fontFamily: 'inherit'}}
                maxBounds={new LatLngBounds([43.77726466009645, -79.19554571880464], [43.792133217870415, -79.17708660072934])}
                maxBoundsViscosity={1.0}
                className='map_container'
                center={[43.78393739345549, -79.18573731545196]} 
                zoom={18}
                minZoom={1}
                zoomControl={false}
                scrollWheelZoom={true}
                >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    personLocations.map((personLocation, index) => {
                        return (
                            <MemoizedMarker key={personLocation.personId} personLocation={personLocation}/>
                        );
                    })
                }
                {
                    Object.entries(BUILDING).map(([key, building], index) => {
                        return (
                            <MemoizedBuildingMarker key={key} buildingKey={key} building={building}/>
                        );
                    })
                }
            </MapContainer>
        </>
    );
}
