'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const xssec = require('@sap/xssec');
const JWTStrategy = require('@sap/xssec').JWTStrategy;
const xsenv = require('@sap/xsenv');

const dbConn = require('./db-conn');
const dbOp = require('./db-op');

var _db = undefined;


function log(logTxt) {
    console.log(logTxt);
}

function logJWT(req) {
    var jwt = req.header('authorization');
    if (!jwt) {
        log('No JWT in Request - Call performed directly to App');
        return;
    }
    jwt = jwt.substring('Bearer '.length);
    log('JWT is: ' + jwt);
    xssec.createSecurityContext(jwt, xsenv.getServices({ uaa: 'sapcpcfhw-uaa' }).uaa, function(error, securityContext) {
        if (error) {
            log('Security Context creation failed');
            return;
        }
        log('Security Context created successfully');
        var userInfo = {
            logonName : securityContext.getLogonName(),
            giveName :  securityContext.getGivenName(),
            familyName : securityContext.getFamilyName(),
            email : securityContext.getEmail()
        };
        log('User Info retrieved successfully ' + JSON.stringify(userInfo));
    });

    if (req.user) {
        var myUser = JSON.stringify(req.user);
        var myUserAuth = JSON.stringify(req.authInfo);
        log('2nd. XsSec API - user: ' + myUser + ' Security Context: ' + myUserAuth);
    }
    // see it using: cf logs sapcpcfhw --recent
}

const url = '/users';

const app = express();
app.use(bodyParser.json());

passport.use(new JWTStrategy(xsenv.getServices({uaa:{tag:'xsuaa'}}).uaa));
app.use(passport.initialize());
app.use(passport.authenticate('JWT', { session: false }));

app.get(url, function (req, res) {
    // logJWT(req);
    dbOp.getAll(_db,res);
});

app.get(url + '/:id', function (req, res) {
    if (!req.authInfo.checkLocalScope('Update')) {
        log('Missing the expected scope');
        res.status(403).end('Forbidden');
        return;
    }
    dbOp.getOne(_db, res, req.params.id);
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
