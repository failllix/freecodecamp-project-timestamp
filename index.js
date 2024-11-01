// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

const getDateResponseObject = (date) => {
  return {
    unix: date.getTime(),
    utc: date.toUTCString(),
  };
};

const getDate = (dateInput) => {
  if (dateInput === undefined) {
    return new Date();
  }
  return new Date(dateInput);
};

const getDateResponse = (dateInput) => {
  const correctlyFormattedDateInput = /^[0-9]*$/.test(dateInput)
    ? parseInt(dateInput)
    : dateInput;

  const date = getDate(correctlyFormattedDateInput);

  if (date.toString() === "Invalid Date") {
    return { error: "Invalid Date" };
  }

  return getDateResponseObject(date);
};

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date?", (req, res) => {
  res.json(getDateResponse(req.params.date));
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
