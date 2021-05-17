require('dotenv').config();

const { Client, logger, BasicAuthInterceptor } = require('camunda-external-task-client-js');

const subscribeHandler = require('./handlers/subscribe')
const start = Date.now()

const { log } = require('./utils/logger')

log(`Starting camunda external service`)

const camundaConfig = {
  baseUrl: 'http://localhost:8080/engine-rest',
  use: logger,
  asyncResponseTimeout: 10000,
  interceptors: new BasicAuthInterceptor({
    username: process.env.CAMUNDA_USERNAME || "demo",
    password: process.env.CAMUNDA_PASSWORD || "demo"
  })
};

const client = new Client(camundaConfig);

subscribeHandler(client)

log(`Service loaded in ${Date.now() - start}ms`)
