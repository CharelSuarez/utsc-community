import { DivIcon } from "leaflet";
import { memo } from "react"
import { Marker, Popup } from "react-leaflet";

interface MemoizedMarkerProps {
    personLocation: {
        personId: string;
        location: {
            latitude: number;
            longitude: number;
        };
    };
}

const MemoizedMarker = memo(function MemoizedMarker({ personLocation } : MemoizedMarkerProps) {
    const {latitude, longitude} = personLocation.location;
    return (
        <Marker 
            key={personLocation.personId} 
            position={[latitude, longitude]}
            icon={
                new DivIcon({
                    className: 'user-marker',
                    // <img src="marker-icon.png" />
                    html: `
                        <img class='user-image' src="monkey.jpg" />
                    `,
                    // iconSize: [25, 41],
                    // iconAnchor: [25/2, 41],
                    iconSize: [40, 40],
                    iconAnchor: [40/2, 40/2],
                })
            }>
            <Popup>
                Person: {personLocation.personId} <br/>
                Coords: {`${latitude}, ${longitude}`}
            </Popup>
        </Marker>
    );
});

export default MemoizedMarker;