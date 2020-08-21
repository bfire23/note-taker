const fs = require("fs");
const path = require("path");
const express = require("express");
const dbjson = require("./db/db.json");


const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


//paths
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});
app.get("/api/notes", function (req, res) {
  fs.readFile("./db/db.json", 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }
    res.json(data);
  });
  
});
  
  
  app.get("/api/notes/:id", function (req, res) {
    const choose = req.params.id;
    console.log(choose);
    for (let i = 0; i < dbjson.length; i++) {
        if (choose == dbjson[i].id) {
            return res.json(dbjson[i]);
        }
    }
    return res.json(false);
  });
  

//posting
app.post("/api/notes", function (req, res) {
  const newNote = req.body;
  newNote.id = Date.now();
    console.log(newNote);
    fs.readFile("./db/db.json", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }

        let notes = JSON.parse(data);
        notes.push(newNote);
        let readNotes = JSON.stringify(notes);
        
        fs.writeFile("./db/db.json", readNotes, function (err) {
          if (err) {
            return console.log(err);
        }
        console.log("Success!");
        res.json(newNote);
    });
    console.log(data);
});
  
});
  
  
  

app.delete("/api/notes/:id", function (req, res) {
  const delFile = req.params.id;
  console.log(delFile);
  fs.readFile("./db/db.json", "utf8", function (error, data) {
      if (error) {
          return console.log(error);
      }

      let notes = JSON.parse(data);
        const keepFile = [];
        for (let i = 0; i < notes.length; i++) {
            if (delFile != notes[i].id) {
                keepFile.push(notes[i]);
            }
        }
        let keep = JSON.stringify(keepFile);

        fs.writeFile("./db/db.json", keep, function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("Success!");
            res.json(keep);
        });
        console.log(data);
    });
});




app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});