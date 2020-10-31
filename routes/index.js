const express = require('express');
const routes = express.Router();
const indexController = require('../controllers/index');

routes.get('/', indexController.welcomeMessage);

module.exports = routes;