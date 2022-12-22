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
const logger = new Logger('masterData-dao');



const getMasterData = async (id, version) => {
    try {
        if(!version)
            version = "1.0.0"; //todo Support latest
        const retDoc = await dbHelper.getInstance().getDoc(
            constants.NOSQL_CONTAINER_ID.MASTER_DATA_ENTITY, id, version
        );
        return await dbHelper.getInstance().sanitizeDoc(retDoc);
    } catch(err) {
        const { errorStatus } = getErrorInfo(err);
        if (errorStatus === 404) {
            const error = new Error('MasterData not found');
            error.status = errorStatus;
            throw error;
        }
        throw err;
    }
}

const addMasterData = async (entity) => {
    const entityCopy = JSON.parse(JSON.stringify(entity));
                
    
    logger.debug(`Adding MasterData doc id ${entity.id} ${entity.version}`);    
    
    const entitySaved = await dbHelper.getInstance().writeDoc(
        constants.NOSQL_CONTAINER_ID.MASTER_DATA_ENTITY,
        entityCopy
    );
    return dbHelper.getInstance().sanitizeDoc(entitySaved);
}


module.exports = {
    getMasterData,
    addMasterData,
    
}