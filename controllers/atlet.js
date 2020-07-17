"use strict";

const response = require("../responses/index");
const conn = require("../config/database");

require('dotenv').config();

exports.addAtletHth = (req, res) => {
    let {payload} = req.body;
    let keys = Object.keys(payload);
    let value = [];
    let add = `INSERT INTO athlete (atlet_name, kontingen, class, kata_name, grouping, attribute) VALUES ?`;

    payload.map((pay) => {
        keys.map((key) => {
            value.push([
                payload[key].name,
                payload[key].kontingen,
                "none",
                payload[key].kata,
                payload[key].group,
                payload[key].attribute,
            ])
        })
    })

    conn.query(add, [value], (err, result, field) => {
        if(!err) {
            response.success(res, result);
        }
        else {
            res.status(422).send(err);
        }
    })
}

exports.addAtlet = (req, res) => {
    let { payload } = req.body;
    let { group } = req.body;
    let keys = Object.keys(payload);
    let kiys = Object.keys(group);
    let value = [];
    let value2 = [];
    let addGroup = `INSERT INTO groups (group_name) VALUES ?`;
    let addAtlet = `INSERT INTO athlete (atlet_name, kontingen, class, kata_name, grouping, attribute) VALUES ?`;
    let getGroup = 'SELECT * from groups';

    keys.map((key) => {
      value.push([
        payload[key].name,
        payload[key].kontingen,
        "none",
        payload[key].kata,
        payload[key].group,
        payload[key].attribute,
      ]);
    });

    conn.query(addAtlet, [value], (err, result1, field) => {
        if(!err) {
            conn.query(getGroup, [], (err, result2, field) => {
            if (!err) {
                kiys.map((kuy) => {
                    if (!result2[kuy]) {
                        value2.push([group[kuy].name]);
                    }
                });

                if(value2.length) {
                    conn.query(addGroup, [value2], (err, result3, field) => {
                        if(!err) {
                            response.success(res, result3);
                        } else {
                            res.status(422).send(err);   
                        }
                    })
                } else {
                    response.success(res, result2);
                }

            } else {
                res.status(422).send(err);
            }
            }); 
        } else {
            res.status(422).send(err);
        }
    })
}

exports.getAtlet = (req, res) => {
    let getatlet = `SELECT * FROM athlete`;
    let getgroup = `SELECT * FROM groups`;

    conn.query(getatlet, [], (err, result1, field) => {
        if(!err) {
            conn.query(getgroup, [], (err, result2, field) => {
                if(!err) {
                    let payload = {
                        atlet: result1,
                        group: result2
                    }
                    response.success(res, payload);
                } else if(result2.length === 0) {
                    response.success(res, result1);
                } else {
                    res.status(422).send(err)
                }
            })
        } else {
            res.status(422).send(err);
        }
    })
}