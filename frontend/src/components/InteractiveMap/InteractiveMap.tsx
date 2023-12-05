'use client';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/images/marker-icon.png';
import { DivIcon, LatLngBounds, Map as LeafletMap} from 'leaflet';
import { connectToLocationService, disconnectFromLocationService } from '@/api/location';
import { useEffect, useState, useRef } from 'react';
import './InteractiveMap.css';
import MemoizedMarker from './MemoizedMarker/MemoizedMarker';
import MemoizedBuildingMarker from './MemoizedBuildingMarker/MemoizedBuildingMarker';
import { BUILDINGS } from '@/util/building/Building';
import { getNumberOfLocations } from '@/api/event';

export interface MapProps {
    width: number;
    currentEvent?: any;
    setCurrentEvent?: (event: any) => void;
}

function getShowBuildings() {
    if (typeof window === 'undefined') {
        return true;
    }
    return !(localStorage.getItem('showBuildings') === 'false');
}

let eventCounts: any | null = null;

export default function InteractiveMap({ width, currentEvent, setCurrentEvent } : MapProps) {
    const [personLocations, setPersonLocations] = useState<Array<any>>([]);
    const [showBuildings, setShowBuildings] = useState(getShowBuildings());
    const [map, setMap] = useState<LeafletMap|null>(null);
    const showBuildingsButton = useRef<any>(null);

    useEffect(() => {
        getNumberOfLocations().then((counts) => {
            eventCounts = counts.numberOfEvents;
        });

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

    useEffect(() => {
        if (currentEvent) {
            const building = BUILDINGS[currentEvent.location];
            map?.flyTo([building.location.latitude, building.location.longitude], 18); // 18 = max zoom level
        }
    }, [currentEvent, map]);

    return (
        <>
            <MapContainer
                style={{fontFamily: 'inherit', width: `calc(100% - ${width}px)`}}
                maxBounds={new LatLngBounds([43.775725424841006, -79.20103326023897], [43.793890945552064, -79.17378951960264])}
                maxBoundsViscosity={1.0}
                className='map_container'
                center={[43.78393739345549, -79.18573731545196]} 
                zoom={18}
                minZoom={17}
                zoomControl={false}
                scrollWheelZoom={true}
                ref={setMap}
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
                        if (currentEvent && currentEvent.location !== key) {
                            return null;
                        }
                        return (
                            <MemoizedBuildingMarker key={key} buildingKey={key} building={building} eventCounts={eventCounts}/>
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
            { !setCurrentEvent &&
                <div className='toggle-menu'>
                    <div className='toggle-buildings'>
                        <h2 className='toggle-title'>{showBuildings ? "Hide" : "Show"} Buildings</h2>
                        <button className='toggle-button button active' ref={showBuildingsButton} onClick={() => setShowBuildings(!showBuildings)}>
                            <img className='toggle-icon' src='icons/building.png' alt='toggle buildings'/>
                        </button>
                    </div>
                </div>
            }
        </>
    );
}
