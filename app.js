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
  start: String,
  end: String,
  duration: String,
  totalHours: Number,
  totalMinutes: Number,
});

const entry = new mongoose.model("entry", entrySchema);

app.get("/", (req, res) => {
  res.render("index", {});
});

app.post("/submit", (req, res) => {
  console.log(req.body);

  entry.findOne({ day: req.body.day - 1 }).then((prevDay) => {
    console.log(prevDay);
    const totalHoursForTheDay = prevDay.totalHours + req.body.totalHours;
    const totalMinsForTheDay = prevDay.totalMinutes + req.body.totalMinutes;

    const newEntry = new entry({
      day: req.body.day,
      start: req.body.start,
      end: req.body.end,
      duration: req.body.result,
      totalHours: totalHoursForTheDay,
      totalMinutes: totalMinsForTheDay,
    });

    newEntry.save().then(() => {
      console.log("done");
    });
  });
});

app.listen(process.env.PORT || 3000, (req, res) => {
  console.log("Server Running");
});
