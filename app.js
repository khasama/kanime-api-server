const express = require('express');
const app = express();
const upload = require('express-fileupload');
const cors = require('cors');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload());
app.use(cors({
    origin: "http://127.0.0.1:5500"
}));
app.use("/public/anime", express.static("./src/uploads/anime"));

app.use('/api/v1', require('./src/routes'));

module.exports = app;