'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const dbConn = require('./db-conn');
const dbOp = require('./db-op');

var _db = undefined;


function log(logTxt) {
    console.log(logTxt);
}

const url = '/users';

const app = express();
app.use(bodyParser.json());

app.get(url, function (req, res) {
    dbOp.getAll(_db, res);
});

app.get(url + '/:id', function (req, res) {
    dbOp.getOne(_db,res, req.params.id);
});

app.post(url, function (req, res) {
    dbOp.insertOne(_db, res, req.body);
});

app.put(url + '/:id', function (req, res) {
    dbOp.modifyOne(_db, res, req.params.id, req.body);
});

app.delete(url + '/:id', function (req, res) {
    dbOp.deleteOne(_db, res, req.params.id);
});

function setDBCallback(error, db) {
    if (error !== null) {
        log('error when fetching the DB connection ' + JSON.stringify(error));
        return;
    }
    _db = db;
}

var PORT = process.env.PORT || 8088;

var server = app.listen(PORT, function () {

    const host = server.address().address;
    const port = server.address().port;

    log('Example app listening at http://' + host + ':' + port);

    dbConn.getDB(setDBCallback);

});
