const express = require('express');
const low = require('lowdb');
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("./Database.json");
const db = low(adapter);
const adapter2 = new FileSync("./Blacklist.json");
const db2 = low(adapter2);
const path = require('path');
const bodyParser = require('body-parser');
var username;
var IP;
var date = new Date().toDateString;
const PORT = 8080;

const app = express();
app.set('trust proxy',true); 
app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
db.defaults({
    Users: []
  }).write();
db2.defaults({
    Blacklist: []
  }).write();

app.get('/', function(req, res) {
  IP = req.ip;
  res.sendFile(path.join(__dirname, '/RobloxLogin.html'));
  });

app.post('/fetchUser', (req, res) => {
        username = req.body.username ? req.body.username : "*";
});

app.post('/pushUser', (req, res) => {
    if(!db.get("Users").find({
        Name: username
    }).value())
    {
        db.get("Users").push({
        Name: username,
        IP: IP,
        Verif_Date: date
      }).write();
    }
});
     app.get("/getUser", (req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        fetch(`https://auth.roblox.com/v1/usernames?username=${username}`)
        .then((response) => {
            response.json().then((json) => {
                 res.send(json);
                 res.end();
            })
        })
    });

    app.post("/roLink", (req, res) => {
      if(db.get("Users").find({
        Name: JSON.stringify(req.body).split("\"")[3]
    }).value()) res.send(true);
    else res.send(false);
    });

    app.post("/blackList", (req, res) => {
      if(db2.get("Blacklist").find({
        IP: JSON.stringify(req.body).split("\"")[3]
    }).value()) res.send(true);
    else res.send(false);
    });

    
app.listen(PORT);