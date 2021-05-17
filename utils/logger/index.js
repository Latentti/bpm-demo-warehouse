const fs = require('fs');
const path = require('path');
const colors = require('colors');

colors.setTheme({
  info: 'cyan',
  error: 'red',
  success: 'green'
})

const writeLogStream = fs.createWriteStream(path.join(__dirname, '../../logs/logs.log'), {flags:'a'});
const writeErrorStream = fs.createWriteStream(path.join(__dirname, '../../logs/errors.log'), {flags:'a'});

const formatMessage = (str, level) => {
  const date = new Date(Date.now())
  return `[${date.toISOString()}]: ${str} \n`
}

const formatConsoleMessage = (str, level) => {
  const date = new Date(Date.now())
  return `[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]: ${str}`
}

/**
 *  Logs to console and file
 *  @param {String} message The message to log
 *  @param {Number} level Level { 0: "success", 1: "info",  2: "warn", 3: "error" }
 */
exports.log = (message, level) => {
  const logLevel = (level !== undefined)? level : 1
  if(logLevel === 3){
    console.log(formatConsoleMessage(message).error)
    writeErrorStream.write(formatMessage(message));
  }else if(logLevel === 1){
    console.log(formatConsoleMessage(message).info)
  }else{
    console.log(formatConsoleMessage(message).success)
  }
  return writeLogStream.write(formatMessage(message));
}

exports.camundaLogger = ( client ) => {
  client.on("subscribe", topic => {
    exports.log(`Subscribed to topic ${topic}`, 0);
  });

  client.on("poll:error", e => {
    exports.log(`Polling failed with ${e}`, 3);
  });

  client.on("complete:success", ({ id }) => {
    exports.log(`completed task ${id}`, 0);
  });

  client.on("complete:error", ({ id }, e) => {
    exports.log(`Couldn't complete task ${id}, ${e}`, 3);
  });

  client.on("handleFailure:success", ({ id }) => {
    exports.log(`Handled failure of task ${id}`);
  });

  client.on("handleFailure:error", ({ id }, e) => {
    exports.log(`Couldn't handle failure of task ${id}, ${e}`, 3);
  });

  client.on("handleBpmnError:success", ({ id }) => {
    exports.log(`Handled BPMN error of task ${id}`);
  });

  client.on("handleBpmnError:error", ({ id }, e) => {
    exports.log(`Couldn't handle BPMN error of task ${id}, ${e}`, 3);
  });

  client.on("extendLock:success", ({ id }) => {
    exports.log(`Extend lock of task ${id}`, 0);
  });

  client.on("extendLock:error", ({ id }, e) => {
    exports.log(`Couldn't handle extend lock of task ${id}, ${e}`, 3);
  });

  client.on("unlock:success", ({ id }) => {
    exports.log(`Unlocked task ${id}`, 0);
  });

  client.on("unlock:error", ({ id }, e) => {
    exports.log(`Couldn't unlock task ${id}, ${e}`, 3);
  });

  client.on("lock:success", ({ id }) => {
    exports.log(`Locked task ${id}`, 0);
  });

  client.on("lock:error", ({ id }, e) => {
    exports.log(`Couldn't lock task ${id}, ${e}`, 3);
  });
}
