import ProjectController from './projectController';

export default class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
  }

  addTask(todo) {
    this.tasks.push(todo);
    ProjectController.saveProjects();
    console.log(`Added task successfully!`);
  }

  deleteTask(taskId) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
    ProjectController.saveProjects();
    console.log('Removed task successfully!');
  }

  getTask() {
    return this.tasks;
  }
}
