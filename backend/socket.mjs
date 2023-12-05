import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import express from "express";
import { Group } from "./model/model.mjs";


const PORT = 2083;
const app = express();

app.use(express.json());

app.use(cors({
    origin: "*",
}));

export default function createSocketServer(sessionMiddleware) {
    const server = createServer(app).listen(PORT, function (err) {
        if (err) console.log(err);
        else console.log("HTTP server on http://localhost:%s", PORT);
    });
    const io = new Server(server)
    io.engine.use(sessionMiddleware);

    io.on('connection', (socket) => {
        const session = socket.request.session;
    
        const username = session?.user?.username;
        console.log(`User '${username}' connected!`);
    
        socket.on('message', async function(doc) {
    
            const message = {user: session.user.username, message: doc.message, createdAt: Date.now() };
            await Group.updateOne({_id:doc._id},{$push:{messages: message}});
    
            const mine = {user: session.user.username, message: doc.message, mine: true}
            const yours = {user: session.user.username, message: doc.message, mine: false}
    
            socket.join(doc._id);
            socket.broadcast.in(doc._id).emit('message', yours);
    
            socket.emit('message', mine);
        });
    
        socket.on('disconnect', async (socket) => {
            console.log(`User '${username}' disconnected!`);
        })
    })
}