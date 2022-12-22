/**
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 * 
*/

const dbHelper = require('../helpers/nosql-db-helper');
const constants = require('../helpers/constants');
const { getErrorInfo } = require('../helpers/utils');

const { stringify } = require('querystring');
const Logger = require('../config/logger');
const logger = new Logger('classifierRules-dao');



const getClassifierRules = async (id, version) => {
    try {
        const retDoc = await dbHelper.getInstance().getDoc(
            constants.NOSQL_CONTAINER_ID.CLASSIFIER_RULE_ENTITY, id, version
        );
        return await dbHelper.getInstance().sanitizeDoc(retDoc);
    } catch(err) {
        const { errorStatus } = getErrorInfo(err);
        if (errorStatus === 404) {
            const error = new Error('ClassifierRules not found');
            error.status = errorStatus;
            throw error;
        }
        throw err;
    }
}

const addClassifierRules = async (entity) => {
    const entityCopy = JSON.parse(JSON.stringify(entity));
                
    
    logger.debug(`Adding ClassifierRules doc id ${entity.id} ${entity.version}`);    
    
    const entitySaved = await dbHelper.getInstance().writeDoc(
        constants.NOSQL_CONTAINER_ID.CLASSIFIER_RULE_ENTITY,
        entityCopy
    );
    return dbHelper.getInstance().sanitizeDoc(entitySaved);
}


module.exports = {
    getClassifierRules,
    addClassifierRules,
    
}