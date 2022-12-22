/**
 * (c) Copyright Merative US L.P. and others 2020-2022
 *
 *  SPDX-Licence-Identifier: Apache 2.0
*/

// TODO: partition containers

const nano = require('nano');

const NoSqlDB = require('./nosql-db');
const constants = require('../helpers/constants');
const dbHelper = require('../helpers/nosql-db-helper');
const { getErrorInfo } = require('../helpers/utils');
const Logger = require('../config/logger');

const logger = new Logger('couchdb');

const couch = nano(process.env.COUCHDB_URL);


let verConfigDB, masterDataDB, displayDB, specificationConfigDB ;
let ruleDB, ruleSetDB, trustListDB, valueSetDB, classifierRuleDB ;


const getDB = (dbName) => {
    const throwError = () => {
        const error = new Error(`Unknown database id ${dbName}`);
        error.status = 500;
        throw error;
    }
    

    switch (dbName) {
        case constants.NOSQL_CONTAINER_ID.VERIFIER_CONFIGURATIONS_ENTITY:
            return verConfigDB;
        case constants.NOSQL_CONTAINER_ID.MASTER_DATA_ENTITY:
            return masterDataDB;                
        case constants.NOSQL_CONTAINER_ID.DISPLAY:
            return displayDB;    
        case constants.NOSQL_CONTAINER_ID.SPECIFICATION_CONFIG_ENTITY:
            return specificationConfigDB;                                                        
        case constants.NOSQL_CONTAINER_ID.RULE:
            return ruleDB;                    
        case constants.NOSQL_CONTAINER_ID.RULE_SET:
            return ruleSetDB;    
        case constants.NOSQL_CONTAINER_ID.VALUE_SET_ENTITY:
            return valueSetDB;                    
        
        case constants.NOSQL_CONTAINER_ID.CLASSIFIER_RULE_ENTITY:
            return classifierRuleDB;                
        case constants.NOSQL_CONTAINER_ID.TRUST_LIST_ENTITY:
            return trustListDB;
        default:
            return throwError();        
        
    }
}

const createDb = async (dbName, dbList, partitioned) => {
    if (dbList.includes(dbName)) {
        logger.info(`CouchDB ${dbName} already exists`);
    } else {
        await couch.db.create(dbName, { partitioned });
        logger.info(`Successfully created CouchDB ${dbName}`);
    }
    return couch.use(dbName);
}

class CouchDB extends NoSqlDB {
    // eslint-disable-next-line class-methods-use-this
    async init() {
        try {
            const dbList = await couch.db.list();
            
            verConfigDB = await createDb(constants.NOSQL_CONTAINER_ID.VERIFIER_CONFIGURATIONS_ENTITY, dbList, false);
            ruleDB = await createDb(constants.NOSQL_CONTAINER_ID.RULE, dbList, false);
            ruleSetDB = await createDb(constants.NOSQL_CONTAINER_ID.RULE_SET, dbList, false);
            
            valueSetDB = await createDb(constants.NOSQL_CONTAINER_ID.VALUE_SET_ENTITY, dbList, false);
            masterDataDB = await createDb(constants.NOSQL_CONTAINER_ID.MASTER_DATA_ENTITY, dbList, false);
            displayDB = await createDb(constants.NOSQL_CONTAINER_ID.DISPLAY, dbList, false);

            classifierRuleDB = await createDb(constants.NOSQL_CONTAINER_ID.CLASSIFIER_RULE_ENTITY, dbList, false);
            trustListDB = await createDb(constants.NOSQL_CONTAINER_ID.TRUST_LIST_ENTITY, dbList, false);
            specificationConfigDB = await createDb(constants.NOSQL_CONTAINER_ID.SPECIFICATION_CONFIG_ENTITY, dbList, false);
        } catch(err) {
            const { errorMsg } = getErrorInfo(err);
            logger.error(`Unable to initialize CouchDB: ${errorMsg}`);
            throw err;
        }
    }

    // eslint-disable-next-line class-methods-use-this
    async getDoc(dbName, id, version) {
        let docID = dbHelper.stringifyIdVersion(id, version);
        logger.debug(`getDoc ${docID} from ${dbName} database`);
        
        const db = getDB(dbName);

        try {
            const response = await db.get(docID);
            return dbHelper.removeUnderscores(response);
        } catch(err) {
            return dbHelper.handleError(err, 'getDoc', docID);
        }
    };

    // eslint-disable-next-line class-methods-use-this
    async getAllDocs(dbName, limit, skip) {
        logger.info(`getAllDocs from ${dbName} database`);
        const db = getDB(dbName);

        const options = {
            include_docs: true,
            limit,
            skip,
            descending: false
        }

        try {
            const response = await db.list(options);
            return {
                total_rows: response.rows.length,
                limit,
                skip,
                payload: response.rows,
            };
        } catch(err) {
            const { errorStatus, errorMsg } = getErrorInfo(err);
            const error = new Error(`Method: getAllDocs; Error: ${errorMsg}`);
            error.status = errorStatus;
            throw error;
        }
    }


    
    // eslint-disable-next-line class-methods-use-this
    async writeDoc(dbName, doc) {
        logger.info(`writeDoc ${doc.id} ${doc.version} to ${dbName} database`);
        dbHelper.verifyDoc(doc);

        const db = getDB(dbName);

        try {
            const response = await db.insert(dbHelper.addUnderscores(doc));
            return doc;
        } catch(err) {
            return dbHelper.handleError(err, 'writeDoc', doc.id);
        }
    };
    
    // eslint-disable-next-line class-methods-use-this
    async putDoc (dbName, doc) {
        logger.info(`putDoc ${doc.id} from ${dbName} database`);
        dbHelper.verifyDoc(doc);
        if (!doc.rev) {
            const error = new Error('Document is missing rev');
            error.status = 400;
            throw error;
        }

        const db = getDB(dbName);

        try {
            const response = await db.insert(dbHelper.addUnderscores(doc));
            return response;
        } catch(err) {
            return dbHelper.handleError(err, 'putDoc', doc.id);
        }
    };
    
    // eslint-disable-next-line class-methods-use-this
    async deleteDocWithRev(dbName, docID, docRev) {
        logger.info(
            `deleteDoc with id ${docID} and rev ${docRev} from ${dbName} database`
        );

        const db = getDB(dbName);

        return db.destroy(docID, docRev);
    }

    async deleteDocWithoutRev(dbName, docID) {
        logger.info(
            `deleteDoc with id ${docID} from ${dbName} database`
        );

        const db = getDB(dbName);

        const doc = await this.getDoc(dbName, docID);
        const docRev = doc.rev;

        return db.destroy(docID, docRev);
    }

    async deleteDoc (dbName, docID, docRev) {
        try {
            if (docRev) {
                return await this.deleteDocWithRev(dbName, docID, docRev);
            }
            return await this.deleteDocWithoutRev(dbName, docID);
        } catch(err) {
            const { errorStatus } = getErrorInfo(err);
            if (errorStatus === 404) {
                const error = new Error(`Document not found`);
                error.status = 404;
                throw error;
            }
            return dbHelper.handleError(err, 'deleteDoc', docID);
        }
    };
    
    // eslint-disable-next-line class-methods-use-this
    async sanitizeDoc(doc) {
        delete doc.rev;
        return doc;
    }
}

module.exports = CouchDB;
