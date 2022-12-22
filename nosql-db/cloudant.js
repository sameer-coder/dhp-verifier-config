/**
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 *  SPDX-Licence-Identifier: Apache 2.0
*/

// TODO: partition containers

const CloudantLib = require('@cloudant/cloudant');

const NoSqlDB = require('./nosql-db');
const constants = require('../helpers/constants');
const dbHelper = require('../helpers/nosql-db-helper');
const { getErrorInfo } = require('../helpers/utils');
const Logger = require('../config/logger');

const logger = new Logger('cloudant-db');


const cloudantIamKey = process.env.CLOUDANT_IAM_KEY;
const cloudantUrl = process.env.CLOUDANT_URL;

const verConfigDbName = constants.NOSQL_CONTAINER_ID.VERIFIER_CONFIGURATIONS_ENTITY

const options = {
    url: cloudantUrl,
    maxAttempt: 0,
    plugins: [
        {
            iamauth: { iamApiKey: cloudantIamKey },
        },
    ],
}

class Cloudant extends NoSqlDB {
    async init() {
        this.verifyEnvtVar();

        try {
            this.cloudant = await CloudantLib(options);
            const dbList = await this.cloudant.db.list();
            await this.createDb(verConfigDbName, dbList, false);
            /* await this.createDb(schemaDbName, dbList, false);
            */
        } catch(err) {
            const { errorMsg } = getErrorInfo(error);
            logger.error(`Unable to initialize Cloudant: ${errorMsg}`);
            throw err;
        }
    }

    async getDoc(dbName, docID) {
        logger.info(`getDoc ${docID} from ${dbName} database`);
        
        try {
            const response = await this.cloudant.use(dbName).get(docID);
            return dbHelper.removeUnderscores(response);
        } catch(err) {
            dbHelper.handleError(err, 'getDoc', docID);
        }
    };

    async getAllDocs(dbName, limit, skip) {
        logger.info(`getAllDocs from ${dbName} database`);
        
        const options = {
            include_docs: true,
            limit,
            skip,
            descending: false
        }

        try {
            const response = await this.cloudant.use(dbName).list(options);
            return {
                total_rows: response.rows.length,
                limit,
                skip,
                rows: response.rows,
            };
        } catch(err) {
            const { errorStatus, errorMsg } = getErrorInfo(err);
            const error = new Error(`Method: getAllDocs; Error: ${errorMsg}`);
            error.status = errorStatus;
            throw error;
        }
    }

    
    

    async writeDoc(dbName, doc) {
        logger.info(`writeDoc ${doc.id} to ${dbName} database`);
        this.verifyDoc(doc);
        
        try {
            const response = await this.cloudant.use(dbName)
                .insert(dbHelper.addUnderscores(doc));
            return response;
        } catch(err) {
            dbHelper.handleError(err, 'writeDoc', doc.id);
        }
    };
    
    async putDoc (dbName, doc) {
        logger.info(`putDoc ${doc.id} from ${dbName} database`);
        this.verifyDoc(doc);

        if (!doc.rev) {
            const error = new Error('Document is missing rev');
            error.status = 400;
            throw error;
        }

        try {
            const response = await this.cloudant.use(dbName)
                .insert(dbHelper.addUnderscores(doc));
            return response;
        } catch(err) {
            dbHelper.handleError(err, 'putDoc', doc.id);
        }
    };
    
    async deleteDocWithRev(dbName, docID, docRev) {
        logger.info(
            `deleteDoc with id ${docID} and rev ${docRev} from ${dbName} database`
        );

        return await this.cloudant.use(dbName).destroy(docID, docRev);
    }

    async deleteDocWithoutRev(dbName, docID) {
        logger.info(
            `deleteDoc with id ${docID} from ${dbName} database`
        );

        const doc = await this.getDoc(dbName, docID);
        const docRev = doc.rev;

        return await this.cloudant.use(dbName).destroy(docID, docRev);
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
                const err = new Error(`Document not found`);
                err.status = 404;
                throw err;
            }
            dbHelper.handleError(err, 'deleteDoc', docID);
        }
    };
    
    async sanitizeDoc(doc) {
        return doc;
    }

    verifyDoc(doc) {
        if (!doc.id) {
            const error = new Error('Document is missing id');
            error.status = 400;
            throw error;
        }
    }

    verifyEnvtVar() {
        const missing = [];
        if (!cloudantIamKey) {
            missing.push('CLOUDANT_IAM_KEY');
        }
        if (!cloudantUrl) {
            missing.push('CLOUDANT_URL');
        }

        if (missing.length > 0) {
            throw new Error(
                `Missing environmental variables for Cloudant: ${missing}`
            );
        }
    }

    async createDb(dbName, dbList, partitioned) {
        if (dbList.includes(dbName)) {
            console.log(`Cloudant database ${dbName} already exists`);
            return;
        }
        console.log(`Creating Cloudant database ${dbName}`);
        await this.cloudant.db.create(dbName, { partitioned });
        console.log(`Successfully created Cloudant database ${dbName}`);
    }

    handleError(err, method, docID) {
        const { errorStatus, errorMsg } = getErrorInfo(err);
        const error = new Error(`Method: ${method}; Doc ID: ${docID}; Error: ${errorMsg}`);
        error.status = errorStatus;
        throw error;
    }
}

module.exports = Cloudant;
