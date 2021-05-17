const { Variables } = require('camunda-external-task-client-js');

const api = require('./utils/api');

module.exports = async ({ task, taskService }, client, log) => {
  const templateId = task.variables.get("TEMPLATEID");
  const recipient = task.variables.get("RECIPIENT");
  const formData = task.variables.get("FORMDATA");

  /*
   *  Verify required variables are present
   */
  if(!templateId){
    throw({
      code: "MUTKO_MISSING_REQUIRED_VARIABLE",
      message: "No templateid present.",
      details: "MUTKO_MISSING_REQUIRED_VARIABLE"
    })
  }

  if(!recipient){
    throw({
      code: "MUTKO_MISSING_REQUIRED_VARIABLE",
      message: "No recipient present.",
      details: "MUTKO_MISSING_REQUIRED_VARIABLE"
    })
  }

  /*
   *  Create form
   */
  const form = await api({
    method: "post",
    url: "/admin/form",
    data: {
      recipient,
      templateId,
      data: formData || task.variables.getAll() || {}
    }
  });

  /*
   *  Add form variables
   */
  const processVariables = new Variables();
  processVariables.set("FORMURL", form.url);
  processVariables.set("FORMHASH", form.hash);

  /*
   *  Complete task
   */
  await taskService.complete(task, processVariables);
};
