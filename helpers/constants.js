/**
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 *  SPDX-Licence-Identifier: Apache 2.0
*/

const API_TYPENAME = {
    RULE: "rule",
    RULE_COLLECTION: "rule-collection",
    CLASSIFIER_RULE: "classifier-rule",
    CLASSIFIER_RULE_COLLECTION: "classifier-rule-collection",
    VALUE_SET: "value-set",
    VALUE_SET_COLLECTION: "value-set-collection",
    DISPLAY: "display",
    DISPLAY_COLLECTION: "display-collection",
    TRUST_LIST: "trust-list",
    TRUST_LIST_COLLECTION: "trust-list-collection",
    RULE_SET: "rule-set",
    RULE_SET_COLLECTION: "rule-set-collection",
    VERIFIER_CONFIGURATION_COLLECTION: "verifier-configuration-collection",
    VERIFIER_CONFIGURATION_CONTENT_COLLECTION: "verifier-configuration-content-collection",
    VERIFIER_CONFIGURATION: "verifier-configuration",
    VERIFIER_CONFIGURATION_CONTENT: "verifier-configuration-content",
    RULE_VERIFICATION: "rule-verification",
    SPECIFICATION_CONFIGURATION: "specification-configuration",
    SPECIFICATION_CONFIGURATION_COLLECTION: "specification-configuration-collection",
    MASTER_DATA: "master-data",
    MASTER_DATA_COLLECTION: "master-data-collection",
    HEALTH_STATUS: "health-status",
    CACHE_CLEAN: "cache-clean"
};

exports.APP_ID_SCOPES = {
    SYS_ADMIN: 'verifier.sysadmin',
    CUSTOMER_ADMIN: 'verifier.custadmin',
    ORG_ADMIN: 'verifier.orgadmin',
    METERING_REPORTER: 'meter.reporter',
    // Credential revoking scope is managed in healthpass-core
};
exports.APP_ID_ROLENAMES = {
    SYS_ADMIN: 'verifier-sysadmin',
    CUSTOMER_ADMIN: 'verifier-custadmin',
    ORG_ADMIN: 'verifier-orgadmin',
    METERING_REPORTER: 'meter-reporter',
};
exports.HEALTHPASS_ADMIN_SCOPE = 'healthpass.admin';

const REQUEST_HEADERS = {
    ISSUER_ID: 'x-hpass-issuer-id',
    TRANSACTION_ID: 'x-hpass-txn-id',
};

const KEY_PAIR_POSTFIX = '-kp';

const COSMOS_DB_ID = 'ver-config-db';
// List of table/dbs 
const DB_NAMES = {
    VERIFIER_ADMINDB: 'ver-config-db'
};


const NOSQL_CONTAINER_ID = {
    
    MASTER_DATA_ENTITY: "master_data",
    VERIFIER_CONFIGURATIONS_ENTITY: 'ver_conf',
    RULE: 'rule',
    RULE_SET: 'rule_set',
    DISPLAY: 'display',
    CLASSIFIER_RULE_ENTITY: "classifier_rule",
    TRUST_LIST_ENTITY: "trust_list",
    VALUE_SET_ENTITY: "value_set",
    SPECIFICATION_CONFIG_ENTITY: "specification_config"
};

const FIELD_NAME = {
    SCHEMAS: "schemas",    
    VERSION: "version",    
    TYPE: "type",    
    CREATED_ORG: "createdOrg",    
    CREATED_USER: "createdUser",    
    ORGANIZATION_ID: "organizationId",    
    CUSTOMER_ID: "customerId",    
    UNRESTRICTED: "unrestricted",    
    NAME: "name",    
    ENTITY: "entity",    
    PUBLISHER: "publisher",    
    ITEMS: "items",    
    MASTER_CATALOG: "masterCatalog"
}
const LATEST_VERSION = "latest";
const VERSION_ID_SEPARATOR = ";v=";
const PARTITION_ID_SEPARATOR = ":";
const RFC3339_DATE_FORMAT = "yyyy-MM-dd'T'HH:mm:ss'Z'";

// exports.VER_CREDENTIAL_TYPE_VALUE = "VerifierCredential";



const ERROR_CODES = {
    TIMEOUT: 'ECONNABORTED',
};


  
module.exports = {
    REQUEST_HEADERS,
    API_TYPENAME,
    ERROR_CODES,
    NOSQL_CONTAINER_ID,
    FIELD_NAME
}
