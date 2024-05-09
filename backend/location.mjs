import { Server } from "socket.io";
import cors from "cors";
import express from "express";
import protobuf from "protobufjs";
import { Group } from "./model/model.mjs";

const app = express();

app.use(express.json());

app.use(cors({
    origin: "*",
}));

export default function createLocationServer(sessionMiddleware, server) {
    const io = new Server(server);
    io.engine.use(sessionMiddleware);

    console.log("Socket started...");

    io.on('connection', async (socket) => {
        if (!socket.request.session?.user) {
            socket.disconnect();
            return;
        }
    
        const session = socket.request.session;
        const personId = session.user._id;
        const username = session.user.username;
        const avatar = session.user.avatar;
        console.log(`User '${username}' connected!`);

        socket.on('message', async function(doc) {
            if (!doc.message || !doc._id) {
                return;
            }

            const message = {user: session.user.username, message: doc.message, createdAt: Date.now() };
            await Group.updateOne({_id: doc._id},{$push:{messages: message}});
    
            const mine = {user: session.user.username, message: doc.message, mine: true}
            const yours = {user: session.user.username, message: doc.message, mine: false}
    
            socket.join(doc._id);
            socket.broadcast.in(doc._id).emit('message', yours);
    
            socket.emit('message', mine);
        });
    
        socket.on('location', async (message) => {
            if (!Location) {
                await loadProto();
            }

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
            // Add user's location to all locations
            locations[personId] = { 
                personId,
                username,
                avatar,
                location,
                lastUpdated: Date.now()
            } 
    
            // TODO Remove this!
            for (let i = Object.values(locations).length; i < 50; i++) {
                const random = `${Math.floor(Math.random() * 20000)}`;
                locations[random] = {
                    personId: random,
                    username: `Random User`,
                    avatar: 'http://localhost:5001/avatars/default.svg', // TODO: Fix origin!
                    location: {
                        latitude: 43.777106 + Math.random() * (43.792295 - 43.777106),
                        longitude: -79.180157 + Math.random() * (-79.195519 - -79.180157),
                    }, 
                    lastUpdated: null
                }
            }
            const locationResponse = LocationResponse.create({ personLocations: Object.values(locations) });
            buffer = LocationResponse.encode(locationResponse).finish();
            io.emit('location', buffer);
        });
    
        socket.on('disconnect', async (socket) => {
            console.log(`User '${username}' disconnected!`);
        })
    })
}

let Location;
let LocationResponse;

const GEO_INTERVAL = 50;

async function loadProto() {
    const root = await protobuf.load("./proto/location_service.proto");
    Location = root.lookupType("locationservice.Location");
    LocationResponse = root.lookupType("locationservice.LocationResponse");
}

const locations = {};