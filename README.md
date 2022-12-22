# DHP Verifier Configuration API

Verifier Configuration API microservice provides workflow dependent configuration for use by [Digital Health Pass](https://www.ibm.com/products/digital-health-pass/ ) verifier application / mobile apps. This service API provides functionality for storing and managing Verifier Configurations, Rules, TrustList, DisplayPreferences etc.

## Development Setup
It is recommended to use [Node.js](https://nodejs.org/) v16

### General Environment Variables

The following environment variables must be set before starting the application regardless of the deployment environment.

| Environment Variable | Value                                                                                          |
| -------------------- | ---------------------------------------------------------------------------------------------- |
| LOG_LEVEL            | Standard log4js log levels.  debug, info, error, etc.                                          |
| CONTEXT_ROOT         | The context root for all endpoints.  e.g. /api/v1/credential-issuer                            |
| USE_HTTPS            | true or false.  If true, then endpoints must be accessed via https, otherwise http             |
| TLS_FOLDER_PATH      | Default ./config/tls , Path to tls certs for https enabling                                    |

### Environment Variables for IBM Cloud deployment

The following environment variables must be set to execute the service in IBM Cloud

| Environment Variable    | Value                                                                                               |
| ----------------------- | --------------------------------------------------------------------------------------------------- |
| NOSQL_DB_FILE_NAME      | cloudant.js                                                                                         |
| CLOUDANT_URL            | Document database Cloudant URL found in IBM Cloud service credentials url                           |
| CLOUDANT_IAM_KEY        | The Cloudant IAM key found in IBM Cloud service credentials apikey value                            |
| APP_ID_URL              | The App ID URL found in IBM Cloud service credentials oauthServerUrl value                          |
| APP_ID_IAM_KEY          | The App ID URL found in IBM Cloud service credentials apikey value                                  |
| APP_ID_TENANT_ID        | The App ID URL found in IBM Cloud service credentials tenantId value                                | 
| APP_ID_AUTH_SERVER_HOST | The App ID appidServiceEndpoint value, for e.g. `https://us-east.appid.cloud.ibm.com`               |
| APP_ID_CLIENT_ID        | App ID instance ClientID                                                                            |
| APP_ID_SECRET           | App ID instance secret                                                                              |


### Local dev environment
For local dev environment, use a `.env` file in the project root with the following minimumber env variables

```
USE_HTTPS=false
TLS_FOLDER_PATH=./config/tls   # if set, overrides the default directory that holds the server.cert and server.key files

CONTEXT_ROOT=/api/v1
AUTH_STRATEGY=no-auth-strategy.js  ## app-id-auth-strategy.js or azure-auth-strategy.js

# For local couch as NoSQL DB
NOSQL_DB_FILE_NAME=couchdb.js  # for other cloud providers cosmos-db.js / cloudant.js
COUCHDB_URL=

```

### TLS Enabling
To enable HTTPS with tls1.2, enable USE_HTTPS and set TLS_FOLDER_PATH to relative or abs path
to folder containing server.key & server.cert files. Without this setting, server starts up in http mode.

For e.g. set following env vars
```
USE_HTTPS=true
TLS_FOLDER_PATH=./config/tls
```

## Build and Run
```
npm install
npm run start
```


## Dev notes

- We use eslint for linting js code 
- NoSQL supported
  - Couch DB
  - Azure cosmos DB
  - Cloudant DB

### Rules language
Specifications for the rules language used in Verifier configuration: JSON Logic - https://jsonlogic.com/

See libraries
- js - https://www.npmjs.com/package/json-logic-js
- java - https://github.com/jamsesso/json-logic-java
- swift - https://github.com/advantagefse/json-logic-swifta


## Library Licenses

This section lists license details of libraries / dependencies.

**Table: Dependent libraries and links**
| Name                        | License type | Link                                                                 |
| :-------------------------- | :----------- | :------------------------------------------------------------------- |
| @azure/cosmos               | MIT          | https://github.com/Azure/azure-sdk-for-js.git                    |
| @cloudant/cloudant          | Apache-2.0   | https://git@github.com/cloudant/nodejs-cloudant.git                |
| ibmcloud-appid              | Apache-2.0   | https://github.com/ibm-cloud-security/appid-serversdk-nodejs.git |
| axios                       | MIT          | https://github.com/axios/axios.git                               |
| bcryptjs                    | MIT          | https://github.com/dcodeIO/bcrypt.js.git                         |
| body-parser                 | MIT          | https://github.com/expressjs/body-parser.git                     |
| cors                        | MIT          | https://github.com/expressjs/cors.git                            |
| crypto                      | ISC          | https://github.com/npm/deprecate-holder.git                      |
| dotenv                      | BSD-2-Clause | git://github.com/motdotla/dotenv.git                                 |
| express                     | MIT          | https://github.com/expressjs/express.git                         |
| express-validator           | MIT          | git://github.com/express-validator/express-validator.git             |
| generate-password           | MIT          | https://github.com/brendanashworth/generate-password.git         |
| helmet                      | MIT          | git://github.com/helmetjs/helmet.git                                 |
| jsonschema                  | MIT          | git://github.com/tdegrunt/jsonschema.git                             |
| jsonwebtoken                | MIT          | https://github.com/auth0/node-jsonwebtoken.git                   |
| log4js                      | Apache-2.0   | https://github.com/log4js-node/log4js-node.git                   |
| moment                      | MIT          | https://github.com/moment/moment.git                             |
| morgan                      | MIT          | https://github.com/expressjs/morgan.git                          |
| passport                    | MIT          | git://github.com/jaredhanson/passport.git                            |
| querystring                 | MIT          | git://github.com/Gozala/querystring.git                              |
| retry-axios                 | Apache-2.0   | https://github.com/JustinBeckwith/retry-axios.git                |
| swagger-ui-express          | MIT          | git+ssh://git@github.com/scottie1984/swagger-ui-express.git          |
| uuid                        | MIT          | https://github.com/uuidjs/uuid.git                               |
| babel-eslint                | MIT          | https://github.com/babel/babel-eslint.git                        |
| chai                        | MIT          | https://github.com/chaijs/chai.git                               |
| chai-http                   | MIT          | git+ssh://git@github.com/chaijs/chai-http.git                        |
| eslint                      | MIT          | https://github.com/eslint/eslint.git                             |
| eslint-config-airbnb        | MIT          | https://github.com/airbnb/javascript.git                         |
| eslint-config-airbnb-base   | MIT          | https://github.com/airbnb/javascript.git                         |
| eslint-config-node          | ISC          | https://github.com/kunalgolani/eslint-config.git                 |
| eslint-config-prettier      | MIT          | https://github.com/prettier/eslint-config-prettier.git           |
| eslint-plugin-chai-friendly | MIT          | https://github.com/ihordiachenko/eslint-plugin-chai-friendly.git |
| eslint-plugin-import        | MIT          | https://github.com/import-js/eslint-plugin-import.git            |
| eslint-plugin-jsx-a11y      | MIT          | https://github.com/jsx-eslint/eslint-plugin-jsx-a11y.git         |
| eslint-plugin-node          | MIT          | https://github.com/mysticatea/eslint-plugin-node.git             |
| eslint-plugin-prettier      | MIT          | https://github.com/prettier/eslint-plugin-prettier.git           |
| eslint-plugin-react         | MIT          | https://github.com/jsx-eslint/eslint-plugin-react.git            |
| eslint-plugin-react-hooks   | MIT          | https://github.com/facebook/react.git                            |
| husky                       | MIT          | https://github.com/typicode/husky.git                            |
| lint-staged                 | MIT          | https://github.com/okonet/lint-staged.git                        |
| mocha                       | MIT          | https://github.com/mochajs/mocha.git                             |
| moxios                      | MIT          | https://github.com/mzabriskie/moxios.git                         |
| node-mocks-http             | MIT          | git://github.com/howardabrams/node-mocks-http.git                    |
| nodemon                     | MIT          | https://github.com/remy/nodemon.git                              |
| nyc                         | ISC          | git+ssh://git@github.com/istanbuljs/nyc.git                          |
| prettier                    | MIT          | https://github.com/prettier/prettier.git                         |
| rewire                      | MIT          | git://github.com/jhnns/rewire.git                                    |
| sinon                       | BSD-3-Clause | git+ssh://git@github.com/sinonjs/sinon.git                           |