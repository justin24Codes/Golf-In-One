import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import jwtToken from "jsonwebtoken";

import Course from "./models/course.js";
import Round from "./models/round.js";
import User from "./models/user.js";
import { loggedIn } from "./middleware.js";

const app = express();
app.use(cors());

const secret = process.env.SECRET || "secret123";

mongoose.connect("mongodb://127.0.0.1:27017/golfHandicapTracker");

mongoose.connection.on(
  "error",
  console.error.bind(console, "connection error:")
);
mongoose.connection.once("open", () => {
  console.log("Connected");
});

const store = MongoStore.create({
  mongoUrl: "mongodb://127.0.0.1:27017/golfHandicapTracker",
  touchAfter: 24 * 60 * 60,
  crypto: {
    secret,
  },
});

store.on("error", function (e) {
  console.log("mongo error store");
});

const sessionConfig = {
  store,
  name: "session",
  secret: secret,
  resave: true,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    // secure: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(session(sessionConfig));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {});

app.get("/courses", async (req, res) => {
  const courses = await Course.find({});
  res.json(courses);
});

app.post("/course", async (req, res) => {
  const { courseName } = req.body;
  const course = await Course.findOne({ name: courseName });
  res.json(course);
});

app.get("/users", async (req, res) => {
  const users = await User.find({});
  res.send(users);
});

app.get("/courses/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).send("Course not found");
    }
    res.json(course);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.json("User Found");
  } else {
    const hash = await bcrypt.hash(password, 12);
    const user = new User({
      name,
      email,
      password: hash,
    });
    // req.session.email = email;
    res.json("Logged In");
    await user.save();
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    const validPass = await bcrypt.compare(password, user.password);
    if (validPass) {
      res.json("Success");
      // const token = jwt.sign({ email: email }, 'secret');
      // res.cookie("token", token, { expiresIn: '24h' });
    } else {
      res.json("Username or Password is incorrect");
    }
  } else {
    res.json("Username or Password is incorrect");
  }
});

app.post("/logout", (req, res) => {
  // res.clearCookie("email");
});

app.post("/rounds", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  const userId = user._id.toString();
  const rounds = await Round.find({ user: userId });
  res.json(rounds);
});

app.post("/rounds/postround", async (req, res) => {
  const { email } = req.body.round;
  const user = await User.findOne({ email });
  const userId = user._id.toString();
  const round = new Round({
    course: req.body.round.selectedCourse,
    numHoles: req.body.round.numHoles,
    tee: req.body.round.tee,
    score: req.body.round.score,
    date: req.body.round.newDate,
    user: userId,
  });
  await round.save();
});

app.put("/rounds", async (req, res) => {
  //Date and Course update not working
  const {editedRound} = req.body;
  // console.log(editedRound)
  const id = editedRound.id;
  const updatedRound = await Round.findByIdAndUpdate(id, editedRound)
  // console.log(updatedRound);
  res.json(updatedRound);
});

app.get("/rounds/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const round = await Round.findById(id);
    if (!round) {
      return res.json("Error");
    }
    res.json(round);
  } catch (e) {
    // res.json(e);
  }
});

app.delete("/rounds/:id", async (req, res) => {
  const { id } = req.params;
  await Round.findByIdAndDelete(id);
});

app.listen(3000, () => {
  console.log("Listening on PORT 3000");
});
