const mysql = require('mysql');

const conn = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "solidsport"
})

if(!conn) {
    console.log('error : ', conn);
}

module.exports = conn;