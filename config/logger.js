/**
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 *  SPDX-Licence-Identifier: Apache 2.0
*/
const log4js = require('log4js');

const loglevel = process.env.LOG_LEVEL || 'info';


log4js.addLayout('json', () => {
    return (logEvent) => {
        const log = {
            timestamp: logEvent.startTime,
            level: logEvent.level.levelStr,
            name: logEvent.categoryName,
            'x-hpass-txn-id': logEvent.data[0].txID,
            message: logEvent.data[0].message,
        };

        if (logEvent.data[0].data) {
            log.data = logEvent.data[0].data;
        }

        if (logEvent.data[0].status) {
            log.status = logEvent.data[0].status;
        }

        return JSON.stringify(log);
    };
});

log4js.configure({
    appenders: {
        out: { type: 'console', layout: { type: 'json' } },
    },
    categories: {
        default: { appenders: ['out'], level: loglevel },
    },
});

// wrapper class for log4js logger
// logs transactionID with messages for traceability
// option to obfuscate specific data fields potentially containing PII
const Logger = class {
    constructor(moduleName) {
        // list of request/response-body field names that contain PII
        this.piFields = [
            'name',
            'givenName',
            'familyName',
            'givenname',
            'familyname',
            'mrn',
            'subjectid',
            'data',
            'caPassword',
            'ca_password',
            'credential',
            'certificate',
            'mobile',
            'publicKey',
        ];
        this.logger = log4js.getLogger(moduleName);
        this.logger.level = loglevel;
    }

    // eslint-disable-next-line class-methods-use-this
    formatLog(txID, message, data, status) {
        return { txID, message, data, status };
    }

    obfuscate(piObject) {
        if (!piObject)
            return {};
        const obfuscatedObject = { ...piObject };
        this.piFields.forEach((field) => {
            if (field in piObject) {
                // data is a generic object that could contain any amount of sensitive data
                if (field === 'data') {
                    obfuscatedObject[field] = '{ ... }';
                } else {
                    obfuscatedObject[field] = 'xxx';
                }
            }
        });

        return obfuscatedObject;
    }

    safeDebug(message, piArg, txID) {
        const safeArg = this.obfuscate(piArg);
        const log = this.formatLog(txID, message, safeArg);
        this.logger.debug(log);
    }

    safeInfo(message, piArg, txID) {
        const safeArg = this.obfuscate(piArg);
        const log = this.formatLog(txID, message, safeArg);
        this.logger.info(log);
    }

    safeWarn(message, piArg, txID) {
        const safeArg = this.obfuscate(piArg);
        const log = this.formatLog(txID, message, safeArg);
        this.logger.warn(log);
    }

    safeError(message, piArg, txID) {
        const safeArg = this.obfuscate(piArg);
        const log = this.formatLog(txID, message, safeArg);
        this.logger.error(log);
    }

    debug(message, txID) {
        const log = this.formatLog(txID, message);
        this.logger.debug(log);
    }

    info(message, txID) {
        const log = this.formatLog(txID, message);
        this.logger.info(log);
    }

    warn(message, txID) {
        const log = this.formatLog(txID, message);
        this.logger.warn(log);
    }

    error(message, txID) {
        const log = this.formatLog(txID, message);
        this.logger.error(log);
    }

    response(statusCode, message, txID) {
        const log = this.formatLog(txID, message, '', statusCode);
        this.logger.info(log);
    }

    errorResponse(statusCode, message, txID) {
        const log = this.formatLog(txID, message, '', statusCode);
        this.logger.error(log);
    }
};

module.exports = Logger;