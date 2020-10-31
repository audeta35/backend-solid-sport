const express = require("express");
const routes = express.Router();
const usersController = require("../controllers/users");

routes.get("/", usersController.getAllUsers);
routes.get("/admin", usersController.getAllAdmin);
routes.post("/add", usersController.addAllUsers);
routes.put("/edit", usersController.editUser);
routes.delete("/delete/:id", usersController.deleteUser);

// Autentikasi

routes.post("/login", usersController.loginUsers);
routes.post("/login-admin", usersController.loginAdmin);
routes.put("/logout", usersController.logOut);

module.exports = routes;
