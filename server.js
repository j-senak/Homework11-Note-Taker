// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');


// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 8080;

var notes = [];

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", function(req, res) {
  fs.readFile("./db/db.json","utf8", function(err,r){
    if (err){
      return res.send("Problem retrieving notes.")
    }

    // console.log("Res: "+JSON.stringify(r));
    return res.json(r);
  });  
});

// Displays a single note, or returns false
app.get("/api/notes/:id", function(req, res) {
  var index = parseInt(req.params.id);

  console.log(index);
  if (index >= 0 && index < notes.length) {
    res.json(notes[index]);
  } else {
  res.status(404);    
  return res.send("Unable to find note with that ID. Please try again");
  }

  // return res.json(false);
});

// Create New Characters - takes in JSON input
app.post("/api/notes", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newNote = req.body;
  newNote.id = uuidv4();

  res.json(newNote);
});




//   // Using a RegEx Pattern to remove spaces from newCharacter
//   // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
//   newCharacter.routeName = newCharacter.name.replace(/\s+/g, "").toLowerCase();

//   console.log(newCharacter);

//   characters.push(newCharacter);

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log(`App listening on http://localhost:${PORT}`);
});
