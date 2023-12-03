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
  cookie: {
    maxAge: 1 * 60 * 60 * 1000, // 1 hour
    secure: false,
    sameSite: 'lax',
    httpOnly: true
  },
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
  res.status(200).json({});
});

app.post("/api/event/", async function (req, res, next) {
  const result = await Event.create(req.body);

  return res
  .status(200)
  .json(result);
});

app.get("/api/events/", async function (req, res, next) {
  var start = req.query.startDateFilter;
  var end = req.query.endDateFilter;
  var loc = req.query.locationFilter;
  console.log(loc);
  if(start == ""){
    start = "1970-01-01";
  }
  if(end == ""){
    end = "2099-01-01";
  }
  if(loc == ""){
    const event = await Event.find({startDate:{$gte: start,$lt: end}}).sort({createTime:-1}).skip(parseInt(req.query.page)*4).limit(4);
  return res
  .status(200)
  .json({events: event});
  }
  const event = await Event.find({startDate:{$gte: start,$lt: end}, location: loc}).sort({createTime:-1}).skip(parseInt(req.query.page)*6).limit(6);
  return res
  .status(200)
  .json({events: event});
});

app.patch("/api/attendevent/", async function (req, res, next){
  const event = await Event.updateOne(
    {_id: req.body.eventId}, {$push: {guests: req.body.attendee}}
  );
  return res
  .status(200)
  .json({event});
});

app.patch("/api/unattendevent/", async function (req, res, next){
  const event = await Event.updateOne(
    {_id: req.body.eventId}, {$pull: {guests: req.body.attendee}}
  );
  return res
  .status(200)
  .json({event});
});

app.post("/api/friends/", isAuthenticated, async function(req,res){
  
    const friend = await User.findOne({username: req.body.friend});

    //check if friend exists
    if(!friend){
      return res.sendStatus(404);
    }

    const user = await User.findOne({_id: req.session.user._id});

    //find the index of friend is in requests
    const recieved = user.requests.findIndex(val => val.user == req.body.friend && val.reqType == "recieved");
    const sent = friend.requests.findIndex(val => val.user == req.session.user.username && val.reqType == "sent");


    //add friend to users friends if it exists 
    if(recieved > -1){

      user.friends.push(req.body.friend);
      friend.friends.push(req.session.user.username);
      user.requests.splice(user.requests[recieved], 1);
      friend.requests.splice(friend.requests[sent], 1);
    }

    await User.updateOne({_id: req.session.user._id}, {$set:{friends: user.friends}});
    await User.updateOne({_id: req.session.user._id}, {$set:{requests: user.requests}});

    await User.updateOne({username: req.body.friend}, {$set:{requests: friend.requests}});
    await User.updateOne({username: req.body.friend}, {$set:{friends: friend.friends}});

    return res.send({user: user.friends.reverse()});
});

app.post("/api/request/", isAuthenticated, async function(req,res){
  const friend = await User.findOne({username: req.body.friend});

  if(!friend){
    return res.sendStatus(404);
  }

  const user = await User.findOne({_id: req.session.user._id});

  if(!(user.requests.some(val => val.user == req.body.friend) || friend.requests.some(val => val.user == req.session.user.username))){
    user.requests.push({reqType:"sent", user:req.body.friend});
    friend.requests.push({reqType:"recieved", user:req.session.user.username});
  }

  await User.updateOne({_id: req.session.user._id}, {$set:{requests: user.requests}});
  await User.updateOne({username: req.body.friend}, {$set:{requests: friend.requests}});

  return res.send({user: user.requests.reverse()});

});

app.get("/api/request/", isAuthenticated, async function(req,res){
  const user = await User.findOne({_id: req.session.user._id},{_id:0});

  return res.send({requests: user.requests});
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
  const group = await Group.find({users: {$in:[req.session.user.username]}},{users:1});
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

  return res.status(200).json(filter)
});

app.get("/api/friends/", isAuthenticated, async function(req,res){

    const doc = await User.findOne({_id: req.session.user._id}).limit(5);
    return res.send({chat: doc.friends.reverse()})
    
});

app.get("/api/allUsers/", isAuthenticated, async function(req, res){
  const doc = await User.find({}, {username: 1, _id: 0});
  const filter = doc.map((value) => value.username).filter((value) => value != req.session.user.username);

  return res.status(200).json({friends: filter});
});

app.delete("/api/event/:eventId/", async function (req, res, next) {
  const event = await Event.deleteOne({_id : req.params.eventId, createdBy: req.session.user.username});
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