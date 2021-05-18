const { Variables, } = require('camunda-external-task-client-js');

const api = require('./utils/api');

module.exports = async ({ task, taskService }, client) => {
  const phoneNumber = task.variables.get("PhoneNumber");
  const title = task.variables.get("NotificationTitle");
  const body = task.variables.get("NotificationBody")
  const sender = task.variables.get("Sender")

  /*
   *  Verify required variables are present
   */
  if (!phoneNumber || !title || !body || !sender) {
    throw ({
      code: "KONTTORI_MISSING_REQUIRED_VARIABLE",
      message: "One or more required message variables missing. [PhoneNumber], [NotificationTitle], [NotificationBody], [Sender]",
      details: "KONTTORI_MISSING_REQUIRED_VARIABLE"
    })
  }

  /*
   *  Build payload
   */

  payload = {
    phoneNumber,
    title,
    body,
    sender
  }


  /*
   *  Send notification
   */
  const res = await api({
    method: "post",
    url: '/notifications',
    data: JSON.stringify(payload)
  }).catch((ex) => {
    throw ({
      code: ex.response.status,
      message: ex.response.data.message,
      details: ex.config.data
    })
  })

  if(res.data.error === 404) {
    await taskService.handleBpmnError(task, "PhoneNumberNotFound", "NO MATCHING PHONE NUMBER", payload)
  } else {
    await taskService.complete(task);
  }
}
