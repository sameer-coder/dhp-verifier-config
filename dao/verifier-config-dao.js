/**
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 *  SPDX-Licence-Identifier: Apache 2.0
*/

const dbHelper = require('../helpers/nosql-db-helper');
const constants = require('../helpers/constants');
const valueSetDao = require('./valueset-dao');
const specificationConfDao = require('./specification-conf-dao');
const { getErrorInfo } = require('../helpers/utils');
const Logger = require('../config/logger');
const logger = new Logger('verifier-configapi-dao');


const getVerifierConfigurations = async (id, version) => {
    try {
        const retDoc = await dbHelper.getInstance().getDoc(
            constants.NOSQL_CONTAINER_ID.VERIFIER_CONFIGURATIONS_ENTITY, id, version
        );
        const payload = await dbHelper.getInstance().sanitizeDoc(retDoc);
        
        return payload;
    } catch(err) {
        const { errorStatus } = getErrorInfo(err);
        if (errorStatus === 404) {
            const error = new Error('VerifierConfigurations not found');
            error.status = errorStatus;
            throw error;
        }
        throw err;
    }
}


/*
 Model
  base: createdOrg, createdUser, createdAt, updatedAt, entity
  attributes
    name, customer, customerId , organization, organizationId, label, offline, masterCatalog, refresh, verifierType, configuration
    List: specificationConfigurations, valueSets, disabledSpecifications, disabledRules
 */
const addVerifierConfigurations = async (entity) => {
    const entityCopy = JSON.parse(JSON.stringify(entity));
    
    // const id = `${schema.id};v=${schema.version}`;
    const id = `${entity.id}`;

    entityCopy.id = id;
        
    entityCopy.name = entity.name;

    
    const entitySaved = await dbHelper.getInstance().writeDoc(
        constants.NOSQL_CONTAINER_ID.VERIFIER_CONFIGURATIONS_ENTITY,
        entityCopy
    );
    return await dbHelper.getInstance().sanitizeDoc(entitySaved);
}

const deleteVerifierConfigurations = async (eID) => {
    try {
        const retDoc = await dbHelper.getInstance().deleteDoc(
            constants.NOSQL_CONTAINER_ID.VERIFIER_CONFIGURATIONS_ENTITY, eID
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

const getExpandedVerifierConfigurations = async (id, version) => {

    let retrievedConf;
    try {
        retrievedConf = await getVerifierConfigurations(id,version);
    } catch(err) {
        throw err;
    }

    try {
        logger.info(`Expanding entities in  VerifierConfiguration: ${id} ${version}`);
        
        if(retrievedConf["specificationConfigurations"]) {
            let confListsExp = [];
            for (specObj of retrievedConf["specificationConfigurations"]) {
                let tl = await specificationConfDao.getExpandedSpecificationConf(specObj.id, specObj.version);
                confListsExp.push(tl);  
            }            
            retrievedConf["specificationConfigurations"] = confListsExp;
        }
        

        // valueSets
        if(retrievedConf["valueSets"]) {
            let confListsExp = [];
            for (specObj of retrievedConf["valueSets"]) {
                let tl = await valueSetDao.getValueSets(specObj.id, specObj.version);
                confListsExp.push(tl);  
            }            
            retrievedConf["valueSets"] = confListsExp;
        }
        
        return await dbHelper.getInstance().sanitizeDoc(retrievedConf);  
    } catch(err) {
        const { errorStatus } = getErrorInfo(err);
        if (errorStatus === 404) {
            const error = new Error(`VerifierConfiguration elements not found : ${err}`);
            error.status = errorStatus;
            throw error;
        }
        log.error(`VerifierConfiguration element lookup failed : ${err}`);
        throw err;
    }   
}

module.exports = {
    getVerifierConfigurations,
    addVerifierConfigurations,
    getExpandedVerifierConfigurations
}