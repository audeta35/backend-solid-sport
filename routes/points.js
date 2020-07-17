const express = require("express");
const routes = express.Router();
const pointsController = require("../controllers/points");

routes.post("/calculate", pointsController.doPointsByUser);

module.exports = routes;
