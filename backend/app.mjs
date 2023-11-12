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


app.post("/api/:user/friends", async function(req,res){
    const user = await User.findOne({username: req.params.user});
    user.friends.push(req.body.friend);

    await User.updateOne({username: req.params.user},{$set:{friends: user.friends}});

    return res.send({user: user.friends});
});


const server = createServer(app).listen(PORT, function (err) {
  if (err) console.log(err);
  else console.log("HTTP server on http://localhost:%s", PORT);
});
