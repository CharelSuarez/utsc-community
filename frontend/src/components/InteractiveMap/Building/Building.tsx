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
    HUMANITIES_WING: {name: "Humanities Wing", location: {latitude: 43.78315068397239, longitude: -79.18703884105001}},
    HIGHLAND_HALL: {name: "Highland Hall", location: {latitude: 43.78472223363929, longitude: -79.18598860752395}},
}

interface BuildingProps {
    buildingName: string;
}

export default function Building({buildingName} : BuildingProps) {
    const building = BUILDING[buildingName];
    const image = `building/${buildingName.toLowerCase()}.jpg`
    return (
        <>
            <div>
                {/* <h1>{building.name}</h1>; */}
                <img src={image} />
            </div>
        </>
    );
}
