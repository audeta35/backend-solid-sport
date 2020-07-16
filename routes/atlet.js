const express = require("express");
const routes = express.Router();
const atletController = require("../controllers/atlet");

routes.get("/", atletController.getAtlet);
routes.post("/add", atletController.addAtlet);
routes.post("/add-hth", atletController.addAtletHth);

module.exports = routes;