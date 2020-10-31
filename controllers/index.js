'use strict';
const response = require('../responses/index');

exports.welcomeMessage = (req, res) => {
    response.root(res);
}