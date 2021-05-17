const fs = require('fs');

const { log } = require('../utils/logger')
const errorHandler = require('./error')

module.exports = async ( client ) => {
  const modules = fs.readdirSync('./modules/').map((mod) => `./modules/${mod}`);
  modules.forEach((mod) => {
    const tasks = fs.readdirSync(mod).filter(file => file.endsWith(".js"));
    tasks.forEach(task => {
      const name = task.slice(0, -3);
      const { options } = require(`.${mod}/${task}`)
      client.subscribe(name, options || {}, async (props) => {
        try{
          log(`Received '${props.task.topicName}' on '${props.task.processDefinitionKey}' [${props.task.processInstanceId}]`)
          await require(`.${mod}/${task}`)( props, client, log )
        }catch(ex){
          await errorHandler( props, client, ex )
        }
      })
    })
  })
}
