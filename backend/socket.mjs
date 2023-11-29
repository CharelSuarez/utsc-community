import { createServer } from "http";
import { Server } from "socket.io";
import { sessionMiddleware } from "./app.mjs";
import cors from "cors";
import express from "express";


const PORT = 5001;
const app = express();

app.use(express.json());

app.use(cors({
    origin: "*",
}));


const server = createServer(app).listen(PORT, function (err) {
    if (err) console.log(err);
    else console.log("HTTP server on http://localhost:%s", PORT);
});

const io  = new Server(server)
io.engine.use(sessionMiddleware);


io.on('connection', (socket) => {
    const session = socket.request.session;

    console.log('user connected');

    socket.on('message', (message) => {
        console.log(message);
        io.emit('message', message);
    });
})