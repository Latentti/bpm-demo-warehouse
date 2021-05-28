const { Variables } = require('camunda-external-task-client-js');

module.exports = async ({ task, taskService }, client) => {

  // Just for demo purposes generating random values
  const randomWarehouseStatus = Math.random() < 0.5
  const locations = ['Kivikko', 'Espoonlahti', 'Koivuhaka', 'Herttoniemi', 'Lohja', 'Veikkola', 'Tuusula']
  const rentals = ['Ramirent', 'Cramo', 'RT-Konevuokraus', 'Bauhaus']

  console.log('On warehouse? : ', randomWarehouseStatus)

  const processVariables = new Variables()
  if (randomWarehouseStatus) {
    processVariables.set("Warehouse", randomWarehouseStatus)
    processVariables.set("Location", locations[Math.floor(Math.random()*locations.length)])
    processVariables.set("Rental", '')
  } else {
    processVariables.set("Warehouse", randomWarehouseStatus)
    processVariables.set("Location", '')
    processVariables.set("Rental", rentals[Math.floor(Math.random()*rentals.length)])
  }

  await taskService.complete(task, processVariables)
}
