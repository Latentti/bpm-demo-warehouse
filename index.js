require('dotenv').config();

const { Client, logger, BasicAuthInterceptor } = require('camunda-external-task-client-js');

const subscribeHandler = require('./handlers/subscribe');
const deploymentHandler = require('./handlers/deploy');
const { log } = require('./utils/logger');

let start = Date.now();

(async () => {
  log(`Deploying diagrams to Camunda`)

  await deploymentHandler()

  log(`Diagrams deployed in ${Date.now() - start}ms`)

  const camundaConfig = {
    baseUrl: 'http://localhost:8080/engine-rest',
    asyncResponseTimeout: 10000,
    interceptors: new BasicAuthInterceptor({
      username: process.env.CAMUNDA_USERNAME || "demo",
      password: process.env.CAMUNDA_PASSWORD || "demo"
    })
  };

  const client = new Client(camundaConfig);

  subscribeHandler(client)

  log(`${process.env.CAMUNDA_WORKER_NAME} loaded in ${Date.now() - start}ms`)
})()
