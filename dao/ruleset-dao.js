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

const Logger = require('../config/logger');
const logger = new Logger('ruleset-dao');


const getRuleSet = async (id, version) => {
    
    try {
        const retDoc = await dbHelper.getInstance().getDoc(
            constants.NOSQL_CONTAINER_ID.RULE_SET, id, version
        );
        return await dbHelper.getInstance().sanitizeDoc(retDoc);
    } catch(err) {
        const { errorStatus } = getErrorInfo(err);
        if (errorStatus === 404) {
            const error = new Error('RuleSet not found');
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
const addRuleSet = async (entity) => {
    const entityCopy = JSON.parse(JSON.stringify(entity));
           
    logger.debug(`Adding rule doc id ${entity.id} ${entity.versio}`);    
   
    
    const entitySaved = await dbHelper.getInstance().writeDoc(
        constants.NOSQL_CONTAINER_ID.RULE_SET,
        entityCopy
    );
    return dbHelper.getInstance().sanitizeDoc(entitySaved);
}


module.exports = {
    getRuleSet,
    addRuleSet,
    
}