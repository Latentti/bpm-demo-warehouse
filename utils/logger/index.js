const fs = require('fs');
const path = require('path');
const colors = require('colors');

colors.setTheme({
  info: 'cyan',
  error: 'red'
})

const writeLogStream = fs.createWriteStream(path.join(__dirname, '../../logs/logs.log'), {flags:'a'});
const writeErrorStream = fs.createWriteStream(path.join(__dirname, '../../logs/errors.log'), {flags:'a'});

const writeMessage = (str, level) => {
  const date = new Date(Date.now())
  return `[${date.toISOString()}]: ${str} \n`
}

const consoleMessage = (str, level) => {
  const date = new Date(Date.now())
  return `[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]: ${str}`
}

/**
 *  Logs to console and file
 *  @param {String} message The message to log
 *  @param {Object} req Express req object
 *  @param {Number} level Level { 0: "debug", 1: "info",  2: "warn", 3: "error" }
 */
exports.log = (message, level) => {
  const logLevel = (level !== undefined)? level : 1
  if(logLevel === 3){
    console.log(consoleMessage(message).error)
    writeErrorStream.write(writeMessage(message));
  }else if(logLevel === 1){
    console.log(consoleMessage(message).info)
  }else{
    console.log(consoleMessage(message))
  }
  return writeLogStream.write(writeMessage(message));
}
