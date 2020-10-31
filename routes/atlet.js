const express = require("express");
const routes = express.Router();
const atletController = require("../controllers/atlet");

routes.get("/", atletController.getAtlet);
routes.get("/get-group", atletController.getGroup);
routes.get("/get-ranking/:id", atletController.getAtletRank);
routes.post("/get-by-match", atletController.getAtletByMatch);
routes.post("/add", atletController.addAtlet);
routes.post("/add-hth", atletController.addAtletHth);
routes.post("/truncate", atletController.trunscateAtlet);
routes.post("/truncateMatch", atletController.truncateMatch);
routes.delete("/del-atlet/:id", atletController.deteleAtlet);
routes.delete("/del-group/:id", atletController.deteleGroup);
routes.post('/import-group', atletController.importGrouping);

module.exports = routes;