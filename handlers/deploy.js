const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');

const { log } = require('../utils/logger')

module.exports = async ( props ) => {
  const diagrams = fs.readdirSync('./diagrams/');

  const diagramRequests = diagrams.map((diagram) => {
    let formData = new FormData()
    formData.append('deployment-name', diagram)
    formData.append('deployment-source', process.env.CAMUNDA_WORKER_NAME)
    formData.append('enable-duplicate-filtering', "true")
    formData.append('deploy-changed-only', "true")
    formData.append('upload', fs.createReadStream(`./diagrams/${diagram}/${diagram}.bpmn`))

    return axios.post(`${process.env.BASEURL}/deployment/create`, formData, {
      auth: {
        username: process.env.CAMUNDA_USERNAME || "demo",
        password: process.env.CAMUNDA_PASSWORD || "demo"
      },
      headers: {
        ...formData.getHeaders(),
      },
    })
  })

  try{
    const responses = await Promise.all(diagramRequests)
    responses.forEach((diagram) => {
      log(`Deployed ${diagram.data.name} [${diagram.data.id}]`)
    })
  }catch(ex){
    log(`Exception while deploying processes: ${ex.message}`, 3)
    console.log("Exception stack", ex)
  }


}
