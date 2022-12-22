/**
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 * 
*/

const dbHelper = require('../helpers/nosql-db-helper');
const constants = require('../helpers/constants');
const { getErrorInfo } = require('../helpers/utils');
const ruleDao = require('./rules-dao');
const displaysDao = require('./displays-dao');
const trustListDao = require('./trustlist-dao');
const classifierRulesDao = require('./classifier-rule-dao');
const masterdataDao = require('./masterdata-dao');
const Logger = require('../config/logger');
const logger = new Logger('specificationConf-dao');



const getSpecificationConf = async (id, version) => {
    try {
        logger.debug(`get SpecificationConf doc id: ${id} ${version}`); 
        const retDoc = await dbHelper.getInstance().getDoc(
            constants.NOSQL_CONTAINER_ID.SPECIFICATION_CONFIG_ENTITY, id, version
        );
        return await dbHelper.getInstance().sanitizeDoc(retDoc);
    } catch(err) {
        const { errorStatus } = getErrorInfo(err);
        if (errorStatus === 404) {
            const error = new Error('SpecificationConf not found');
            error.status = errorStatus;
            throw error;
        }
        throw err;
    }
}

const addSpecificationConf = async (entity) => {
    const entityCopy = JSON.parse(JSON.stringify(entity));
                
    
    logger.debug(`Adding SpecificationConf doc id ${entity.id} ${entity.version}`);    
    
    const entitySaved = await dbHelper.getInstance().writeDoc(
        constants.NOSQL_CONTAINER_ID.SPECIFICATION_CONFIG_ENTITY,
        entityCopy
    );
    return await dbHelper.getInstance().sanitizeDoc(entitySaved);
}

const CREDENTIAL_CATEGORY = "credential-category";
const CREDENTIAL_SPEC = "credential-spec";

const getExpandedSpecificationConf = async (id, version) => {
    let specConf;
    try {
        specConf = await getSpecificationConf(id, version);
    } catch(err) {
        throw err;
    }
    configBroken = false;
    //expandSpecificationConfigurationConfigs : embedded ids
    try {    
        logger.debug(`Expanding SpecificationConf`); 
        if(specConf["trustLists"]) {
            let trustListsExp = [];
            for (trustObj of specConf["trustLists"]) {
                let tl = await trustListDao.getTrustList(trustObj.id, trustObj.version);
                trustListsExp.push(tl);  
            }            
            specConf["trustLists"] = trustListsExp;
        }

    } catch(err) {
        configBroken = true;
    }        
        
    try {    
        if(specConf["rules"]) {
            let rulesExp = [];
            for (rObj of specConf["rules"]) {
                let tl = await ruleDao.getRule(rObj.id, rObj.version);
                rulesExp.push(tl);  
            }            
            specConf["rules"] = rulesExp;
        }

    } catch(err) {
        configBroken = true;
    }        
    
    try {    
        if(specConf["display"]) {
            let displayExp = [];
            for (dObj of specConf["display"]) {
                let tl = await displaysDao.getDisplays(dObj.id, dObj.version);
                displayExp.push(tl);  
            }            
            specConf["display"] = displayExp;
        }
    } catch(err) {
        configBroken = true;
    }        

    try {    
        if(specConf["classifierRule"]) {
            specConf["classifierRule"] = await classifierRulesDao.getClassifierRules(specConf["classifierRule"].id, specConf["classifierRule"].version);                
        }
    } catch(err) {
        configBroken = true;
    }        

    try {
        // validate CredentialSpecDisplayValue
        if(specConf["credentialSpec"]) {
            let confValue = specConf["credentialSpec"];
            delete specConf["credentialSpec"];
            let entityToValidate = await masterdataDao.getMasterData(CREDENTIAL_SPEC);
            if(entityToValidate["items"]) {
                for (item of entityToValidate["items"]) {
                    if(item.id ===confValue) {
                        specConf["credentialSpec"] = confValue;
                        break;
                    }
                }   
            }               
        }

        if(specConf["credentialCategory"]) {
            let confValue = specConf["credentialCategory"];
            delete specConf["credentialCategory"];
            let entityToValidate = await masterdataDao.getMasterData(CREDENTIAL_CATEGORY);
            if(entityToValidate["items"]) {
                for (item of entityToValidate["items"]) {
                    if(item.id ===confValue) {
                        specConf["credentialCategory"] = confValue;
                        break;
                    }
                }   
            }               
        }
    } catch(err) {
        const { errorStatus } = getErrorInfo(err);
        if (errorStatus === 404) {
            const error = new Error('credential-spec / credential-category not found');
            error.status = errorStatus;
            throw error;
        }
        throw err;
    }

    if (configBroken)
        throw new Error(
            `Verifier configuration is broken. Details id: ${id} version: ${version}`
        ); 

    return await dbHelper.getInstance().sanitizeDoc(specConf);  
}


module.exports = {
    getSpecificationConf,
    addSpecificationConf,
    getExpandedSpecificationConf    
}