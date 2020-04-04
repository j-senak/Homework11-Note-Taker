const express = require("express");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 8080;
var notes = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});
app.get("/api/notes", function(req, res) {
  fs.readFile("./db/db.json","utf8", function(err,r){
    if (err){
      return res.send("Problem retrieving notes.")
    }
    
    return res.json(r);
  });  
});

app.get("/api/notes/:id", function(req, res) {
  var index = parseInt(req.params.id);
  if (index >= 0 && index < notes.length) {
    res.json(notes[index]);
  } else {
  res.status(404);    
  return res.send("Unable to find note with that ID. Please try again");
  }

});
app.post("/api/notes", function(req, res) {

  var newNote = req.body;
  newNote.id = uuidv4();
  fs.writeFile("./db/db.json", JSON.stringify(newNote), function(err,r) {
    
  })
  res.json(newNote);
});
app.listen(PORT, function() {
  console.log(`App listening on http://localhost:${PORT}`);
});