// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

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
  const input = req.params.date;

  // Utility functions to check the validity of the input
  const isValidDate = !isNaN(Date.parse(input)); // Checks if the input is a valid date string (e.g., "2015-12-25")
  const isValidUnixNumber = /^[0-9]+$/.test(input); // Checks if the input is a whole number (valid Unix timestamp format)
  const isEmpty = input === "" || input == null; // Checks if the input is empty or undefined

  // Output variables to store Unix and UTC time formats
  let unixOutput;
  let utcOutput;

  // Condition 1: Check if input is a valid date string
  if (isValidDate) {
    const date = new Date(input);
    unixOutput = date.valueOf();
    utcOutput = date.toUTCString();
    return res.json({ unix: unixOutput, utc: utcOutput });
  }

  // Condition 2: Check if input is a valid Unix timestamp (numeric only)
  else if (isValidUnixNumber) {
    const date = new Date(parseInt(input, 10));
    unixOutput = date.valueOf();
    utcOutput = date.toUTCString();
    return res.json({ unix: unixOutput, utc: utcOutput });
  }

  // Condition 3: If no input is provided, return the current date/time
  else if (isEmpty) {
    const date = new Date();
    unixOutput = date.valueOf();
    utcOutput = date.toUTCString();
    return res.json({ unix: unixOutput, utc: utcOutput });
  }

  // Condition 4: If input does not match any valid format, return an error
  else {
    return res.json({ error: "Invalid Date" });
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
