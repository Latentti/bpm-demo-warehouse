const { Variables } = require('camunda-external-task-client-js');

const api = require('./utils/api');

const SUBSCRIBE_TIMEOUT = 30000 // 30sec
const LOCK_TIME = 120000 // 120sec = 2mins

const subscribe = async ( props ) => {
  const { hash, tick, done } = props
  setTimeout(async () => {
    if(tick) await tick();

    const form = await api({
      method: "get",
      url: `/api/admin/form/${hash}`
    });

    if(form.state > 1){
      done(form)
    }else{
      subscribe(props)
    }

  }, SUBSCRIBE_TIMEOUT)
}

module.exports = async ({ task, taskService }, client, log) => {
  const formHash = task.variables.get("FORMHASH");

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

  await subscribe({
    hash: formHash,
    tick: async () => {
      log(`'${task.topicName}' on '${task.processDefinitionKey}' [${task.processInstanceId}] -> Checking form state`)
      await taskService.lock(task, LOCK_TIME);
    },
    done: async (form) => {
      const processVariables = new Variables();
      processVariables.set("FORMSUBMIT", form.submit);
      processVariables.set("FORMSUBMITON", new Date(form.submittedOn));
      await taskService.complete(task, processVariables);
    }
  })
}
