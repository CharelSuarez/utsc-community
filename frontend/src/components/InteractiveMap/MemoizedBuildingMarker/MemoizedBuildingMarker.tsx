import { DivIcon } from "leaflet";
import { memo } from "react"
import { Marker, Popup } from "react-leaflet";
import { Building } from '@/util/building/Building';
import "./MemoizedBuildingMarker.css";

interface MemoizedMarkerProps {
    buildingKey: string;
    building: Building;
    eventCounts:
     any;
}

function test() {
    console.log("test");
}

const MemoizedBuildingMarker = memo(function MemoizedMarker({ buildingKey, building, eventCounts} : MemoizedMarkerProps) {
    const image = `building/${buildingKey.toLowerCase()}.jpg`
    const {latitude, longitude} = building.location;
    const eventCount = eventCounts && eventCounts.hasOwnProperty(buildingKey) ? eventCounts[buildingKey] : 0;
    return (
        <Marker 
            position={[latitude, longitude]} 
            icon={
                new DivIcon({
                    className: 'building-marker',
                    html: `
                        <div class="building">
                            <div class="building-header">
                                <h2 class="building-code">${building.code}</h2>
                                <h1 class="building-name" style="font-size: ${building.name.length > 13 ? "0.8rem" : "1rem"};">${building.name}</h1>
                            </div>
                            <img class="building-image" src=${image} />
                            <div class="building-info" style="font-size: 15px;">
                                <button class="building-events button active" style="opacity: ${eventCount == 0 ? 0.5 : 1.0}">
                                    <img class="building-events-icon" src="icons/event.png" />
                                    <p>${eventCount} upcoming event${eventCount == 1 ? "" : "s"}</p>
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