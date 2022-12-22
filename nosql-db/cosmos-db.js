/**
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 *  SPDX-Licence-Identifier: Apache 2.0
*/

// TODO: partition containers

const {CosmosClient} = require('@azure/cosmos');

const NoSqlDB = require('./nosql-db');
const constants = require('../helpers/constants');
const { getErrorInfo } = require('../helpers/utils');

const Logger = require('../config/logger');

const logger = new Logger('cosmos-db');

const endpoint = process.env.COSMOS_DB_URL;
const key = process.env.COSMOS_DB_KEY;
const databaseId = process.env.COSMOS_DB_ID;


const client = new CosmosClient({ endpoint, key });
let verConfigContainer;
let ruleContainer, ruleSetContainer;
// todo


class CosmosDB extends NoSqlDB {
    async init() {
        this.validateEnvVars();
        logger.info(`Creating Cosmos DB ${databaseId}`);

        try {
            await client.databases.createIfNotExists({
                id: databaseId
            }).database;
            logger.info(`Created Cosmos DB ${databaseId}`);
    
            verConfigContainer = await this.createContainer(constants.NOSQL_CONTAINER_ID.VERIFIER_CONFIGURATIONS_ENTITY);
            ruleSetContainer = await this.createContainer(constants.NOSQL_CONTAINER_ID.RULE_SET);
            ruleContainer = await this.createContainer(constants.NOSQL_CONTAINER_ID.RULE);
            //todo others
        } catch(err) {
            const { errorMsg } = getErrorInfo(error);
            logger.error(`Unable to initialize Cosmos DB: ${errorMsg}`);
            throw err;
        }
    }

    async getDoc(containerId, docID) {
        logger.info(`getDoc ${docID} from ${containerId} container`);

        try {
            const container = this.getContainer(containerId);
            const response = await container.item(docID).read();

            if (response.statusCode !== 200) {
                const err = new Error(
                    `Unable to get doc ${docID}`
                );
                err.status = response.statusCode;
                throw err
            }
            return response.resource;
        } catch (err) {
            err.message = this.cleanErrorMessage(err.message);
            logger.error(
                `Unable to get doc ${docID} from ${containerId} container:`, err.message
            );
            throw err;
        }
    };

    async getAllDocs(containerId, limit, skip) {
        logger.info(`getAllDocs from ${containerId} container`);

        try {
            const container = this.getContainer(containerId);

            const response = await container.items.query(
                `SELECT * from c OFFSET ${skip} LIMIT ${limit}`
            ).fetchAll();

            if (response.statusCode && response.statusCode !== 200) {
                const err = new Error(
                    `Unable to get docs`
                );
                err.status = response.statusCode;
                throw err
            }

            const rows = response.resources.map(doc => this.sanitizeDoc(doc));

            return {
                total_rows: rows.length,
                limit,
                skip,
                rows
            };
        } catch (err) {
            err.message = this.cleanErrorMessage(err.message);
            logger.error(
                `Unable to get docs from ${containerId} container:`, err.message
            );
            throw err;
        }
    }

    
    async writeDoc(containerId, doc) {
        logger.info(`writeDoc ${doc.id} to ${containerId} container`);
        this.verifyDoc(doc);

        try {
            const container = this.getContainer(containerId);

            const response = await container.items.create(doc);

            if (response.statusCode !== 201) {
                const err = new Error(
                    `Unable to writeDoc ${doc.id}`
                );
                err.status = response.statusCode;
                throw err
            }
            return response.resource;
        } catch (err) {
            err.message = this.cleanErrorMessage(err.message);
            logger.error(
                `Unable to writeDoc ${doc.id} from ${containerId} container:`, err.message
            );
            throw err;
        }
    };

    async putDoc(containerId, doc) {
        logger.info(`putDoc ${doc.id} from ${containerId} container`);
        this.verifyDoc(doc);

        try {
            const container = this.getContainer(containerId);
            const response = await container
                .item(doc.id)
                .replace(doc);

            if (response.statusCode !== 200) {
                const err = new Error(
                    `Unable to putDoc ${doc.id}`
                );
                err.status = response.statusCode;
                throw err
            }
            return response.resource;
        } catch (err) {
            err.message = this.cleanErrorMessage(err.message);
            logger.error(
                `Unable to putDoc ${doc.id} from ${containerId} container:`, err.message
            );
            throw err;
        }
    };

    async deleteDoc(containerId, docID) {
        logger.info(`deleteDoc ${docID} from ${containerId} container`);

        try {
            const container = this.getContainer(containerId);
            const response = await container.item(docID).delete();

            if (response.statusCode !== 204) {
                const err = new Error(
                    `Unable to deleteDoc ${docID}`
                );
                err.status = response.statusCode;
                throw err
            }
            return response.resource;
        } catch (err) {
            const { errorStatus } = getErrorInfo(err);
            if (errorStatus === 404) {
                const error = new Error(`Document not found`);
                error.status = 404;
                throw error;
            }

            err.message = this.cleanErrorMessage(err.message);
            logger.error(
                `Unable to deleteDoc ${docID} from ${containerId} container:`, err.message
            );
            throw err;
        }
    };

    sanitizeDoc(doc) {
        const docCopy = JSON.parse(JSON.stringify(doc));

        delete docCopy._rid;
        delete docCopy._self;
        delete docCopy._etag;
        delete docCopy._attachments;
        delete docCopy._ts;

        return docCopy;
    }

    validateEnvVars() {
        const missing = [];
        if (!endpoint) {
            missing.push('COSMOS_DB_URL');
        }
        if (!key) {
            missing.push('COSMOS_DB_KEY');
        }
        if (!databaseId) {
            missing.push('COSMOS_DB_ID');
        }

        if (missing.length > 0) {
            throw new Error(
                `Missing environmental variables for Cosmos DB: ${missing}`
            );
        }
    }

    getContainer(containerId) {
        switch (containerId) {
            case constants.NOSQL_CONTAINER_ID.VERIFIER_CONFIGURATIONS_ENTITY:
                return verConfigContainer;
            case constants.NOSQL_CONTAINER_ID.RULE:
                return ruleContainer;                    
            case constants.NOSQL_CONTAINER_ID.RULE_SET:
                return ruleSetContainer;    
            
            default:
                const error = new Error(`Unknown container id ${containerId}`);
                error.status = 500;
                throw error;
        }
    }

    cleanErrorMessage(message) {
        // Cosmos DB error messages contain a lot
        // of unneeded info after this index
        const index = message.indexOf('\r\n');
        if (index === -1) {
            return message
        }

        return message.substring(0, index)
    }

    async createContainer(containerId) {
        logger.info(`Creating Cosmos container ${containerId} in DB ${databaseId}`);
        const {container} = await client
            .database(databaseId)
            .containers
            .createIfNotExists({
                id: containerId,
            });
        logger.info(`Created Cosmos container ${containerId} in DB ${databaseId}`);
        return container;
    }

    verifyDoc(doc) {
        if (!doc.id) {
            const error = new Error('Document is missing id');
            error.status = 400;
            throw error;
        }
    }
}

module.exports = CosmosDB;
