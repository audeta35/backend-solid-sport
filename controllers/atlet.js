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

                    let query = `INSERT INTO athlete SET atlet_name=?, kontingen=?, class=?, kata_name=?, grouping=?, attribute=?`;
                    conn.query(query, [result['nama atlet'], result.kontingen, result.kelas, result['nama kata'], result.grup, result.atribut],
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