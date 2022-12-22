/**
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 
*/

const vconfDao = require('../dao/verifier-config-dao');
const displaysDao = require('../dao/displays-dao');
const masterDataDao = require('../dao/masterdata-dao');
const specificationConfDao = require('../dao/specification-conf-dao');
const constants = require('../helpers/constants');
const Logger = require('../config/logger');
const { initNewEntity, validateRequiredField, logAndSendErrorResponse } = require('../helpers/utils');

const logger = new Logger('verifier-configapi-controller');
 

const getVerifierConfig = async (req, res) => {
    const txID = req.headers[constants.REQUEST_HEADERS.TRANSACTION_ID];
    
    try {
        const cId = req.params.verConfigId;
        const ver = req.params.version;
        const errMsg = validateRequiredField(txID, cId, 'verConfigId');
        const errMsg2 = validateRequiredField(txID, ver, 'version');
        if (errMsg || errMsg2) {
            return logAndSendErrorResponse(txID, res, { statusCode: 400, message: errMsg + errMsg2 }, `getVerifierConfig`);
        };
        logger.info(`Get VerifierConfig ${cId}`, txID);
        // const result = await daoCustomer.getAllCustomers(txID);
        
        
        const result = await vconfDao.getVerifierConfigurations(cId,ver);
        logger.response(200, `Success`, txID);
        return res.status(200).json({
            type: constants.API_TYPENAME.VERIFIER_CONFIGURATION ,
            payload: result
        });
    } catch (error) {
        return logAndSendErrorResponse(txID, res, error, 'getVerifierConfig')
    }
}


const getAllVerifierConfig = async (req, res) => {
    const txID = req.headers[constants.REQUEST_HEADERS.TRANSACTION_ID];

    try {
        logger.info(`GetAll VerifierConfig`, txID);
        // const result = await daoCustomer.getAllCustomers(txID);

        logger.response(200, `Success`, txID);
        return res.status(200).json({
            type: constants.API_TYPENAME.VERIFIER_CONFIGURATION_COLLECTION ,
            payload: { data: result }
        });
    } catch (error) {
        return logAndSendErrorResponse(txID, res, { statusCode: error.statusCode, message: error.message }, 'getAllVerifierConfig')
    }
}


const addVerifierConfig = async (req, res) => {
    const txID = req.headers[constants.REQUEST_HEADERS.TRANSACTION_ID];    
    try {
        const entity = req.body;
        initNewEntity(txID, entity);
        const cId = entity.id;
        logger.info(`Adding VerifierConfig ${cId}`, txID);
        
        
        const result = await vconfDao.addVerifierConfigurations(entity);
        logger.response(200, `Success`, txID);
        return res.status(200).json({
            type: constants.API_TYPENAME.VERIFIER_CONFIGURATION ,
            payload: result
        });
    } catch (error) { 
        return logAndSendErrorResponse(txID, res, error, 'getVerifierConfig')
    }    
}

// todo deleteVerifierConfig


const getVerifierConfigContent = async (req, res) => {
    const txID = req.headers[constants.REQUEST_HEADERS.TRANSACTION_ID];
    
    try {
        logger.info(`Get getVerifierConfigContent`, txID);
        const cId = req.params.verConfigId;
        const ver = req.params.version;
        const errMsg = validateRequiredField(txID, cId, 'verConfigId');
        const errMsg2 = validateRequiredField(txID, ver, 'version');
        if (errMsg || errMsg2) {
            return logAndSendErrorResponse(txID, res, { statusCode: 400, message: errMsg + errMsg2 }, `getVerifierConfigContent`);
        };
                
        const result = await vconfDao.getExpandedVerifierConfigurations(cId, ver);

        logger.response(200, `Success`, txID);
        return res.status(200).json({
            type: constants.API_TYPENAME.VERIFIER_CONFIGURATION_CONTENT ,
            payload: result
        });
    } catch (error) {
        return logAndSendErrorResponse(txID, res, { statusCode: error.statusCode, message: error.message }, 'getVerifierConfigContent')
    }
}


/*  Displays */
const getDisplays = async (req, res) => {
    const txID = req.headers[constants.REQUEST_HEADERS.TRANSACTION_ID];
        
    try {
        const cId = req.params.id;
        const ver = req.params.version;
        const errMsg = validateRequiredField(txID, cId, 'id');
        const errMsg2 = validateRequiredField(txID, ver, 'version');
        
        logger.info(`Get Displays ${cId} ${ver}`, txID);
        if (errMsg || errMsg2) {
            return logAndSendErrorResponse(txID, res, { statusCode: 400, message: errMsg + errMsg2 }, `getDisplays`);
        };
    
        //todo latest support
        const result = await displaysDao.getDisplays(cId, ver);
        logger.response(200, `Success`, txID);
        return res.status(200).json({
            type: constants.API_TYPENAME.DISPLAY ,
            payload: result
        });
    } catch (error) {
        return logAndSendErrorResponse(txID, res, error, 'getDisplays')
    }
}

const addDisplays = async (req, res) => {
    const txID = req.headers[constants.REQUEST_HEADERS.TRANSACTION_ID];   
    
    try {
        const entity = req.body;
        initNewEntity(txID, entity);
        const cId = entity.id;
        logger.info(`Adding Displays ${cId}`, txID);
        
        
        const result = await displaysDao.addDisplays(entity);
        logger.response(200, `Success`, txID);
        return res.status(200).json({
            type: constants.API_TYPENAME.DISPLAY ,
            payload: result
        });
    } catch (error) {
        return logAndSendErrorResponse(txID, res, error, 'addDisplays')
    }    
}

/* MasterData */
const getMasterData = async (req, res) => {
    const txID = req.headers[constants.REQUEST_HEADERS.TRANSACTION_ID];
        
    try {
        const cId = req.params.id;
        const ver = req.params.version;
        const errMsg = validateRequiredField(txID, cId, 'id');
        const errMsg2 = validateRequiredField(txID, ver, 'version');
        
        logger.info(`Get MasterData ${cId} ${ver}`, txID);
        if (errMsg || errMsg2) {
            return logAndSendErrorResponse(txID, res, { statusCode: 400, message: errMsg + errMsg2 }, `getMasterData`);
        };
    
        //todo latest support
        const result = await masterDataDao.getMasterData(cId, ver);
        logger.response(200, `Success`, txID);
        return res.status(200).json({
            type: constants.API_TYPENAME.MASTER_DATA ,
            payload: result
        });
    } catch (error) {
        return logAndSendErrorResponse(txID, res, error, 'getMasterData')
    }
}

const addMasterData = async (req, res) => {
    const txID = req.headers[constants.REQUEST_HEADERS.TRANSACTION_ID];   
    
    try {
        const entity = req.body;
        initNewEntity(txID, entity);
        const cId = entity.id;
        logger.info(`Adding MasterData ${cId}`, txID);
        
        
        const result = await masterDataDao.addMasterData(entity);
        logger.response(200, `Success`, txID);
        return res.status(200).json({
            type: constants.API_TYPENAME.MASTER_DATA ,
            payload: result
        });
    } catch (error) {
        return logAndSendErrorResponse(txID, res, error, 'addMasterData')
    }    
}

/* SpecificationConf */
const getSpecificationConf = async (req, res) => {
    const txID = req.headers[constants.REQUEST_HEADERS.TRANSACTION_ID];
        
    try {
        const cId = req.params.id;
        const ver = req.params.version;
        const errMsg = validateRequiredField(txID, cId, 'id');
        const errMsg2 = validateRequiredField(txID, ver, 'version');
        
        logger.info(`Get SpecificationConf ${cId} ${ver}`, txID);
        if (errMsg || errMsg2) {
            return logAndSendErrorResponse(txID, res, { statusCode: 400, message: errMsg + errMsg2 }, `getSpecificationConf`);
        };
    
        //todo latest support
        const result = await specificationConfDao.getSpecificationConf(cId, ver);
               

        logger.response(200, `Success`, txID);
        return res.status(200).json({
            type: constants.API_TYPENAME.SPECIFICATION_CONFIGURATION ,
            payload: result
        });
    } catch (error) {
        return logAndSendErrorResponse(txID, res, error, 'getSpecificationConf')
    }
}

const addSpecificationConf = async (req, res) => {
    const txID = req.headers[constants.REQUEST_HEADERS.TRANSACTION_ID];   
    
    try {
        const entity = req.body;
        initNewEntity(txID, entity);
        const cId = entity.id;
        logger.info(`Adding SpecificationConf ${cId}`, txID);
                
        const result = await specificationConfDao.addSpecificationConf(entity);
        logger.response(200, `Success`, txID);
        return res.status(200).json({
            type: constants.API_TYPENAME.SPECIFICATION_CONFIGURATION ,
            payload: result
        });
    } catch (error) {
        return logAndSendErrorResponse(txID, res, error, 'addSpecificationConf')
    }    
}


module.exports = {
    getVerifierConfig,
    addVerifierConfig,
    getVerifierConfigContent,
    getAllVerifierConfig,

    getSpecificationConf,
    addSpecificationConf,
    getDisplays,
    addDisplays,
    getMasterData,
    addMasterData,
}
