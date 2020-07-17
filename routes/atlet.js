const express = require("express");
const routes = express.Router();
const atletController = require("../controllers/atlet");

routes.get("/", atletController.getAtlet);
routes.get("/get-by-match", atletController.getAtletByMatch);
routes.post("/add", atletController.addAtlet);
routes.post("/add-hth", atletController.addAtletHth);

routes.post('/import-group', atletController.importGrouping);

module.exports = routes;