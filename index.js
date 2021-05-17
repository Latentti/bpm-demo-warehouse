require('dotenv').config();

const fs = require('fs');
const { Client, logger } = require('camunda-external-task-client-js');
const modules = fs.readdirSync('./modules/').map((mod) => `./modules/${mod}`);
const start = Date.now()

const { log } = require('./utils/logger')
const errorHandler = require('./utils/errorHandler')

log(`Starting camunda external service`)

const camundaConfig = {
  baseUrl: 'http://localhost:8080/engine-rest',
  use: logger,
  asyncResponseTimeout: 10000
};

const client = new Client(camundaConfig);

modules.forEach((mod) => {
  const tasks = fs.readdirSync(mod).filter(file => file.endsWith(".js"));
  tasks.forEach(task => {
    const name = task.slice(0, -3);
    log(`Loading topic ${name}`)
    client.subscribe(name, async (props) => {
      try{
        log(`Received '${props.task.topicName}' on '${props.task.processDefinitionKey}' [${props.task.processInstanceId}]`)
        await require(`${mod}/${task}`)( props, client, log )
      }catch(ex){
        await errorHandler( props, client, ex )
      }
    })
  })
})

log(`Service loaded in ${Date.now() - start}ms`)
