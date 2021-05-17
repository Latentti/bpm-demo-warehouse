const { Variables } = require('camunda-external-task-client-js');

module.exports = async ({ task, taskService }, client) => {
  const data = {
    Recipient: "jani.sundqvist@hotmail.com",
    CompanyName: "Mutko Oy",
    MakeModel: "Skoda Octavia RS 2.0",
    HandoverDateTime: "2020-09-30T05:35:31Z",
    HandoverDateConfirmed: false,
    Person: "Jani Sundqvist",
    Wintertires: "Auton mukana",
    ProcessId: "abc2958c-baca-4709-b9de-35ae7bcde950",
    CalculationId: "999999",
    LicensePlateNumber: "VYU-239",
    VinCode: "VW1234567890"
  }

  const processVariables = new Variables();
  processVariables.set("FORMDATA", data);
  processVariables.set("RECIPIENT", data.Recipient)

  await taskService.complete(task, processVariables);
}
