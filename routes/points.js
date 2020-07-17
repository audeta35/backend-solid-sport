const express = require("express");
const routes = express.Router();
const pointsController = require("../controllers/points");

routes.get("/get-point/:athleteId/:matchId", pointsController.getPointForAdmin);
routes.get("/get-scoreboard-point/:athleteId/:matchId", pointsController.getPointForScoreboard);
routes.post("/calculate", pointsController.doPointsByUser);

module.exports = routes;
