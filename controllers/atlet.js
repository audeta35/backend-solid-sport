"use strict";

const response = require("../responses/index");
const conn = require("../config/database");
const multer = require('multer');
const csv = require('csvtojson')
const path = require('path');

require('dotenv').config();

// UPLOAD FOR ADD USER WITH IMPORT CSV
const storageCSV = multer.diskStorage({
destination: (req, res, callback) => {
    callback(null, 'uploads');
},
filename: (req, file, callback) => {
    callback(null, file.originalname);
}
});

let uploadCSV = multer({ 
storage: storageCSV ,
fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if(ext !== '.csv' && ext !== '.xlsx') {
    req.fileValidationError= 'goes wrong on the mimetype';
        return callback(null, false, new Error('File must be CSV or XLSX format mimtype'))
    }
    callback(null, true)
}
}).single('file');

exports.getGroup = (req, res) => {
    let query = "SELECT * FROM groups";
    conn.query(query, [], (err, result, field) => {
        if(!err) {
            response.success(res, result);
        } else {
            res.status(422).send(err);
        }
    })
}

exports.getAtletRank = (req, res) => {
    let { id } = req.params;
    let query =
      "SELECT * FROM points JOIN athlete ON points.id_atlet = athlete.id_atlet JOIN groups ON athlete.grouping = groups.group_name WHERE groups.id = ? ORDER BY points.total_point DESC LIMIT 4";

    conn.query(query, [id], (err, result, field) => {
        if (!err) {
          response.success(res, result);
        } else {
          res.status(422).send(err);
        }
    })
}

exports.addAtletHth = (req, res) => {
    let {payload} = req.body;
    let keys = Object.keys(payload);
    let value = [];
    let add = `INSERT INTO athlete (atlet_name, kontingen, class, kata_name, grouping, attribute, status) VALUES ?`;

    payload.map((pay) => {
        keys.map((key) => {
            value.push([
                payload[key].name,
                payload[key].kontingen,
                "none",
                payload[key].kata,
                payload[key].group,
                payload[key].attribute,
                0
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
    let addAtlet = `INSERT INTO athlete (atlet_name, kontingen, class, kata_name, grouping, attribute, status) VALUES ?`;
    let getGroup = 'SELECT * from groups';

    keys.map((key) => {
      value.push([
        payload[key].name,
        payload[key].kontingen,
        payload[key].class,
        payload[key].kata,
        payload[key].group,
        payload[key].attribute,
        0
      ]);
    });

    conn.query(addAtlet, [value], (err, result1, field) => {
        if(!err) {
            conn.query(getGroup, [], (err2, result2, field) => {
            if (!err2) {
                kiys.map((kuy) => {
                    if (!result2[kuy]) {
                        value2.push([group[kuy].name]);
                    }
                });

                if(value2.length) {
                    conn.query(addGroup, [value2], (err3, result3, field) => {
                        if(!err3) {
                            response.success(res, result3);
                        } else {
                            res.status(422).send(err3);   
                        }
                    })
                } else {
                    response.success(res, result2);
                }

            } else {
                res.status(422).send(err2);
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
                } else if(result2) {
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

exports.getAtletByMatch = (req, res) => {

    let query = "SELECT * FROM `match` LEFT JOIN athlete as a ON a.id_atlet = match.id_atlet WHERE match.status = 1 AND a.status=1";
    conn.query(query, (err, matchList) => {
        if(err) {
            return res.status(422).send(err);
        }
        if(matchList.length < 1) {
            return response.notFound(res);
        }
        return response.success(res, matchList);
    })
}

exports.importGrouping = (req, res) => {
    uploadCSV(req, res, (err) => {
        if(err) {
            return res.end('Error uploading file');
        }

        const file = req.file;
        if(!file) {
            return response.falseRequirement(res, 'File');
        } else {
            let filename = file.originalname;
            let filePath = './uploads/'+ filename;

            csv()
            .fromFile(filePath)
            .then((data)=>{
                for(let i in data) {
                    const result = data[i];

                    let query = `INSERT INTO athlete SET atlet_name=?, kontingen=?, class=?, kata_name=?, grouping=?, attribute=?, status=?`;
                    conn.query(query, [result['nama atlet'], result.kontingen, result.kelas, result['nama kata'], result.grup, result.atribut, 0],
                    (err, result) => {
                        if(err) {
                            return res.status(422).send(err);
                        }
                        if(i == data.length - 1) {
                            let qSelectAthlete = `SELECT *FROM athlete`;
                            conn.query(qSelectAthlete, (err, athleteList) => {
                                if(err) {
                                    return res.status(422).send(err);
                                }
                                return response.success(res, athleteList);
                            })
                        }                        
                    })
                }
            })
        }
    })
}

exports.deteleAtlet = (req, res) => {
    let { id } = req.params;
    let query = "DELETE FROM athlete WHERE id_atlet=?";
    let query2 = "DELETE FROM `match` WHERE id_atlet=?";

    conn.query(query, [id], (err, result, field) => {
        if(!err) {
            conn.query(query2, [id], (err2, result2, field2) => {
                if (!err2) {
                  response.success(res, result2);
                } else {
                  res.status(422).send(err2);
                }
            })
        } else {
            res.status(422).send(err);
        }
    })
}

exports.deteleGroup = (req, res) => {
  let { id } = req.params;
  let query = "DELETE FROM `groups` WHERE id=?";
  let query2 = "DELETE FROM athlete";
  let query3 = "DELETE FROM `match`";

  conn.query(query, [id], (err, result, field) => {
    if (!err) {
      conn.query(query2, [], (err2, result2, field2) => {
          if (!err2) {
            conn.query(query3, [], (err3, result3, field3) => {
                if (!err3) {
                  response.success(res, result3);
                } else {
                  res.status(422).send(err3);
                }
            })
          } else {
            res.status(422).send(err2);
          }
      })
    } else {
      res.status(422).send(err);
    }
  });
};