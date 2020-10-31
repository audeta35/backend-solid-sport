const express = require("express");
const routes = express.Router();
const tatamiController = require("../controllers/tatami");

routes.get("/", tatamiController.getAll);
routes.post("/add", tatamiController.addTatami);
routes.delete("/del/:id", tatamiController.delTatami);

module.exports = routes;
