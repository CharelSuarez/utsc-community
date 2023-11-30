import { createServer } from "http";
import express from "express";
import "./load.mjs";
import cors from "cors";
import { User, Event, getClient , Group} from "./model/model.mjs";
import session from "express-session";
import MongoStore from "connect-mongo";
import { body, param, validationResult, query} from "express-validator";
import bcrypt from "bcrypt";
import { serialize } from "cookie";


const PORT = 5000;
const app = express();

app.use(express.json());

app.use(cors({
  origin: process.env.FRONTEND,
  credentials: true,
}));

export const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  cookie: {},
  saveUninitialized: true,
  resave: false,
  store: new MongoStore({
    client: getClient(),
    ttl: 1 * 60 * 60,
    autoRemove: 'native',
    collectionName: 'sessions'
  })
})

app.use(sessionMiddleware);

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
    serialize("user", !req.session.user ? 'null' : JSON.stringify(req.session.user), {
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

  const project = req.session.user = {_id: user._id.toString(), username: user.username};
  setUserCookie(req, res);
  res.status(200).json(project);
});

app.post("/api/register/", body(['username', 'password']).notEmpty(), async function (req, res, next) {
  if (req.session.user) {
    return res.status(409).end("Already logged in!");
  }

  if (!validationResult(req).isEmpty()) {
    return res.status(400).json(validationResult(req).array()).end();
  }

  let user = await User.findOne({username: req.body.username})
  if (user) {
    return res.status(409).end("Username already exists!");
  }

  const hash = bcrypt.hashSync(req.body.password, 10);
  user = await User.create({username: req.body.username, password: hash})

  const project = req.session.user = {_id: user._id.toString(), username: user.username};
  setUserCookie(req, res);
  res.status(201).json(project);
});



app.delete("/api/login/", isAuthenticated, async function (req, res, next) {
  req.session.user = null;
  setUserCookie(req, res);
  res.sendStatus(200).end();
});

app.post("/api/event/", async function (req, res, next) {
  const result = await Event.create(req.body);
  return res
  .status(200)
  .json(result);
});

app.get("/api/events/:page", async function (req, res, next) {
  const event = await Event.find({}).skip(parseInt(req.params.page)*6).limit(6);
  return res
  .status(200)
  .json({events: event});
});

app.post("/api/:friend/friends", isAuthenticated, async function(req,res){
  
    const friend = await User.findOne({username: req.params.friend});

    if(!friend){
      return res.sendStatus(404);
    }

    const user = await User.findOne({_id: req.session.user._id});
    if(!(user.friends.includes(req.params.friend))){
      user.friends.push(req.params.friend);
    }
   

    await User.updateOne({_id: req.session.user._id}, {$set:{friends: user.friends}});

    return res.send({user: user.friends.reverse().slice(0,3)});
});

app.post("/api/group/", isAuthenticated, async function(req, res){
  const users = req.body.users;
  users.push(req.session.user.username)
  users.sort();

  const group = await Group.find({users: users});
  

  if(group.length != 0){
    console.log(group);
    return res.status(403).json(users);
  }

  const result = await Group.create({users: users, messages: []});
  console.log(result.users);

  return res.status(200).json({users: result.users, _id: result._id});

});

app.get("/api/group/", isAuthenticated, async function(req, res){
  const group = await Group.find({},{users:1});
  res.status(200).json({group: group});
});

app.get("/api/message/:id/", isAuthenticated, async function(req, res){
  const messages = await Group.find({_id: req.params.id},{messages:1, _id: 0})

  if(messages.length == 0){
    return res.status(404).json([]) 
  }

  const filter = []
  

  for(let doc of messages[0].messages){
    let message = {user: doc.user, message: doc.message, _id: doc._id, mine: req.session.user.username == doc.user}
    filter.push(message)
  }


  console.log(filter);

  return res.status(200).json(filter)
});

app.get("/api/chat/", isAuthenticated, async function(req,res){

    const doc = await User.findOne({_id: req.session.user._id}).limit(5);

    return res.send({chat: doc.friends.reverse().slice(0,3)})
});

app.delete("/api/event/:eventId/", async function (req, res, next) {
  const event = await Event.findOne({_id : req.params.eventId});
  if(event == null){
    return res
    .status(404)
    .end("Event id:" + req.params.eventId + " does not exists");
  }
  else if(!isAuthenticatedAs(req, event.createdBy)){
    return res
    .status(404)
    .end("Event id:" + req.params.eventId + " not authorized to delete");
  }
  else {
    return res
  .status(200)
  .json(event);
  }
});

const server = createServer(app).listen(PORT, function (err) {
  if (err) console.log(err);
  else console.log("HTTP server on http://localhost:%s", PORT);
});