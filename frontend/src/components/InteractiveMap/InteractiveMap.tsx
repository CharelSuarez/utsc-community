'use client';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/images/marker-icon.png';
import { DivIcon, Icon, LatLngBounds} from 'leaflet';
import { connectToLocationService, disconnectFromLocationService } from '@/api/location';
import { useEffect, useState, useRef } from 'react';
import './InteractiveMap.css';
import MemoizedMarker from './MemoizedMarker/MemoizedMarker';
import MemoizedBuildingMarker from './MemoizedBuildingMarker/MemoizedBuildingMarker';
import { BUILDINGS } from '@/util/building/Building';

function getShowBuildings() {
    if (typeof window === 'undefined') {
        return true;
    }
    return !(localStorage.getItem('showBuildings') === 'false');
}

export default function InteractiveMap() {
    const [personLocations, setPersonLocations] = useState<Array<any>>([]);
    const [showBuildings, setShowBuildings] = useState(getShowBuildings());
    const showBuildingsButton = useRef<any>(null);

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

    useEffect(() => {
        localStorage.setItem('showBuildings', showBuildings.toString());
        if (!showBuildingsButton.current) {
            return;
        }
        if (!showBuildings) {
            showBuildingsButton.current.classList.add('red');
        } else {
            showBuildingsButton.current.classList.remove('red');
        }
    }, [showBuildings]);

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
                { showBuildings &&
                    Object.entries(BUILDINGS).map(([key, building], index) => {
                        return (
                            <MemoizedBuildingMarker key={key} buildingKey={key} building={building}/>
                        );
                    })
                }
                {
                    <Marker 
                    position={[0, 0]} 
                    icon={
                        new DivIcon({
                            className: 'toggle-menu',
                            html: `
                                <div>
                                    Toggle Menu
                                </div>
                                <div class="building">
                                    Test Test Test
                                </div>
                            `,
                            iconSize: [0, 0],
                            iconAnchor: [0, 0],
                        })}
                    >
                    </Marker>
                }
            </MapContainer>
            <div className='toggle-menu'>
                <div className='toggle-buildings'>
                    <h2 className='toggle-title'>{showBuildings ? "Hide" : "Show"} Buildings</h2>
                    <button className='toggle-button button active' ref={showBuildingsButton}>
                        <img className='toggle-icon' src='icons/building.png' alt='toggle buildings' onClick={() => setShowBuildings(!showBuildings)}/>
                    </button>
                </div>
            </div>
        </>
    );
}
