const mysql = require('mysql');

if(process.env.NODE_ENV === 'production') {
    var conn = mysql.createPool({
        host    : process.env.DB_HOST,
        user    : process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME 
    });
} else {
    var conn = mysql.createPool({
        host: "localhost",
        user: "root",
        password: "",
        database: "solidsport"
    })
}

if(!conn) {
    console.log('error : ', conn);
}

module.exports = conn;