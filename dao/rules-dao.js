/**
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 *  SPDX-Licence-Identifier: Apache 2.0
*/

const dbHelper = require('../helpers/nosql-db-helper');
const constants = require('../helpers/constants');
const { getErrorInfo } = require('../helpers/utils');

const { stringify } = require('querystring');
const Logger = require('../config/logger');
const logger = new Logger('rules-dao');



const getRule = async (id, version) => {
    //todo Add support for "latest"
    
    try {
        const retDoc = await dbHelper.getInstance().getDoc(
            constants.NOSQL_CONTAINER_ID.RULE, id, version
        );
        return await dbHelper.getInstance().sanitizeDoc(retDoc);
    } catch(err) {
        const { errorStatus } = getErrorInfo(err);
        if (errorStatus === 404) {
            const error = new Error('Rule not found');
            error.status = errorStatus;
            throw error;
        }
        throw err;
    }
}

const getRulesByQuery = async (created_by, version, type) => {
    try {
        //todo
        retDoc = []
        /*const retDoc = await dbHelper.getInstance().getDoc(
            constants.NOSQL_CONTAINER_ID.RULE_COLLECTION, eID
        );*/
        return retDoc
        // return await dbHelper.getInstance().sanitizeDoc(retDoc);
    } catch(err) {
        const { errorStatus } = getErrorInfo(err);
        if (errorStatus === 404) {
            const error = new Error('Rule not found');
            error.status = errorStatus;
            throw error;
        }
        throw err;
    }
}

/*
 Model
  base: version, id, unrestricted
  attributes
    name,  predicate
    type  enum IssuerType
    category   CertificateCategory
    specID
 */
const addRule = async (entity) => {
    const entityCopy = JSON.parse(JSON.stringify(entity));
                
    
    logger.debug(`Adding rule doc id ${entity.id} ${entity.version}`);    
    //todo category, type as enums

    
    const entitySaved = await dbHelper.getInstance().writeDoc(
        constants.NOSQL_CONTAINER_ID.RULE,
        entityCopy
    );
    return dbHelper.getInstance().sanitizeDoc(entitySaved);
}


module.exports = {
    getRule,
    addRule,
    
}