const { Variables } = require('camunda-external-task-client-js');

const api = require('./utils/api');

module.exports = async ({ task, taskService }, client) => {
  const formHash = task.variables.get("FORMHASH");
  const formData = task.variables.get("FORMDATA");

  /*
   *  Verify required variables are present
   */
  if(!formHash){
    throw({
      code: "MUTKO_MISSING_REQUIRED_VARIABLE",
      message: "No form hash present.",
      details: "MUTKO_MISSING_REQUIRED_VARIABLE"
    })
  }

  /*
   *  Approve form
   */
  const approve = await api({
    method: "post",
    url: `/approve/${formHash}`,
    data: formData || {}
  });

  await taskService.complete(task);
}
