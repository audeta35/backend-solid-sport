const express = require("express");
const routes = express.Router();
const matchController = require("../controllers/match");

routes.get("/getMatch", matchController.getAllMatch);
routes.post("/finish", matchController.updateMatch);
routes.post("/group-add", matchController.addMatchGroup);

module.exports = routes;
