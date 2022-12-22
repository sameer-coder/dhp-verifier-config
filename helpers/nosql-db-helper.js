/**
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 *  SPDX-Licence-Identifier: Apache 2.0
*/

const fs = require('fs');
const path = require('path');

const NoSqlDB = require('../nosql-db/nosql-db');
const { getErrorInfo } = require('./utils');

const fileName = process.env.NOSQL_DB_FILE_NAME || 'couchdb.js';

// placeholder so intellisense works
let instance = new NoSqlDB();

const init = async () => {
    const filePath = path.join(__dirname, '..', 'nosql-db', fileName);

    const db = require(filePath);
    const instantiatedDb = new db();
    instance = new NoSqlDB(instantiatedDb);
    await instance.init();
}

const getIdFromDocID = (_idValue) => {
    let splits = _idValue.split(";v=");
    if(!splits)
        return _idValue;

    if(splits.length == 2)
        return splits[0];
}

const stringifyIdVersion = (id, version) => {
    return `${id};v=${version}`;
}

const removeUnderscores = (doc) => {
    const docCopy = JSON.parse(JSON.stringify(doc));
    docCopy.id = getIdFromDocID(doc._id);
    //docCopy.rev = doc._rev;
    delete docCopy._id;
    delete docCopy._rev;
    return docCopy;
}

const addUnderscores = (doc) => {
    const docCopy = JSON.parse(JSON.stringify(doc));
    docCopy._id = stringifyIdVersion(doc.id, doc.version);
    //docCopy._id = doc.id;
    //docCopy._rev = doc.rev;
    delete docCopy.id;
    delete docCopy.rev;
    return docCopy;
}

const verifyDoc = (doc) => {
    if (!doc.id) {
        const error = new Error('Document is missing id');
        error.status = 400;
        throw error;
    }
}

const handleError = (err, method, docID) => {
    const { errorStatus, errorMsg } = getErrorInfo(err);
    const error = new Error(`Method: ${method}; Doc ID: ${docID}; Error: ${errorMsg}`);
    error.status = errorStatus;
    throw error;
}

const getInstance = () => {
    return instance;
}

module.exports = {
    init,
    removeUnderscores,
    addUnderscores,
    stringifyIdVersion,
    verifyDoc,
    handleError,
    getInstance,
}
