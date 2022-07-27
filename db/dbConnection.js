const mysql = require('mysql'); // module for mysql connection
const info = require('../config/db.json')

// array that contains connection with mysql db and success/failure information
let dbconnection = {
    init : function() { // connection to mysql
        return mysql.createConnection(info);
    },

    dbopen : function(connection) { // success/failure information of connection
        connection.connect((err) => {
            if (err) {  // connection failure
                console.error('mysql connection error : ' + err);
            } 
            else {  // connection success
                console.error('mysql connection success');
            }
        });
    }
};

module.exports = dbconnection;