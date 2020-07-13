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
  
  socket.on("login", function (user) {
    console.log(`${user.username} logged in as ${user.name}`);
    // saving userId to array with socket ID
    users[socket.id] = user.id_user;

    let status = "online";
    let updateStatus = `UPDATE users SET status=? WHERE id_user=?`;
    conn.query(updateStatus, [status, user.id_user], (err, result, field) => {
      socket.join('getStatus');
      io.in('getStatus').emit('getStatus');
    })

  });

  socket.on("disconnect", function () {
    console.log("user with id: " + users[socket.id] + " disconnected");

    if(users[socket.id]) {
      let status = "offline";
      let updateStatus = `UPDATE users SET status=? WHERE id_user=?`;
      conn.query(updateStatus, [status, users[socket.id]], (err, result, field) => {
        socket.join("getStatus");
        io.in("getStatus").emit("getStatus2");
        // remove saved socket from users object
        delete users[socket.id];
      });
    }
  });
});

// Routes
server.use('/', indexRoutes);
server.use('/users', userRoutes);

app.listen(port);
console.log(`Server listening on port ${port}`);