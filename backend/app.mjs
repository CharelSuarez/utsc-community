import { createServer } from "http";
import express from "express";
import Datastore from "nedb";
import "./load.mjs";
import cors from "cors";

const PORT = 4000;
const app = express();

app.use(express.json());
app.use(cors(
    {
        origin: process.env.FRONTEND,
    }
));

const server = createServer(app).listen(PORT, function (err) {
  if (err) console.log(err);
  else console.log("HTTP server on http://localhost:%s", PORT);
});
