import { createServer } from "http";
import express from "express";
import "./load.mjs";
import cors from "cors";
import { User, Event, getClient, Group } from "./model/model.mjs";
import session from "express-session";
import MongoStore from "connect-mongo";
import { body, param, validationResult, query } from "express-validator";
import bcrypt from "bcrypt";
import { serialize } from "cookie";
import multer from "multer";
import fs from "fs";
import { BUILDINGS } from "./util/building/Building.mjs";
import mongoose from "mongoose";

const PORT = 5000;
const app = express();
const SESSION_TIME = 60 * 60 * 24; // 24 hours

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: process.env.FRONTEND,
  credentials: true,
}));

export const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: SESSION_TIME * 1000,
    secure: false,
    sameSite: 'lax',
    httpOnly: true
  },
  saveUninitialized: true,
  resave: false,
  store: new MongoStore({
    client: getClient(),
    ttl: SESSION_TIME,
    autoRemove: 'native',
    collectionName: 'sessions'
  })
})
app.use(sessionMiddleware);

const avatars = multer({ dest: 'public/avatars/', limits: { fileSize: 1024 * 1024 }}) // 1MB
app.use(express.static('public'))

app.use(function (req, res, next) {
  console.log(`HTTP request from \'${req.session?.user?.username}\'`, req.method, req.url, req.body);
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
    serialize("user", !req.session.user ? 'null' : JSON.stringify(req.session.user), {
      path: "/",
      maxAge: SESSION_TIME,
    }),
  );
}

app.post("/api/login/", body(['username', 'password']).notEmpty(), async function (req, res, next) {
  if (!validationResult(req).isEmpty()) {
    return res.status(400).json(validationResult(req).array()).end();
  }

  const user = await User.findOne({ username: req.body.username })
  if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
    return res.status(404).end("User not found!");
  }

  const avatar = getUserAvatar(user);
  const project = req.session.user = { _id: user._id.toString(), username: user.username, avatar };
  setUserCookie(req, res);
  res.status(200).json(project);
});

function deleteFile(file) {
  if (!file) {
    return;
  }
  fs.unlink(file.path, (err) => {
    if (err) {
      console.error("Failed to delete file!", err)
    }
  });
}

app.post("/api/register/", async function (req, res, next) {
  avatars.single('avatar') (req, res, async function (err) {
    if (err) {
      return res.status(400).end("Bad file!");
    }

    body(['username', 'password']).notEmpty()(req, res, (err) => {});
  
    if (req.session.user) {
      deleteFile(req.file);
      return res.status(409).end("Already logged in!");
    }
  
    if (!validationResult(req).isEmpty()) {
      deleteFile(req.file);
      return res.status(400).json(validationResult(req).array()).end();
    }
  
    let user = await User.findOne({username: req.body.username})
    if (user) {
      deleteFile(req.file);
      return res.status(409).end("Username already exists!");
    }
  
    const hash = bcrypt.hashSync(req.body.password, 10);
    user = await User.create({username: req.body.username, password: hash, avatar: req.file})

    const avatar = getUserAvatar(user);
    const project = req.session.user = {_id: user._id.toString(), username: user.username, avatar};
    setUserCookie(req, res);
    res.status(201).json(project);
  });
});

app.delete("/api/login/", isAuthenticated, async function (req, res, next) {
  req.session.user = null;
  setUserCookie(req, res);
  res.status(200).json({});
});

app.post("/api/event/", isAuthenticated, async function (req, res, next) {
  req.body.createdBy = req.session.user._id;
  const result = await Event.create(req.body);

  return res
    .status(200)
    .json(result);
});

app.patch("/api/friends/", isAuthenticated, async function (req, res){
  let user = await User.findOne({_id: req.session.user._id});

  if(!user){
    return res.sendStatus(404);
  }

  if(user.friends.includes(req.body.friend)){
    const updated = user.friends.filter((value) => value != req.body.friend);
    user = await User.updateOne({_id: req.session.user._id}, {$set: { friends: updated }})
    
    res.json(user);
  }else{
    res.sendStatus(404);
  }
});

function getUserAvatar(user) {
  let avatar = user.avatar?.path?.replace(/\\/g, "/");
  if (!avatar || !fs.existsSync("./" + avatar)) {
    avatar = "avatars/default.svg"; 
  }
  if (avatar.startsWith("public/")) {
    avatar = avatar.substring("public/".length);
  }
  return "http://localhost:5000/" + avatar; // TODO: Fix origin!
}

// Endpoint to get any user's information
app.get("/api/user/:id", isAuthenticated, async (req, res, next) => {
  const user = await User.findOne({_id: req.params.id});
  const avatar = getUserAvatar(user);
  return res.status(200).json({_id: user._id, username: user.username, avatar});
});

app.get("/api/events/", isAuthenticated, async function (req, res, next) {
  let start = req.query.startDateFilter;
  let end = req.query.endDateFilter;
  let loc = req.query.locationFilter;
  let events;
  console.log(loc);
  if(start == ""){
    start = "1970-01-01";
  }
  if (end == "") {
    end = "2099-01-01";
  }
  if (loc == "") {
    events = await Event.find({ startDate: { $gte: start, $lt: end } }).sort({ createTime: -1 }).skip(parseInt(req.query.page) * 4).limit(4);
  }
  else{
    events = await Event.find({ startDate: { $gte: start, $lt: end }, location: loc }).sort({ createTime: -1 }).skip(parseInt(req.query.page) * 6).limit(6);
  }
  
  for (let index = 0; index < events.length; index++) {
    if(mongoose.isValidObjectId(events[index].createdBy)){
      const username = await User.findOne({_id: events[index].createdBy}, {username: 1});
      events[index].createdBy = username?.username || "";
    }
    
  }


  return res
  .status(200)
  .json({events: events});
});

app.get("/api/numberOfEvents/", isAuthenticated, async function (req, res, next) {
  const numberOfEvents = {};
  for (let index = 0; index < Object.keys(BUILDINGS).length; index++) {
    const key = Object.keys(BUILDINGS)[index];
    console.log(key);
    numberOfEvents[key] = await Event.find({ location: key }).count();
  }
  return res
  .status(200)
  .json({numberOfEvents});
});

app.patch("/api/attendevent/", isAuthenticated, async function (req, res, next){
  const event = await Event.updateOne(
    {_id: req.body.eventId}, {$push: {guests: req.body.attendee}}
  );
  return res
  .status(200)
  .json({event});
});

app.patch("/api/unattendevent/", isAuthenticated, async function (req, res, next){
  const event = await Event.updateOne(
    {_id: req.body.eventId}, {$pull: {guests: req.body.attendee}}
  );
  return res
  .status(200)
  .json({event});
});

app.post("/api/friends/", isAuthenticated, async function (req, res) {

  const friend = await User.findOne({ username: req.body.friend });

  //check if friend exists
  if (!friend) {
    return res.sendStatus(404);
  }

  const user = await User.findOne({ _id: req.session.user._id });

  const userRequest = user.requests.filter((val) => val.user != req.body.friend);
  const friendRequest = friend.requests.filter((val) => val.user != req.session.user.username);


  //add friend to users friends if it exists 
  if (userRequest.length != user.requests.length) {

    user.friends.push(req.body.friend);
    friend.friends.push(req.session.user.username);
  }

  await User.updateOne({ _id: req.session.user._id }, { $set: { friends: user.friends } });
  await User.updateOne({ _id: req.session.user._id }, { $set: { requests: userRequest } });

  await User.updateOne({ username: req.body.friend }, { $set: { requests: friendRequest} });
  await User.updateOne({ username: req.body.friend }, { $set: { friends: friend.friends } });

  return res.send({ user: user.friends.reverse() });


});

app.post("/api/request/", isAuthenticated, async function (req, res) {
  const friend = await User.findOne({ username: req.body.friend });

  if (!friend) {
    return res.sendStatus(404);
  }

  const user = await User.findOne({ _id: req.session.user._id });

  if (!(user.requests.some(val => val.user == req.body.friend) || friend.requests.some(val => val.user == req.session.user.username))) {
    user.requests.push({ reqType: "sent", user: req.body.friend });
    friend.requests.push({ reqType: "recieved", user: req.session.user.username });
  }

  await User.updateOne({ _id: req.session.user._id }, { $set: { requests: user.requests } });
  await User.updateOne({ username: req.body.friend }, { $set: { requests: friend.requests } });

  return res.send({ user: user.requests.reverse() });

});

app.get("/api/request/", isAuthenticated, async function (req, res) {
  const user = await User.findOne({ _id: req.session.user._id }, { _id: 0 });

  return res.send({ requests: user.requests });
});

app.post("/api/group/", isAuthenticated, async function (req, res) {

  const users = req.body.users;
  
  users.push(req.session.user.username)
  users.sort();

  const group = await Group.find({})
  const name = req.body.name == "Group" ? req.body.name + " " + group.length : req.body.name; 


  const result = await Group.create({ users: users, messages: [], name: name });

  return res.status(200).json({ users: result.users, _id: result._id, name: result.name });

});

app.get("/api/group/", async function (req, res) {
  const group = await Group.find({ users: { $in: [req.session.user.username] } }, { messages: 0});
  res.status(200).json({ group: group });
});

app.get("/api/message/:id/", isAuthenticated, async function (req, res) {
  const messages = await Group.findOne({ _id: req.params.id }, { messages: 1, _id: 0 })

  if (!messages) {
    return res.status(404).json([])
  }

  const filter = []

  for (let doc of messages.messages) {
    let message = { user: doc.user, message: doc.message, _id: doc._id, mine: req.session.user.username == doc.user}
    filter.push(message)
  }
  return res.status(200).json(filter)
});

app.get("/api/friends/", isAuthenticated, async function (req, res) {

  const doc = await User.findOne({ _id: req.session.user._id }).limit(5);
  return res.send({ chat: doc.friends.reverse() })

});

app.get("/api/allUsers/", isAuthenticated, async function (req, res) {
  const doc = await User.find({}, { username: 1, _id: 0 });
  const filter = doc.map((value) => value.username).filter((value) => value != req.session.user.username);

  return res.status(200).json({ friends: filter });
});

app.delete("/api/event/:eventId/",  isAuthenticated, async function (req, res, next) {
  const event = await Event.deleteOne({_id : req.params.eventId, createdBy: req.session.user._id});
  if(!event){
    return res
      .status(404)
      .end("Event id:" + req.params.eventId + " does not exists");
  }
  return res
  .status(200)
  .json(event);
});

const server = createServer(app).listen(PORT, function (err) {
  if (err) console.log(err);
  else console.log("HTTP server on http://localhost:%s", PORT);
});