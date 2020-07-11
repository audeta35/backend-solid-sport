"use strict";
require('dotenv').config();

const response = require("../responses/index");
const conn = require("../config/database");
const jwt = require("jsonwebtoken");

exports.getAllUsers = (req, res) => {
    let getUser = `SELECT * FROM users WHERE level = 0`;
    conn.query(getUser, [], (err, users, field) => {
        if(!err) {
            response.success(res, users);
        } else {
            res.status(422).send(err);
        }
    })
};

exports.loginUsers = (req, res) => {
    let {username, password} = req.body;
    let loginUser = `SELECT * FROM users WHERE username=? AND password=? AND level=0`;
    conn.query(loginUser, [username, password], (err, users, field) => {
        if (err) {
          return res.status(422).send(err);
        } else {
          if (users.length === 1) {
            const token = jwt.sign({ users }, process.env.JWT_KEY, {
              expiresIn: "12h",
            });
            return response.loginSuccess(res, users, token);
          } else {
            return response.loginFailed(res);
          }
        }
    })

}

exports.loginAdmin = (req, res) => {
  let { username, password } = req.body;
  let loginUser = `SELECT * FROM users WHERE username=? AND password=? AND level=1`;
  conn.query(loginUser, [username, password], (err, users, field) => {
    if (err) {
      return res.status(422).send(err);
    } else {
      if (users.length === 1) {
        return response.loginSuccess(res, users);
      } else {
        return response.loginFailed(res);
      }
    }
  });
};
