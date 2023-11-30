'use client';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/images/marker-icon.png';
import { DivIcon, Icon, LatLngBounds} from 'leaflet';
// import { DivIcon, Icon, LatLngBounds, Map as LeafletMap} from 'leaflet';
import { connectToLocationService } from '@/api/grpc';
import { useEffect, useState } from 'react';
import Building from './Building/Building';
import { BUILDING } from './Building/Building';
import { flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';
import './InteractiveMap.css';

export default function InteractiveMap() {
    // const [map, setMap] = useState<LeafletMap|null>(null);
    const [personLocations, setPersonLocations] = useState<Array<any>>([]);
    // const [buildingHTMLs, setBuildingHTMLs] = useState<Map<string, string>>(new Map());

    useEffect(() => {
        connectToLocationService((personLocations) => {
            setPersonLocations(personLocations);
        });
    }, []);

    return (
        <>
            <MapContainer 
                
                maxBounds={new LatLngBounds([43.777106, -79.195519], [43.792295, -79.180157])}
                maxBoundsViscosity={1.0}
                style={{ height: 'calc(100vh - 56px)', zIndex: '0!important' }} 
                center={[43.78393739345549, -79.18573731545196]} 
                zoom={18}
                minZoom={18}
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
                        const {latitude, longitude} = personLocation.location;
                        return (
                            <Marker key={index} position={[latitude, longitude]}>
                                <Popup>
                                    Person: <br /> {personLocation.personId}
                                </Popup>
                            </Marker>
                        );
                    })
                }
                {
                    Object.entries(BUILDING).map(([key, building], index) => {
                        // const image = `building/${key.toLowerCase()}.jpg`
                        const {latitude, longitude} = building.location;
                        const image = `building/${key.toLowerCase()}.jpg`
                        // const html = renderToString(<Building buildingKey={key} buildingValue={value} />);
                        // if (!buildingHTMLs.has(key)) {
                        //     setTimeout(() => {
                        //         const buildingDiv = document.createElement('div');
                        //         const root = createRoot(buildingDiv);
                        //         flushSync(() => {
                        //           root.render(<Building buildingName={key}></Building>);
                        //         });
                        //         setBuildingHTMLs(buildingHTMLs.set(key, buildingDiv.innerHTML));
                        //     }, 1);
                        // }
                        return (
                            <>
                                <Marker 
                                    key={key} 
                                    position={[latitude, longitude]} 
                                    icon={
                                        new DivIcon({
                                            className: 'building-marker',
                                            html: `
                                                <div class="building">
                                                    <h1>${building.name}</h1>
                                                    <img src=${image} />
                                                </div>
                                            `,
                                            // html: buildingHTMLs.get(key),
                                            iconSize: [150, 150],
                                            iconAnchor: [75, 75],
                                        })}
                                        // new Icon({
                                        //     iconUrl: `${image}`,
                                        //     iconSize: [80 * 2, 53 * 2],
                                        //     iconAnchor: [80 * 1, 53 * 1],
                                        // })}
                                    >
                                    <Popup>
                                        Person:
                                    </Popup>
                                </Marker>
                            </>
                        );
                    })
                }
            </MapContainer>
        </>
    );
}
