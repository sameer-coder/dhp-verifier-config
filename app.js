/**
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 *  SPDX-Licence-Identifier: Apache 2.0
*/

const express = require('express');
const bodyParser = require('body-parser');
const dbHelper = require('./helpers/nosql-db-helper');
const apiRoutes = require('./routes/api-routes');
const controller = require('./controllers/verifier-configapi');

const app = express();

const port = process.env.PORT || 3000;
const contextRoot = process.env.CONTEXT_ROOT;
const useHttps = process.env.USE_HTTPS
    ? process.env.USE_HTTPS == 'true' || process.env.USE_HTTPS == 'TRUE'
    : false;


app.use(bodyParser.json());

app.use(`${contextRoot}/`, apiRoutes);

app.listen(port, async () => {
    await dbHelper.init();
    // run service
    console.log(`\n\nServer started successfully on port ${port}`);
});

