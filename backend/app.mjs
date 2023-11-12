import { createServer } from "http";
import express from "express";
import "./load.mjs";
import cors from "cors";

import { User } from "./model/model.mjs";

const PORT = 4000;
const app = express();

app.use(express.json());

app.use(cors(
    {
        origin: process.env.FRONTEND
    }
));


app.get("/api/friends/:user", async function(req,res){
    const friend = await  User.findOne({username: req.params.user}, {username:1})
    return res.json(friend);
});


const server = createServer(app).listen(PORT, function (err) {
  if (err) console.log(err);
  else console.log("HTTP server on http://localhost:%s", PORT);
});
