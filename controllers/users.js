"use strict";
require('dotenv').config();

const response = require("../responses/index");
const conn = require("../config/database");
const jwt = require("jsonwebtoken");

exports.getAllUsers = (req, res) => {
    let {level} = req.body;
    let getUser = `SELECT * FROM users WHERE level=?`;
    conn.query(getUser, [level], (err, users, field) => {
        if(!err) {
            response.success(res, users);
        } else {
            res.status(422).send(err);
        }
    })
};

exports.addAllUsers = (req, res) => {
  let {username, password, position, tatami, level} = req.body;
  let status = "offline";
  let addUser = `INSERT INTO users SET token="", tatami=?, name=?, username=?, password=?, level=?, status=?`

  conn.query(addUser, [tatami, position, username, password, level, status], (err, result, field) => {
    if(err) { return res.status(422).send(err) }
    else {
      response.success(res, result);
    }
  })
}

exports.editUser = (req, res) => {
  let { username, position, tatami, id } = req.body;
  let editQuery = `UPDATE users SET username=?, name=?, tatami=? WHERE id_user=?`;

  conn.query(editQuery, [username, position, tatami, id], (err, result, field) => {
    if (err) { return res.status(422).send(err) }
    else {
      response.success(res, result);
    }
  })
}

exports.deleteUser = (req, res) => {
  let {id} = req.params;
  let deleteQuery = `DELETE FROM users WHERE id_user=?`;

  conn.query(deleteQuery, [id], (err, result, field) => {
    if(err) { return res.status(422).send(err) }
    else {
      response.success(res, result);
    }
  })
  
}

exports.loginUsers = (req, res) => {
    let {username, password} = req.body;
    let loginUser = `SELECT * FROM users WHERE username=? AND password=? AND level=0`;
    conn.query(loginUser, [username, password], (err, users, field) => {
        if (err) {
          return res.status(422).send(err);
        } else {
          if (users.length === 1) {
            let updateStatus = `UPDATE users SET status=?, token=? WHERE id_user=?`;
            let status = "online";
            let id_user = users[0].id_user;
            const token = jwt.sign({ users }, process.env.JWT_KEY, {
              expiresIn: "12h",
            });
            conn.query(updateStatus, [status, token, id_user],(err, result, field) => {
              if(err) {
                return res.status(422).send(err);
              }
              else {
                conn.query(loginUser, [username, password], (err, users, field) => {
                  if(err) {
                    res.status(422).send(err);
                  }
                  else {
                    return response.loginSuccess(res, users, token);
                  }
                })
              }
            })
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
        let updateStatus = `UPDATE users SET status=?, token=? WHERE id_user=?`;
        let status = "online";
        let id_user = users[0].id_user;
        const token = jwt.sign({ users }, process.env.JWT_KEY, {
          expiresIn: "12h",
        });
        conn.query(
          updateStatus,
          [status, token, id_user],
          (err, result, field) => {
            if (err) {
              return res.status(422).send(err);
            } else {
              conn.query(
                loginUser,
                [username, password],
                (err, users, field) => {
                  if (err) {
                    res.status(422).send(err);
                  } else {
                    return response.loginSuccess(res, users, token);
                  }
                }
              );
            }
          }
        );
      } else {
        return response.loginFailed(res);
      }
    }
  });
};

exports.logOut = (req, res) => {
  let { id_user } = req.body;
  let status = "offline";
  let logout = `UPDATE users SET token="", status=? WHERE id_user=?`;
  conn.query(logout, [status, id_user], (err, result, field) => {
    if(err) {
      return res.status(422).send(err);
    } 
    else if(result) {
      return response.success(res, result);
    }
  })
}
