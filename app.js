const express = require('express');
const port = process.env.PORT || 3000;
const server = express();
const app = require('http').Server(server);
const indexRoutes = require('./routes/index');
const cors = require('cors');

// const whiteList = [
//   "http://localhost:3000",
//   "http://localhost:4200",
//   "http://localhost:4300",
// ];

// // CORS
// server.use(
//   cors({
//     origin: (origin, cb) => {
//       if (whiteList.indexOf(origin) !== -1) {
//         cb(null, true);
//       } else {
//         cb(new Error("Not allowed by CORS"));
//       }
//     },
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
//   })
// );

// Routes
server.use('/', indexRoutes);

app.listen(port);
console.log(`Server listening on port ${port}`);