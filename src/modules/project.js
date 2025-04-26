export class Project {
  constructor(name) {
    this.name = name;
    this.tasks = new Map();
  }

  addTask(todo) {
    this.tasks.set(todo.id, todo);
    console.log(this.tasks);
  }

  deleteTask(taskId) {
    this.tasks.delete(taskId);
  }
}
