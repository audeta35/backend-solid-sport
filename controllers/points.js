"use strict";
require('dotenv').config();

const response = require("../responses/index");
const conn = require("../config/database");

const FAC_ATHLETIC = 0.3;
const FAC_TECHNIC = 0.7;

exports.doPointsByUser = (req, res) => {
    let { userId, matchId, athleteId, techValue, athValue  } = req.body;

    if(!userId) {
        return response.falseRequirement(res, 'Id user');
    } else if(!matchId) {
        return response.falseRequirement(res, 'Id pertandingan');
    } else if(!techValue) {
        techValue = 0;
    } else if(!athleteId) {
        return response.falseRequirement(res, 'Id atlet');
    } else if(!athValue) {
        athValue = 0;
    }
    let qValidateUserPoint = `SELECT * FROM result WHERE id_atlet=?`;
    conn.query(qValidateUserPoint, [ athleteId ],
    (err, userPointList) => {
        if(err) {
            return res.status(422).send(err);
        }
        if(userPointList.length >= 7) {
            return response.invalid(res, 'Points');
        }
        // check if jury have done gave a point to user or not
        let qValidateJury = `SELECT * FROM result WHERE id_user=? AND id_match=? ORDER BY id_user ASC`;
        conn.query(qValidateJury, [ userId, matchId ],(err, juryList) => {
            if(err) {
                return res.status(422).send(err);
            }
            if(juryList.length > 0) {
                return response.invalid(res, 'have done gave a point.')
            } else {

                let query = `INSERT INTO result SET id_match=?, id_user=?, id_atlet=?, technical_result=?, athletic_result=?`;

                conn.query(query, [ matchId, userId, athleteId, techValue, athValue ], (err, result, field) => {
                    if(err) {
                        return res.status(422).send(err);
                    } else {
                        // validate if all jury have given a score
                        let qValidateResult = `SELECT * FROM result WHERE id_atlet=?`;
                        conn.query(qValidateResult, [ athleteId ], (err, athleteList, field) => {
                            if(err) {
                                return res.status(422).send(err);
                            }
                            // check if all jury have given a score, insert to table points
                            if(athleteList.length === 7) {
                                let originalAthleteList = [...athleteList];
                                let filterTechnicalResult = originalAthleteList.sort((a, b) => a.technical_result < b.technical_result);
                                let filterAthleticResult = athleteList.sort((a, b) => a.athletic_result < b.athletic_result);
                    
                                // insert value three on top to new array
                                const threeOnTop = [];
                    
                                for(let i in filterTechnicalResult) {
                                    if(i < 3) {
                                        threeOnTop.push({
                                            technical_result: filterTechnicalResult[i].technical_result,
                                            athletic_result: filterAthleticResult[i].athletic_result
                                        }) 
                                    }
                                }
                                // compare value from database with comparison
                                for(let i in athleteList) {
                                    for (let j in threeOnTop) {
                                        if(athleteList[i].technical_result === threeOnTop[j].technical_result) {
                                            athleteList[i].technical_result_status = 1;
                                        }
                                        if(athleteList[i].athletic_result === threeOnTop[j].athletic_result) {
                                            athleteList[i].athletic_result_status = 1;
                                        }
                                    }
                                }
                    
                                // calculate points for athlete
                                let technicalPoint = 0, 
                                    athleticPoint = 0,
                                    finalTechnicalResult = 0,
                                    finalAthleticResult = 0,
                    
                                    finalResult = 0;
                                for(let i in threeOnTop) {
                                    technicalPoint += threeOnTop[i].technical_result;
                                    athleticPoint += threeOnTop[i].athletic_result;
                    
                                    if(i == threeOnTop.length - 1) {
                                        finalTechnicalResult = technicalPoint * FAC_TECHNIC;
                                        finalAthleticResult = athleticPoint * FAC_ATHLETIC;
                    
                                        finalResult = (finalTechnicalResult + finalAthleticResult).toFixed(2);
                                        
                                        // insert to table points
                                        let qValidateInsertPoints = `SELECT *FROM points WHERE id_match=? AND id_atlet=?`;
                                        conn.query(qValidateInsertPoints, [ matchId, athleteId ],
                                        (err, pointValidateList) => {
                                            if(err) {
                                                return res.status(422).send(err);
                                            }
                                            if(pointValidateList.length > 0) {
                                                
                                                return response.success(res, 'This match has been assessment.')
                                            }
                                            let qInsertPoints = `INSERT INTO points SET id_match=?, total_point=?, id_atlet=?`;
                                            conn.query(qInsertPoints, [ matchId, finalResult, athleteId],
                                            (err, resultPoints) => {
                                                if(err) {
                                                    return res.status(422).send(err);
                                                }
                                                console.log(resultPoints)
                                                let qShowFinalResult = `SELECT * 
                                                                        FROM points AS p
                                                                        LEFT JOIN athlete AS a ON a.id_atlet = p.id_atlet 
                                                                        WHERE id_point=?`;
                                                conn.query(qShowFinalResult, [ resultPoints.insertId ],
                                                (err, pointList) => {
                                                    if(err) {
                                                        return res.status(422).send(err);
                                                    }
                                                    if(pointList.length < 1) {
                                                        return res.status(404).send({
                                                            status: 404,
                                                            message: 'Invalid id points'
                                                        })
                                                    }
                                                    console.log(pointList)
                                                    const boo = {
                                                        athlete_point_list: athleteList,
                                                        technical_point_result: technicalPoint,
                                                        athletic_point_result: athleticPoint,
                                                        total_point: pointList[0].total_point,
                                                        athlete_profile: pointList,
                                                        technical_point: finalTechnicalResult.toFixed(2),
                                                        athletic_point: finalAthleticResult.toFixed(2),
                                                    }
                                                    return response.success(res, boo)
                                                })
                                            })
                                        })
                                    }
                                }
                            } else if(athleteList.length > 7) {
                                return response.invalid(res, 'Points');
                            } else {
                                return response.success(res, athleteList)
                            }
                        })
                    }
                })
            }
        })
    })
}
exports.doPointByAdmin = (req, res) => {
    let { matchId, athleteId, adminPointList } = req.body;
    // console.log(req.body)
    if(!matchId) {
        return response.falseRequirement(res, 'Id pertandingan');
    } else if(adminPointList.length < 7) {
        return response.falseRequirement(res, 'Admin point list');
    } else if(!athleteId) {
        return response.falseRequirement(res, 'Id atlet');
    } else {
        // validate if jury already assessment
        let qValidateJury = `SELECT * FROM result WHERE id_user=? AND id_match=?`;

        let qInsertPoints = `INSERT INTO result 
                             SET id_match=?, id_user=?, id_atlet=?, technical_result=?, athletic_result=?
                            `;
        for(let i in adminPointList){
            const { userId, techValue, athValue } = adminPointList[i];
            if(!userId)  {
                console.log('= masuk yeah')
                response.falseRequirement(res, `Id juri ke-${ parseInt(i) + 1 }`);
                break;
            } else if(!techValue) {
                techValue = 0;
            } else if(!athValue) {
                athValue = 0;
            } else {
                if(parseInt(i) === adminPointList.length - 1) {                    
                    let counter = 0;
                    for(let j in adminPointList) {
                        const { userId, techValue, athValue } = adminPointList[j];
                        // validate jury assessment
                        conn.query(qValidateJury, [ userId, matchId], (err, juryList) => {
                            console.log(j, counter)
                            if(err) {
                                return res.status(422).send(err);
                            }
                            if(juryList.length > 0) {
                                console.log(`===============Juri ${ parseInt(j) + 1} sudah menilai `, counter);
                                if((parseInt(j) === adminPointList.length - 1) && counter === 0) {
                                    return response.invalid(res, 'assessment, cause all jury has been assessment')
                                } else if((parseInt(j) === adminPointList.length - 1) && counter > 0) {
                                    return res.status(200).send({
                                        message: 'OK',
                                        status: 200
                                    })
                                } 
                                console.log(`Jury ${ parseInt(j) + 1 } has been assessment before`);
                            } else {
                                console.log(`Juri ${ parseInt(j) + 1} belum menilai=============== `, counter);
                                counter ++;
                                conn.query(qInsertPoints, [ matchId, userId, athleteId, techValue, athValue ], (err, result) => {
                                    if(err) {
                                        return res.status(422).send(err);
                                    }
                                    console.log('berhasil insert', counter)
                                    if(parseInt(j) === adminPointList.length - 1) {
                                        console.log('masuk ke pojok')
                                        return res.status(200).send({
                                            message: 'OK',
                                            status: 200
                                        })
                                    }
                                })
                            }
                        })
                    }
                }
            }
        }
    }
}

exports.getPointForAdmin = (req, res) => {
    let { athleteId, matchId } = req.params;

    if(!athleteId) {
        return response.falseRequirement(res, 'Id atlet');
    } else if(!matchId) {
        return response.falseRequirement(res, 'Id pertandingan');
    } else {
        let query = 'SELECT * FROM result WHERE id_atlet=? AND id_match=?';
        conn.query(query, [ athleteId, matchId ], (err, resultList) => {
            if(err) {
                return res.status(422).send(err);
            }
            if(resultList.length < 1) {
                return response.notFound(res);
            }
            return response.success(res, resultList);
        })
    }
}

exports.getPointForScoreboard = (req, res) => {
    let { athleteId, matchId } = req.params;
    if(!athleteId) {
        return response.falseRequirement(res, 'Id atlet');
    } else if(!matchId) {
        return response.falseRequirement(res, 'Id pertandingan');
    } else {
        let qValidateResult = `SELECT * FROM result WHERE id_atlet=? AND id_match=? ORDER BY id_user ASC`;
        conn.query(qValidateResult, [ athleteId, matchId ], (err, athleteList, field) => {
            if(err) {
                return res.status(422).send(err);
            }
            // check if all jury have given a score, insert to table points
            if(athleteList.length === 7) {
                console.log('pertama', athleteList)
                let originalAthleteList = [...athleteList];
                let filterTechnicalResult = originalAthleteList.sort((a, b) => a.technical_result < b.technical_result);
                let filterAthleticResult = athleteList.sort((a, b) => a.athletic_result < b.athletic_result);
    
                // insert value three on top to new array
                const threeOnTop = [];
    
                for(let i in filterTechnicalResult) {
                    if(i < 3) {
                        threeOnTop.push({
                            technical_result: filterTechnicalResult[i].technical_result,
                            athletic_result: filterAthleticResult[i].athletic_result
                        }) 
                    }
                }
                // compare value from database with comparison
                for(let i in athleteList) {
                    for (let j in threeOnTop) {
                        if(athleteList[i].technical_result === threeOnTop[j].technical_result) {
                            athleteList[i].technical_result_status = 1;
                        }
                        if(athleteList[i].athletic_result === threeOnTop[j].athletic_result) {
                            athleteList[i].athletic_result_status = 1;
                        }
                    }
                }
    
                // calculate points for athlete
                let technicalPoint = 0, 
                    athleticPoint = 0,
                    finalTechnicalResult = 0,
                    finalAthleticResult = 0,
    
                    finalResult = 0;
                for(let i in threeOnTop) {
                    technicalPoint += threeOnTop[i].technical_result;
                    athleticPoint += threeOnTop[i].athletic_result;
    
                    if(i == threeOnTop.length - 1) {                        
                        finalTechnicalResult = technicalPoint * FAC_TECHNIC;
                        finalAthleticResult = athleticPoint * FAC_ATHLETIC;
    
                        finalResult = (finalTechnicalResult + finalAthleticResult).toFixed(2);
                        
                        // insert to table points
                        let qValidateInsertPoints = `SELECT *FROM points WHERE id_match=? AND id_atlet=?`;
                        conn.query(qValidateInsertPoints, [ matchId, athleteId ],
                        (err, pointValidateList) => {
                            if(err) {
                                return res.status(422).send(err);
                            }                         
                            if(pointValidateList.length > 0) {
                                let qShowFinalResult = `SELECT * 
                                                        FROM points AS p
                                                        LEFT JOIN athlete AS a ON a.id_atlet = p.id_atlet 
                                                        WHERE id_point=?`;
                                conn.query(qShowFinalResult, [ pointValidateList[0].id_point ],
                                (err, pointList) => {
                                    if(err) {
                                        return res.status(422).send(err);
                                    }
                                    let finalResult = {
                                        athlete_point_list: athleteList,
                                        technical_point_result: technicalPoint.toFixed(2),
                                        athletic_point_result: athleticPoint.toFixed(2),
                                        total_point: pointList[0].total_point,
                                        athlete_profile: pointList,
                                        technical_point: finalTechnicalResult.toFixed(2),
                                        athletic_point: finalAthleticResult.toFixed(2),
                                    }
                                    return response.success(res, finalResult)
                                })
                            } else {
                                let qInsertPoints = `INSERT INTO points SET id_match=?, total_point=?, id_atlet=?`;
                                conn.query(qInsertPoints, [ matchId, finalResult, athleteId],
                                (err, resultPoints) => {
                                    if(err) {
                                        return res.status(422).send(err);
                                    }
                                    console.log(resultPoints)
                                    let qShowFinalResult = `SELECT * 
                                                            FROM points AS p
                                                            LEFT JOIN athlete AS a ON a.id_atlet = p.id_atlet 
                                                            WHERE id_point=? `;
                                    conn.query(qShowFinalResult, [ resultPoints.insertId ],
                                    (err, pointList) => {
                                        if(err) {
                                            return res.status(422).send(err);
                                        }
                                        if(pointList.length < 1) {
                                            return res.status(404).send({
                                                status: 404,
                                                message: 'Invalid id points'
                                            })
                                        }
                                        
                                        athleteList =  athleteList.sort((a, b) => a.id_user > b.id_user);
                                        const result = {
                                            athlete_point_list: athleteList,
                                            technical_point: finalTechnicalResult.toFixed(2),
                                            athletic_point: finalAthleticResult.toFixed(2),
                                            technical_point_result: technicalPoint.toFixed(2),
                                            athletic_point_result: athleticPoint.toFixed(2),
                                            total_point: pointList[0].total_point,
                                            athlete_profile: pointList
                                        }
                                        response.success(res, result)
                                    })
                                })
                            }
                        })
                    }
                }
            } else if(athleteList.length > 7) {
                return response.invalid(res, 'Points');
            } else {
                return response.success(res, athleteList);
            }
        })
    }
}

exports.changeAthleteAssessment = (req, res) => {
    let { athleteId } = req.params;
    // update atlet status to have done matching
    let qUpdateAthleteStatus = `UPDATE athlete SET status=? WHERE id_atlet=?`;
    conn.query(qUpdateAthleteStatus, [ 2, athleteId ], (err, result) => {
        if(err) {
            return res.status(422).send(err);
        }
        if(result.affectedRows !== 1) {
            return response.invalid(res, 'Id atlet')
        }
        // after that, change athlete now to the next athlete
        let qSelectNext = "SELECT * FROM `match` LEFT JOIN athlete as a ON a.id_atlet = match.id_atlet WHERE match.status =? AND a.status=?";
        conn.query(qSelectNext, [1, 1], (err, matchList) => {
            if(err) {
                return res.status(422).send(err);
            }
            if(matchList.length < 1) {
                return response.notFound(res);
            }
            return response.success(res, matchList);
        })
    })
}