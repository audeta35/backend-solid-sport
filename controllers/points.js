"use strict";
require('dotenv').config();

const response = require("../responses/index");
const conn = require("../config/database");

const FAC_ATHLETIC = 0*3;
const FAC_TECHNIC = 0.7;

exports.doPointsByUser = (req, res) => {
    let { userId, matchId, athleteId, techValue, athValue  } = req.body;

    if(!userId) {
        return response.falseRequirement(res, 'Id user');
    } else if(!matchId) {
        return response.falseRequirement(res, 'Id pertandingan');
    } else if(!techValue) {
        return response.falseRequirement(res, 'Penilaian teknik');
    } else if(!athleteId) {
        return response.falseRequirement(res, 'Id atlet');
    } else if(!athValue) {
        return response.falseRequirement(res, 'Penilaian atletik');
    } else {
        let query = `INSERT INTO result SET id_match=?, id_user=?, id_atlet=?, technical_result=?, athletic_result=?`;

        conn.query(query, [ matchId, userId, athleteId, techValue, athValue ], (err, result, field) => {
            if(err) {
                return res.status(422).send(err);
            } else {
                // validate if all jury have given a score
                qValidateResult = `SELECT id_atlet FROM result WHERE id_atlet=? ORDER BY `;
                conn.query(qValidateResult, [ athleteId ], (err, athleteList, field) => {
                    if(err) {
                        return res.status(422).send(err);
                    }
                    // check if all jury have given a score, insert to table points
                    if(athleteList.length === 7) {
                        console.log(athleteList)
                        // qInsertPoints = `INSERT INTO points id_result=?, total_point=?, id_atlet=?`;

                        // conn.query(qInsertPoints, [  ])
                    } else {
                        return response.success(res, result)
                    }
                })
            }
        })
    }
}

