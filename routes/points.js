const express = require("express");
const routes = express.Router();
const pointsController = require("../controllers/points");

routes.post("/get-point/:athleteId/:matchId", pointsController.getPointForAdmin);
routes.post("/get-scoreboard-point/:athleteId/:matchId", pointsController.getPointForScoreboard);

routes.post("/calculate", pointsController.doPointsByUser);
routes.post("/get-next-athlete/:athleteId", pointsController.changeAthleteAssessment);
routes.post('/calculate-by-admin', pointsController.doPointByAdmin);
module.exports = routes;
