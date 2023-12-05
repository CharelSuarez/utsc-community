import { Socket, io } from "socket.io-client";
import protobuf from "protobufjs";

let socket : Socket | null = null;

let Location : protobuf.Type | null = null;
let LocationResponse : protobuf.Type | null = null;

const GEO_INTERVAL = 50;

async function loadProto() {
    const root = await protobuf.load("/proto/location_service.proto");
    Location = root.lookupType("locationservice.Location");
    LocationResponse = root.lookupType("locationservice.LocationResponse");
}

export async function connectToLocationService(messageCallback : (locationResponse : Array<any>) => void) {
    if (Location == null || LocationResponse == null) {
        await loadProto();
    }
    if (Location == null || LocationResponse == null) {
        return;
    }

    socket = io('ws://utscampus.live:2082',{
        transports: ['websocket']
    });

    socket.on('message', (message) =>{
        if (Location == null || LocationResponse == null) {
            return;
        }

        // Decode message from Uint8Array
        const buffer = new Uint8Array(message);
        const locationResponse = LocationResponse.decode(buffer);
        // console.log(`Message from server:`);
        // console.log(locationResponse);
        messageCallback((locationResponse as any).personLocations);
    });

    setInterval(getSendLocation, GEO_INTERVAL);
}

export function disconnectFromLocationService() {
    if (socket == null) {
        return;
    }
    socket.disconnect();
}

async function getSendLocation() {
    if (!socket || !socket.connected){
        return;
    }

    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(({ coords }) => {
            const { latitude, longitude } = coords;
            sendLocation(latitude, longitude);
        }, null, { enableHighAccuracy: true });
    }
}

async function sendLocation(latitude : number, longitude : number) {
    if (socket == null || !socket.connected || Location == null || LocationResponse == null) {
        return;
    }

    // const data = {
    //     latitude: 43.78393739345549, 
    //     longitude: -79.18573731545196
    // };

    // Encode message to Uint8Array
    const data = {
        latitude, longitude
    };
    // console.log(`Sending message to server: ${data}`);
    const location = Location.create(data);
    const buffer = Location.encode(location).finish();
    socket.emit('message', buffer);
}

