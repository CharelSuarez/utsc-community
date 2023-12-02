import { createServer } from "http";
import { Server } from "socket.io";
import { sessionMiddleware } from "./app.mjs";
import cors from "cors";
import express from "express";
import protobuf from "protobufjs";

const PORT = 5002;
const app = express();

app.use(express.json());

app.use(cors({
    origin: "*",
}));

const server = createServer(app).listen(PORT, function (err) {
    if (err) console.log(err);
    else console.log("Socket on http://localhost:%s", PORT);
});

const io = new Server(server);
io.engine.use(sessionMiddleware);

let Location;
let LocationResponse;

async function loadProto() {
    const root = await protobuf.load("./proto/location_service.proto");
    Location = root.lookupType("locationservice.Location");
    LocationResponse = root.lookupType("locationservice.LocationResponse");
}

const locations = {};

io.on('connection', async (socket) => {
    if (!Location) {
        await loadProto();
    }

    const session = socket.request.session;
    const personId = session?.user?._id || session.sessionID;
    const username = session?.user?.username || 'Unknown';
    console.log(`User '${username}' connected!`);

    socket.on('message', (message) => {
        // TODO Do this in a separate task!
        // Clear old locations
        for (const key in locations) {
            const location = locations[key];
            if (location.lastUpdated != null && Date.now() - location.lastUpdated > 10000) {
                delete locations[key];
            }
        }

        // Decode message from Uint8Array
        let buffer = new Uint8Array(message);
        const location = Location.decode(buffer);
        // console.log(`Message from client '${username}'`);
        // console.log(location);

        // Add user's location to all locations
        locations[personId] = { 
            personId,
            username,
            location,
            lastUpdated: Date.now()
        } 


        // TODO Remove this!
        for (let i = Object.values(locations).length; i < 50; i++) {
            const random = `${Math.floor(Math.random() * 20000)}`;
            locations[random] = {
                personId: random,
                username: `Random User #${random}`,
                location: {
                    latitude: 43.777106 + Math.random() * (43.792295 - 43.777106),
                    longitude: -79.180157 + Math.random() * (-79.195519 - -79.180157),
                },
                lastUpdated: null
            }
        }

        const locationResponse = LocationResponse.create({ personLocations: Object.values(locations) });
        buffer = LocationResponse.encode(locationResponse).finish();
        io.emit('message', buffer);
    });

    socket.on('disconnect', async (socket) => {
        // const session = socket.request.session;
        const session = null;
        console.log(`User ${session?.username} disconnected!`);
    })
})