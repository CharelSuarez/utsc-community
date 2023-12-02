'use client';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/images/marker-icon.png';
import { DivIcon, Icon, LatLngBounds} from 'leaflet';
// import { DivIcon, Icon, LatLngBounds, Map as LeafletMap} from 'leaflet';
import { connectToLocationService } from '@/api/location';
import { useEffect, useState } from 'react';
// import Building from './Building/Building';
// import { BUILDING } from './Building/Building';
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
    // const [map, setMap] = useState<LeafletMap|null>(null);
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
    }, []);

    return (
        <>
            <MapContainer
                style={{fontFamily: 'inherit'}}
                maxBounds={new LatLngBounds([43.777106, -79.195519], [43.792295, -79.180157])}
                maxBoundsViscosity={1.0}
                className='map_container'
                center={[43.78393739345549, -79.18573731545196]} 
                zoom={18}
                // minZoom={18}
                zoomControl={false}
                scrollWheelZoom={true}
                // ref={setMap}
                >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    personLocations.map((personLocation, index) => {
                        // const {latitude, longitude} = personLocation.location;
                        return (
                            // <Marker 
                            //     key={personLocation.personId} 
                            //     position={[latitude, longitude]}
                            //     icon={
                            //         new DivIcon({
                            //             className: 'user-marker',
                            //             // <img src="marker-icon.png" />
                            //             html: `
                            //                 <img class='user-image' src="monkey.jpg" />
                            //             `,
                            //             // iconSize: [25, 41],
                            //             // iconAnchor: [25/2, 41],
                            //             iconSize: [40, 40],
                            //             iconAnchor: [40/2, 40/2],
                            //         })
                            //     }>
                            //     <Popup>
                            //         Person: {personLocation.personId} <br/>
                            //         Coords: {`${latitude}, ${longitude}`}
                            //     </Popup>
                            // </Marker>
                            <MemoizedMarker key={personLocation.personId} personLocation={personLocation}/>
                        );
                    })
                }
                {
                    Object.entries(BUILDING).map(([key, building], index) => {
                        // const {latitude, longitude} = building.location;
                        // const image = `building/${key.toLowerCase()}.jpg`
                        return (
                            // <Marker 
                            //     key={key} 
                            //     position={[latitude, longitude]} 
                            //     icon={
                            //         new DivIcon({
                            //             className: 'building-marker',
                            //             html: `
                            //                 <div class="building">
                            //                     <h1>${building.name}</h1>
                            //                     <img src=${image} />
                            //                 </div>
                            //             `,
                            //             iconSize: [150, 150],
                            //             iconAnchor: [75, 75],
                            //         })}
                            //     >
                            // </Marker>
                            <MemoizedBuildingMarker key={key} buildingKey={key} building={building}/>
                        );
                    })
                }
            </MapContainer>
        </>
    );
}
