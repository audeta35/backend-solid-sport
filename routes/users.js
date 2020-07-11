const express = require("express");
const routes = express.Router();
const usersController = require("../controllers/users");

routes.get("/", usersController.getAllUsers);
routes.post("/login", usersController.loginUsers);
routes.post("/login-admin", usersController.loginAdmin);


module.exports = routes;
