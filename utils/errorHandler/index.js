const { log } = require('../logger')

module.exports = async ( props, client, exception ) => {
    const message = (exception.message !== undefined && typeof exception.message === "string")? exception.message : "Unknown"
    const details = (exception.details !== undefined && typeof exception.details === "string")? exception.details : message

    log(`Exception while handling '${props.task.topicName}' on '${props.task.processDefinitionKey}' [${props.task.processInstanceId}]`, 3)
    log(`Catched exception: ${message} - ${details}`, 3)

    console.log("Exception stack", exception)

    await props.taskService.handleFailure(props.task, {
      errorMessage: message,
      errorDetails: details
    });
}
