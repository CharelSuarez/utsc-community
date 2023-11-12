import { createServer } from "http";
import express from "express";
import "./load.mjs";
import cors from "cors";
import { User, getClient } from "./model/model.mjs";
import session from "express-session";
import MongoStore from "connect-mongo";
import { body, param, validationResult, query} from "express-validator";
import bcrypt from "bcrypt";
import { serialize } from "cookie";

const PORT = 4000;
const app = express();

app.use(express.json());

app.use(cors({
  origin: process.env.FRONTEND
}));

app.use(session({
  secret: process.env.SESSION_SECRET,
  cookie: {
  },
  saveUninitialized: true,
  resave: false,
  store: new MongoStore({
    client: getClient(),
    ttl: 1 * 60 * 60,
    autoRemove: 'native',
    collection: 'session'
  })
}));

app.use(function (req, res, next) {
  console.log("HTTP request", req.method, req.url, req.body);
  next();
});

function isAuthenticated(req, res, next) {
  if (!req.session.user) {
    return res.status(401).end("Access denied!");
  }
  next();
};

function isAuthenticatedAs(req, _id) {
  if (!req.session.user || req.session.user._id != _id) {
    return false;
  }
  return true;
}

app.use(function (req, res, next) {
  setUserCookie(req, res);
  next();
});

function setUserCookie(req, res) {
  res.setHeader(
    "Set-Cookie",
    serialize("user", !req.session.user ? null : req.session.user, {
      path: "/",
      maxAge: 60 * 60 * 24 * 14, // 14 days
    }),
  );
}

app.post("/api/login/", body(['username', 'password']).notEmpty(), async function (req, res, next) {
  if (!validationResult(req).isEmpty()) {
    return res.status(400).json(validationResult(req).array()).end();
  }

  const user = await User.findOne({username: req.body.username})
  if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
    return res.status(404).end("User not found!");
  }

  req.session.user = {_id: user._id, username: user.username};
  setUserCookie(req, res);
  res.sendStatus(200).end();
});

app.post("/api/register/", body(['username', 'password']).notEmpty(), async function (req, res, next) {
  if (!validationResult(req).isEmpty()) {
    return res.status(400).json(validationResult(req).array()).end();
  }

  let user = await User.findOne({username: req.body.username})
  if (user) {
    return res.status(409).end("Username already exists!");
  }

  const hash = bcrypt.hashSync(req.body.password, 10);
  user = await User.create({username: req.body.username, password: hash})
  req.session.user = {_id: user._id, username: user.username};
  setUserCookie(req, res);
  res.sendStatus(201).end();
});


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
