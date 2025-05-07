import Storage from "./storage.js";
import Project from "./project.js";

export default class ProjectController {
  static projects = [];

  static init() {
    if (this.projects.length === 0) {
      this.addProject({ name: "Default", tasks: [] });
    }
  }

  static addProject(projectData) {
    if (
      this.projects.some(
        (storedProject) => storedProject.name === projectData.name
      )
    ) {
      throw new Error(`Project ${project} already exists`);
    }

    const project = new Project(projectData.name);

    this.projects.push(project);
    this.saveProjects();
    return project;
  }

  static deleteProject(projectToDelete) {
    this.projects = this.projects.filter(
      (existingProject) => existingProject.name !== projectToDelete.name
    );
    this.saveProjects();
  }

  static getAllProjects() {
    return this.projects;
  }

  static saveProjects() {
    Storage.saveProject(this.projects);
  }
}

ProjectController.init();
