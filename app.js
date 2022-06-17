const express = require('express');
const app = express();
const upload = require('express-fileupload');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload());
app.use(express.static("./src/uploads"));

app.use('/api/v1', require('./src/routes'));

module.exports = app;