const express = require('express');
const app = express();
const upload = require('express-fileupload');
const cors = require('cors');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(upload());
app.use(cors({
    origin: ["http://192.168.1.7:8080", "http://localhost:8080"],
    credentials: true
}));

// app.use("/public/anime", express.static("./src/uploads/anime"));

app.use('/api/v1', require('./src/routes'));

app.use((req, res, next) => {
    next(createError.NotFound());
});
app.use((err, req, res, next) => {
    return res.status(err.status).json({
        status: "Error",
        message: err.message
    });
    
});

module.exports = app;