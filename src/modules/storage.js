import Project from './project.js';
import Todo from './todo.js';

export default class Storage {
  static saveProject(projects) {
    const serializedProject = projects.map((project) => ({
      name: project.name,
      tasks: project.tasks.map((task) => ({
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        priority: task.priority,
        status: task.status,
        id: task.id,
      })),
    }));

    const projectJSON = JSON.stringify(serializedProject);
    localStorage.setItem('Project', projectJSON);
  }

  static loadProject() {
    const projectsData = JSON.parse(localStorage.getItem('Project') || '[]');

    const projects = projectsData.map((projectData) => {
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
    });

    return projects;
  }

  static deleteStorage() {
    localStorage.clear();
  }
}
