'use strict';

const response = require("../responses/index");
const conn = require("../config/database");

require("dotenv").config();

exports.getAll = (req, res) => {
    let query = "SELECT * FROM tatami";
    conn.query(query, [], (err, result, field) => {
        if(!err) {
            response.success(res, result);
        } else {
            res.status(422).send(err)
        }
    })
}

exports.addTatami = (req, res) => {
    let { payload } = req.body;
    let keys = Object.keys(payload);
    let value = [];
    let query = "INSERT INTO tatami (name, class) VALUES ?";

    keys.map((key) => {
        value.push([payload[key].name, payload[key].class]);
    })

    conn.query(query, [value], (err, result, field) => {
        if (!err) {
          response.success(res, result);
        } else {
          res.status(422).send(err);
        }
    })

}

exports.delTatami = (req, res) => {
    let { id } = req.params;
    let query = "DELETE FROM tatami WHERE id=?";

    conn.query(query, [id], (err, result, field) => {
        if (!err) {
          response.success(res, result);
        } else {
          res.status(422).send(err);
        }
    })
}