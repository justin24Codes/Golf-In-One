import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import session from "express-session";
import MongoStore from "connect-mongo";

import Course from "./models/course.js";
import Round from "./models/round.js";
import User from "./models/user.js";
import { loggedIn } from "./middleware.js";

import {courseRoutes} from "./routes/courses.js";
import {roundRoutes} from "./routes/rounds.js";

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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/courses', courseRoutes);
app.use('/rounds', roundRoutes);

app.post("/course", async (req, res) => {
  const { courseName } = req.body;
  const course = await Course.findOne({ name: courseName });
  res.json(course);
});

app.post("/tee", async (req, res) => {
  const { course, colour } = req.body;
  const golfCourse = await Course.findOne({ name: course });
  if (golfCourse) {
    const tee = golfCourse.tees.find((tee) => colour === tee.colour);
    res.json(tee);
  } else {
    res.json("Error");
  }
});

app.get("/users", async (req, res) => {
  const users = await User.find({});
  res.send(users);
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
    } else {
      res.json("Username or Password is incorrect");
    }
  } else {
    res.json("Username or Password is incorrect");
  }
});

app.post("/logout", (req, res) => {

});

app.listen(3000, () => {
  console.log("Listening on PORT 3000");
});