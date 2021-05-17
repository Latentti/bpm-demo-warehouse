require('dotenv').config();

const { Client, logger, BasicAuthInterceptor } = require('camunda-external-task-client-js');

const subscribeHandler = require('./handlers/subscribe');
const deploymentHandler = require('./handlers/deploy');
const { log, camundaLogger } = require('./utils/logger');

let start = Date.now();

(async () => {
  if(process.env.CAMUNDA_DEPLOY && process.env.CAMUNDA_DEPLOY === "true"){
    log(`Checking deployments to Camunda`)

    await deploymentHandler()

    log(`Finished deploying in ${Date.now() - start}ms`)
  }else{
    log(`Starting ${process.env.CAMUNDA_WORKER_NAME}`)
  }

  const camundaConfig = {
    baseUrl: 'http://localhost:8080/engine-rest',
    workerId: process.env.CAMUNDA_WORKER_ID || "some-random-id",
    asyncResponseTimeout: 10000,
    interceptors: new BasicAuthInterceptor({
      username: process.env.CAMUNDA_USERNAME || "demo",
      password: process.env.CAMUNDA_PASSWORD || "demo"
    }),
    use: camundaLogger
  };

  const client = new Client(camundaConfig);

  subscribeHandler(client)

  log(`${process.env.CAMUNDA_WORKER_NAME} loaded in ${Date.now() - start}ms`)
})()
