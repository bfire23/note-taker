const fs = require("fs");
// const inquirer = require("inquirer");
const path = require("path");
const express = require("express");


const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//paths
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "notes.html"));
  });
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  });
  app.get("/api/notes", function (req, res) {
     res.sendFile(Path.join(__dirname, "./db/db.json"));
  });
  
  //posting
  app.post("/api/notes", function (req, res) {
    let newNote = req.body;
     fs.readFileSync("./db/db.json")
     activeNote.push(newNote)
  });
  
  app.delete("/api/notes/:id", function (req, res) {
    let id 
  
  });
  
  
  
  
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });