const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const server = express();
const app = require('http').Server(server);
const io = require('socket.io')(app);
const cors = require('cors');
const conn = require('./config/database');

const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/users');

server.use(function (req, res, next) {
  req.io = io;
  next();
});

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

let whiteList = ["http://localhost:4200", "http://localhost:3000"];
server.use(
  cors({
    origin: (origin, cb) => {
      if (whiteList.indexOf(origin) !== -1) {
        cb(null, true);
      } else {
        cb(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

const users = {}
io.on("connection", (socket) => {
  console.log("welcome user");
  
  socket.on("login", function (data) {
    console.log("a user " + data.userId + " connected");
    // saving userId to array with socket ID
    users[socket.id] = data.userId;
  });

  socket.on("disconnect", function () {
    console.log("user " + users[socket.id] + " disconnected");
    // remove saved socket from users object
    delete users[socket.id];
  });
});

// Routes
server.use('/', indexRoutes);
server.use('/users', userRoutes);

app.listen(port);
console.log(`Server listening on port ${port}`);