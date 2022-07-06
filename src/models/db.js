require('dotenv').config();
const mysql = require("mysql2");
let pool, promisePool;
try {
    pool = mysql.createPool({
        host: process.env.MYSQL_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASS || '',
        database: process.env.MYSQL_DB || 'kanime',
        connectionLimit: 10
    });
    promisePool = pool.promise();
} catch (error) {
    console.log(error.message)
}

module.exports = promisePool;