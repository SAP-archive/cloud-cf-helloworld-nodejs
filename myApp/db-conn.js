'use strict';
const xsenv = require('@sap/xsenv');

const createTable =
    'CREATE TABLE IF NOT EXISTS Users \
        ( \
            id serial, \
            name varchar(100), \
            color varchar(100), \
            material varchar(100), \
            PRIMARY KEY (id) \
        )';

// const dropTable = 'DROP TABLE Users'; // eslint-disable-line no-unused-vars
// const insertRow = "INSERT INTO users(name,color,material) values('SpongeBob','yellow','sponge')"; // eslint-disable-line no-unused-vars

function returnUriToDB() {
    var uri = '';
    // xsenv.loadEnv();
    // console.log(xsenv.readCFServices());
    uri = xsenv.cfServiceCredentials('sapcpcfhw-db').uri;
    return uri;
}

function getDB(cb) {
    let pgp = require('pg-promise')({
        // Initialization Options
    });
    var db = pgp(returnUriToDB());
    let sql = createTable;
    db.query(sql)
        .then(function () {
            console.log('database initialized');
            cb(null, db);
            return;
        })
        .catch((err) => {
            console.log(err);
            cb(err, null);
            return;
        });
}

module.exports = {
    getDB: getDB
};

