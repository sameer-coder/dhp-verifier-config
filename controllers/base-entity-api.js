/**
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 *  SPDX-Licence-Identifier: Apache 2.0
*/

const ruleDao = require('../dao/rules-dao');
const ruleSetDao = require('../dao/ruleset-dao');
const trustListDao = require('../dao/trustlist-dao');
const valueSetDao = require('../dao/valueset-dao');
const classifierRulesDao = require('../dao/classifier-rule-dao');
const constants = require('../helpers/constants');
const utils = require('../helpers/utils');
const Logger = require('../config/logger');
const { initNewEntity, validateIdVersion, validateRequiredField, logAndSendErrorResponse } = require('../helpers/utils');

const logger = new Logger('base-entity-api-controller');
 


const getRule = async (req, res) => {
    const txID = req.headers[constants.REQUEST_HEADERS.TRANSACTION_ID];
        
    try {
        const cId = req.params.ruleId;
        const ver = req.params.version;
        const errMsg = validateRequiredField(txID, cId, 'ruleId');
        const errMsg2 = validateRequiredField(txID, ver, 'version');
        
        logger.info(`Get Rule ${cId} ${ver}`, txID);
        if (errMsg || errMsg2) {
            return logAndSendErrorResponse(txID, res, { statusCode: 400, message: errMsg + errMsg2 }, `getRule`);
        };
    
        //todo latest support
        const result = await ruleDao.getRule(cId, ver);
        logger.response(200, `Success`, txID);
        return res.status(200).json({
            type: constants.API_TYPENAME.RULE ,
            payload: result
        });
    } catch (error) {
        return logAndSendErrorResponse(txID, res, error, 'getRule')
    }
}

const getRulesByQuery = async (req, res) => {
    const txID = req.headers[constants.REQUEST_HEADERS.TRANSACTION_ID];

    try {
        logger.info(`getRulesByQuery`, txID);
        //tdo
        logger.response(200, `Success`, txID);
        return res.status(200).json({
            type: constants.API_TYPENAME.VERIFIER_CONFIGURATION_COLLECTION ,
            payload: { data: result }
        });
    } catch (error) {
        return logAndSendErrorResponse(txID, res, { statusCode: error.statusCode, message: error.message }, 'getRulesByQuery')
    }
}

const addRule = async (req, res) => {
    const txID = req.headers[constants.REQUEST_HEADERS.TRANSACTION_ID];   
    
    try {
        const entity = req.body;
        initNewEntity(txID, entity);
        const cId = entity.id;
        logger.info(`Adding Rule ${cId}`, txID);
        
        
        const result = await ruleDao.addRule(entity);
        logger.response(200, `Success`, txID);
        return res.status(200).json({
            type: constants.API_TYPENAME.RULE ,
            payload: result
        });
    } catch (error) {
        return logAndSendErrorResponse(txID, res, error, 'addRule')
    }    
}


// todo deleteRule

/**
 * RuleSet
 */
const getRuleSet = async (req, res) => {
    const txID = req.headers[constants.REQUEST_HEADERS.TRANSACTION_ID];
    
    try {
        const cId = req.params.setId;
        const ver = req.params.version;
        
        const errMsg = validateRequiredField(txID, cId, 'setId');
        const errMsg2 = validateRequiredField(txID, ver, 'version');
        
        logger.info(`Get Rule ${cId} ${ver}`, txID);
        if (errMsg || errMsg2) {
            return logAndSendErrorResponse(txID, res, { statusCode: 400, message: errMsg + errMsg2 }, 
                `getRuleSet`);
        };
        
        
        const result = await ruleSetDao.getRuleSet(cId, ver);
        logger.response(200, `Success`, txID);
        return res.status(200).json({
            type: constants.API_TYPENAME.RULE_SET ,
            payload: result
        });
    } catch (error) {
        return logAndSendErrorResponse(txID, res, error, 'getRuleSet')
    }
}

const addRuleSet = async (req, res) => {
    const txID = req.headers[constants.REQUEST_HEADERS.TRANSACTION_ID];    
    try {
        const entity = req.body.payload;
        initNewEntity(txID, entity);
        
        const cId = entity.id;
        logger.info(`Adding RuleSet ${cId}`, txID);
        
        
        const result = await ruleSetDao.addRuleSet(entity);
        logger.response(200, `Success`, txID);
        return res.status(200).json({
            type: constants.API_TYPENAME.RULE_SET ,
            payload: result
        });
    } catch (error) {
        return logAndSendErrorResponse(txID, res, error, 'getRuleSet')
    }    
}

/*** Trust List ***/
const getTrustList = async (req, res) => {
    const txID = req.headers[constants.REQUEST_HEADERS.TRANSACTION_ID];
        
    try {
        const cId = req.params.id;
        const ver = req.params.version;
        const errMsg = validateRequiredField(txID, cId, 'id');
        const errMsg2 = validateRequiredField(txID, ver, 'version');
        
        logger.info(`Get TrustList ${cId} ${ver}`, txID);
        if (errMsg || errMsg2) {
            return logAndSendErrorResponse(txID, res, { statusCode: 400, message: errMsg + errMsg2 }, `getTrustList`);
        };
    
        //todo latest support
        const result = await trustListDao.getTrustList(cId, ver);
        logger.response(200, `Success`, txID);
        return res.status(200).json({
            type: constants.API_TYPENAME.TRUST_LIST ,
            payload: result
        });
    } catch (error) {
        return logAndSendErrorResponse(txID, res, error, 'getTrustList')
    }
}

const addTrustList = async (req, res) => {
    const txID = req.headers[constants.REQUEST_HEADERS.TRANSACTION_ID];   
    
    try {
        const entity = req.body;
        initNewEntity(txID, entity);
        const cId = entity.id;
        logger.info(`Adding TrustList ${cId}`, txID);
        
        
        const result = await trustListDao.addTrustList(entity);
        logger.response(200, `Success`, txID);
        return res.status(200).json({
            type: constants.API_TYPENAME.TRUST_LIST ,
            payload: result
        });
    } catch (error) {
        return logAndSendErrorResponse(txID, res, error, 'addTrustList')
    }    
}

/*** Value Sets ***/
const getValueSets = async (req, res) => {
    const txID = req.headers[constants.REQUEST_HEADERS.TRANSACTION_ID];
        
    try {
        const cId = req.params.id;
        const ver = req.params.version;
        const errMsg = validateRequiredField(txID, cId, 'id');
        const errMsg2 = validateRequiredField(txID, ver, 'version');
        
        logger.info(`Get ValueSets ${cId} ${ver}`, txID);
        if (errMsg || errMsg2) {
            return logAndSendErrorResponse(txID, res, { statusCode: 400, message: errMsg + errMsg2 }, `getValueSets`);
        };
    
        //todo latest support
        const result = await valueSetDao.getValueSets(cId, ver);
        logger.response(200, `Success`, txID);
        return res.status(200).json({
            type: constants.API_TYPENAME.VALUE_SET ,
            payload: result
        });
    } catch (error) {
        return logAndSendErrorResponse(txID, res, error, 'getValueSets')
    }
}

const addValueSets = async (req, res) => {
    const txID = req.headers[constants.REQUEST_HEADERS.TRANSACTION_ID];   
    
    try {
        const entity = req.body;
        initNewEntity(txID, entity);
        const cId = entity.id;
        logger.info(`Adding ValueSets ${cId}`, txID);
        
        
        const result = await valueSetDao.addValueSets(entity);
        logger.response(200, `Success`, txID);
        return res.status(200).json({
            type: constants.API_TYPENAME.VALUE_SET ,
            payload: result
        });
    } catch (error) {
        return logAndSendErrorResponse(txID, res, error, 'addValueSets')
    }    
}

/*** ClassifierRules ***/
const getClassifierRules = async (req, res) => {
    const txID = req.headers[constants.REQUEST_HEADERS.TRANSACTION_ID];
        
    try {
        const cId = req.params.id;
        const ver = req.params.version;
        const errMsg = validateRequiredField(txID, cId, 'id');
        const errMsg2 = validateRequiredField(txID, ver, 'version');
        
        logger.info(`Get ClassifierRules ${cId} ${ver}`, txID);
        if (errMsg || errMsg2) {
            return logAndSendErrorResponse(txID, res, { statusCode: 400, message: errMsg + errMsg2 }, `getClassifierRules`);
        };
    
        //todo latest support
        const result = await classifierRulesDao.getClassifierRules(cId, ver);
        logger.response(200, `Success`, txID);
        return res.status(200).json({
            type: constants.API_TYPENAME.CLASSIFIER_RULE ,
            payload: result
        });
    } catch (error) {
        return logAndSendErrorResponse(txID, res, error, 'getClassifierRules')
    }
}

const addClassifierRules = async (req, res) => {
    const txID = req.headers[constants.REQUEST_HEADERS.TRANSACTION_ID];   
    
    try {
        const entity = req.body;
        initNewEntity(txID, entity);
        const cId = entity.id;
        logger.info(`Adding ClassifierRules ${cId}`, txID);
        
        
        const result = await classifierRulesDao.addClassifierRules(entity);
        logger.response(200, `Success`, txID);
        return res.status(200).json({
            type: constants.API_TYPENAME.CLASSIFIER_RULE ,
            payload: result
        });
    } catch (error) {
        return logAndSendErrorResponse(txID, res, error, 'addClassifierRules')
    }    
}

module.exports = {    
    getRule,
    addRule,    
    getRulesByQuery,
    getRuleSet,
    addRuleSet,
    getTrustList,
    addTrustList,
    getClassifierRules,
    addClassifierRules,
    getValueSets,
    addValueSets,

}
