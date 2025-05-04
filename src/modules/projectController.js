import Storage from './storage.js';
import Project from './project.js';

class ProjectController {
  constructor() {
    this.projects = [];

    if (this.projects.length === 0) {
      this.addProject({ name: 'Default' });
    }
  }

  addProject(projectData) {
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

  deleteProject(projectToDelete) {
    this.projects = this.projects.filter(
      (existingProject) => existingProject.name !== projectToDelete.name
    );
    this.saveProjects();
  }

  getAllProjects() {
    return this.projects;
  }

  saveProjects() {
    Storage.saveProject(this.projects);
  }
}

const projectController = new ProjectController();
export default projectController;
