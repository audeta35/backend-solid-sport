"use strict";

const response = require("../responses/index");
const conn = require("../config/database");

require("dotenv").config();

exports.getAllMatch = (req, res) => {
    let getQuery = "SELECT * FROM `match`";
    conn.query(getQuery, [], (err, result, field) => {
        if(!err) {
            response.success(res, result);
        } else {
            res.status(422).send(err);
        }
    })
}

exports.addMatchGroup = (req, res) => {
    let { atlet } = req.body;
    let status = 1;
    let updateStatusAltet = "UPDATE athlete SET status=? WHERE id_atlet=?";
    let addQuery =
      "INSERT INTO `match` SET id_atlet=?, tatami=?, class=?, group_name=?, status=?, round=?";

    conn.query(updateStatusAltet, [status, atlet.id_atlet], (err, result1, field) => {
      if (!err) {
        conn.query(
          addQuery,
          [
            atlet.id_atlet,
            atlet.attribute,
            atlet.class,
            atlet.grouping,
            status,
            "null",
          ],
          (err, result2, field) => {
            if (!err) {
              response.success(res, result2);
            } else {
              res.status(422).send(err);
            }
          }
        );
      } else {
          res.status(422).send(err);
      }
    });
    
}