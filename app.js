const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { dirname } = require("path");
const e = require("express");

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

mongoose.connect(
  "mongodb+srv://pratt:prateek221592@cluster0.0tzz9rw.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const entrySchema = new mongoose.Schema({
  day: Number,
  start: Number,
  end: Number,
  duration: Number,

  // totalDuration: Number,
});

const entry = new mongoose.model("entry", entrySchema);

app.get("/", (req, res) => {
  userHours = 0;
  entry.find().then((allDays) => {
    allDays.forEach((day) => {
      userHours += day.duration;
    });
    res.render("index", {
      totalHours: userHours,
      allDays: allDays,
    });
  });
});

app.post("/submit", (req, res) => {
  totalHours = 0;
  console.log(req.body);
  const newEntry = new entry({
    day: req.body.day,
    start: req.body.start,
    end: req.body.end,
    duration: req.body.result,
    // totalDuration: prevDay.result + req.body.result,
  });

  newEntry.save().then(() => {
    entry.find().then((allDaysRefreshed) => {
      allDaysRefreshed.forEach((day) => {
        totalHours += day.duration;
      });
      res.render("index", {
        totalHours: totalHours,
        allDays: allDaysRefreshed,
      });
    });
  });
});

app.listen(process.env.PORT || 3000, (req, res) => {
  console.log("Server Running");
});
