const express = require('express');
const app = express();
const upload = require('express-fileupload');
const cors = require('cors');
const createError = require('http-errors');
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true }));
app.use(upload());
app.use(cors({
    origin: "*"
}));
// app.use("/public/anime", express.static("./src/uploads/anime"));

app.use('/api/v1', require('./src/routes'));

app.use((req, res, next) => {
    next(createError.NotFound());
});
app.use((err, req, res, next) => {
    return res.json({
        status: err.status || 500,
        message: err.message
    });
});

module.exports = app;