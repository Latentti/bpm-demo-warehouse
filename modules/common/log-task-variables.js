module.exports = async ({ task, taskService }, client) => {
  console.log("Variables:", task.variables.getAll())

  console.log("Task:", task)

  await taskService.complete(task);
}
