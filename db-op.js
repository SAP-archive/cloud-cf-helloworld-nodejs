'use strict';

function getAll(db,res) {
    const query = 'SELECT * FROM Users';
    db.manyOrNone(query)
        .then(function(data) {
            // success;
            res.status(200).json(data);
        })
        .catch(function(error) {
            // error;
            // console.log(error);
            res.status(500);
            res.end('Error accessing DB: ' + JSON.stringify(error));
        });
}

function getOne(db,res,id) {

    db.one({
        name: 'find-user',
        text: 'SELECT * FROM Users WHERE id = $1',
        values: [id]
    })
        .then(user => {
            res.status(200).json(user);
        })
        .catch(error => {
            res.status(500);
            res.end('Error accessing DB: ' + JSON.stringify(error));
        });
}

function insertOne(db,res,newData) {
    db.one({
        name: 'insert-user',
        text: 'INSERT INTO Users(name,color,material) values($1,$2,$3) RETURNING *',
        values: [newData.name, newData.color, newData.material]
    })
        .then(data => {
            res.status(201).json(data);
        })
        .catch(error => {
            res.status(500);
            res.end('Error accessing DB: ' + JSON.stringify(error));
        });
}

function modifyOne(db,res,id,newData) {
    db.one({
        name: 'update-user',
        text: 'UPDATE Users set name = $1, color = $2, material = $3 WHERE id = $4 RETURNING *',
        values: [newData.name, newData.color, newData.material, id]
    })
        .then(data => {
            res.status(200).json(data);
        })
        .catch(error => {
            res.status(500);
            res.end('Error accessing DB: ' + JSON.stringify(error));
        });
}

function deleteOne(db,res,id) {
    db.result({
        name: 'delete-user',
        text: 'DELETE FROM Users WHERE id = $1',
        values: [id]
    })
        .then(function() {
            res.status(200).end('OK');
        })
        .catch(error => {
            res.status(500);
            res.end('Error accessing DB: ' + JSON.stringify(error));
        });
}

module.exports = {
    getAll: getAll,
    getOne: getOne,
    insertOne: insertOne,
    modifyOne: modifyOne,
    deleteOne: deleteOne
};
