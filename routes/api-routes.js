/**
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 * 
*/

const express = require('express');
const requestLogger = require('../middleware/request-logger');

const constants = require('../helpers/constants');
// const authStrategy = require('../middleware/auth-strategy');
const verifierconfigController = require('../controllers/verifier-configapi');
const baseEntityController = require('../controllers/base-entity-api');

const router = express.Router();

// todo checkAuthUser

router.get("/verifier-configurations",  requestLogger, verifierconfigController.getAllVerifierConfig);

router.post('/verifier-configurations', requestLogger, verifierconfigController.addVerifierConfig);

router.get("/verifier-configurations/:verConfigId/:version", requestLogger, verifierconfigController.getVerifierConfig);
router.get("/verifier-configurations/:verConfigId/:version/content", requestLogger, verifierconfigController.getVerifierConfigContent); // Resolve all content

router.post('/rules', requestLogger, baseEntityController.addRule);
router.post('/rules/:ruleId', requestLogger, baseEntityController.addRule);
router.get("/rules/:ruleId/:version",  requestLogger, baseEntityController.getRule);

router.post('/rule-sets', requestLogger, baseEntityController.addRuleSet);
router.post('/rules-sets/:setId', requestLogger, baseEntityController.addRuleSet);
router.get("/rule-sets/:setId/:version",  requestLogger, baseEntityController.getRuleSet);

router.post('/trust-lists', requestLogger, baseEntityController.addTrustList);
router.post('/trust-lists/:id', requestLogger, baseEntityController.addTrustList);
router.get("/trust-lists/:id/:version",  requestLogger, baseEntityController.getTrustList);

router.post('/value-sets', requestLogger, baseEntityController.addValueSets);
router.post('/value-sets/:id', requestLogger, baseEntityController.addValueSets);
router.get("/value-sets/:id/:version",  requestLogger, baseEntityController.getValueSets);

router.post('/classifier-rules', requestLogger, baseEntityController.addClassifierRules);
router.post('/classifier-rules/:id', requestLogger, baseEntityController.addClassifierRules);
router.get("/classifier-rules/:id/:version",  requestLogger, baseEntityController.getClassifierRules);


router.post('/displays', requestLogger, verifierconfigController.addDisplays);
router.post('/displays/:id', requestLogger, verifierconfigController.addDisplays);
router.get("/displays/:id/:version",  requestLogger, verifierconfigController.getDisplays);

router.post('/master-data', requestLogger, verifierconfigController.addMasterData);
router.post('/master-data/:id', requestLogger, verifierconfigController.addMasterData);
router.get("/master-data/:id/:version",  requestLogger, verifierconfigController.getMasterData);

router.post('/specification-configurations', requestLogger, verifierconfigController.addSpecificationConf);
router.post('/specification-configurations/:id', requestLogger, verifierconfigController.addSpecificationConf);
router.get("/specification-configurations/:id/:version",  requestLogger, verifierconfigController.getSpecificationConf);

module.exports = router;

