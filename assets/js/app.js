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


const database = require("assets/db/db.json");


app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "notes.html"));
});

// Displays all notes
app.get("/api/notes", function (req, res) {
    return res.json(database);
});

// Posts new notes to side of page. 
app.post("/api/notes", function(req, res) {
    
    const newNote = req.body;
    let noteID = 0;

    for (const note of database){
        
    }
  
    
    newNote.routeName = newNote.name.replace(/\s+/g, "").toLowerCase();
  
    console.log(newNote);
  
    database.push(newNote);
  
    res.json(newNote);
  });

  app.delete("/api/notes", function(req, res){

  })
  
  // Starts the server to begin listening
  // =============================================================
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  
