'use client';

interface Building {
    name: string;
    location: {
        latitude: number;
        longitude: number;
    };
}

export const BUILDING : {[buildingName: string] : Building} = {
    SCIENCE_WING: {name: "Science Wing", location: {latitude: 43.783412263866765, longitude: -79.18798282511081}},
}

interface BuildingProps {
    buildingName: string;
}

export default function Building({buildingName} : BuildingProps) {
    const building = BUILDING[buildingName];
    const image = `building/${buildingName.toLowerCase()}.jpg`
    return (
        <>
            <div style={{zIndex: '5'}}>
                {/* <h1>{building.name}</h1>; */}
                <img src={image} />
            </div>
        </>
    );
}
