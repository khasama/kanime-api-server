require('dotenv').config();
const mysql = require("mysql2");


const pool = mysql.createPool({
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASS || '',
    database: process.env.MYSQL_DB || 'kanime',
    connectionLimit: 10
});

module.exports = pool;