export default class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
  }

  addTask(todo) {
    this.tasks.push(todo);
    console.log(`Added task successfully!`);
  }

  deleteTask(taskId) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
    console.log('Removed task successfully!');
  }

  getTask() {
    return this.tasks;
  }
}
