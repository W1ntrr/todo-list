import Project from './project.js';
import Todo from './todo.js';

export default class Storage {
  static storageKey = 'Project';

  static saveProject(projects) {
    projects.forEach((project) => {
      console.log('Saving project:', project.name, project.tasks);
    });

    const serializedProject = projects.map((project) => ({
      name: project.name,
      tasks: project.tasks.map((task) => this.serializeTask(task)),
    }));

    localStorage.setItem(this.storageKey, JSON.stringify(serializedProject));
  }

  static loadProject() {
    const storedData = JSON.parse(localStorage.getItem(this.storageKey));
    if (!storedData) return [];
    return storedData.map((projectData) => this.parseData(projectData));
  }

  static deleteStorage() {
    localStorage.clear();
  }

  static serializeTask(task) {
    return {
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      priority: task.priority,
      status: task.status,
      id: task.id,
    };
  }

  static parseData(projectData) {
    console.log('Parsing project:', projectData);
    const project = new Project(projectData.name);

    project.tasks = projectData.tasks.map((taskData) =>
      Todo.createTask({
        title: taskData.title,
        description: taskData.description,
        dueDate: taskData.dueDate,
        priority: taskData.priority,
        status: taskData.status,
        id: taskData.id,
      })
    );

    return project;
  }
}
