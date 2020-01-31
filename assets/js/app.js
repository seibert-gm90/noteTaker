const express = require("express");
const path = require("path");
const fs = require("fs");



// Sets up the Express App
// =============================================================
const app = express();
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const database = require("./db/db.json");


app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./db/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./db/notes.html"));
});

// Displays all notes
app.get("/api/notes", function (req, res) {
    return res.json(database);
});

// POST `/api/notes` - Receives a new note to save on the request body, add it to the `db.json` file. 

app.post("/api/notes", function(req, res) {
    const newNote = req.body;
    let noteID = 0;
    for (const note of database) {
      let currentID = note.id;
      if (currentID > noteID) {
        noteID = currentID;
      }
    }
    newNote.id = noteID + 1;
    let tempDatabase = database;
    tempDatabase.push(newNote);
    fs.writeFile("./db/db.json", JSON.stringify(tempDatabase), err => {
      if (err) {
        console.log(err);
      } else {
        console.log("Added new note to db.json.");
        console.log(database);
        res.json(newNote);
      }
    });
  });
  

app.delete("/api/notes/:id", function(req, res){})