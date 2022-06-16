const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/v1', require('./src/routes'));

module.exports = app;