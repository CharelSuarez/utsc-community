import { DivIcon } from "leaflet";
import { memo } from "react"
import { Marker, Popup } from "react-leaflet";
import { Building } from "../InteractiveMap";

interface MemoizedMarkerProps {
    buildingKey: string;
    building: Building;
}

const MemoizedBuildingMarker = memo(function MemoizedMarker({ buildingKey, building } : MemoizedMarkerProps) {
    const image = `building/${buildingKey.toLowerCase()}.jpg`
    const {latitude, longitude} = building.location;
    return (
        <Marker 
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
                    iconSize: [150, 150],
                    iconAnchor: [75, 75],
                })}
            >
    </Marker>
    );
});

export default MemoizedBuildingMarker;