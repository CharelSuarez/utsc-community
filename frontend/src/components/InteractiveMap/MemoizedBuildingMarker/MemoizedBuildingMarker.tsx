import { DivIcon } from "leaflet";
import { memo } from "react"
import { Marker, Popup } from "react-leaflet";
import { Building } from "../InteractiveMap";
import "./MemoizedBuildingMarker.css";

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
                            <div class="building-header">
                                <h2 class="building-code">SW</h2>
                                <h1 class="building-name" style="font-size: ${building.name.length > 13 ? "0.8rem" : "1rem"};">${building.name}</h1>
                            </div>
                            <img class="building-image" src=${image} />
                            <div class="building-info" style="font-size: 15px;">
                                <button class="building-events button active">
                                    <img class="building-events-icon" src="event.png" />
                                    <p>5 upcoming events</p>
                                </button>
                            </div>
                        </div>
                    `,
                    iconSize: [170, 170],
                    iconAnchor: [85, 85],
                })}
            >
    </Marker>
    );
});

export default MemoizedBuildingMarker;