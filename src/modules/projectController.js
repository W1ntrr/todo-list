import Storage from './storage.js';

export default class ProjectController {
  constructor() {
    this.projects = [];
  }

  addProject(project) {
    for (const storedProject of this.projects) {
      if (storedProject.name === project.name) {
        console.log('Project Already Exists!');
        return false;
      }
    }
    this.projects.push(project);
    Storage.saveProject(this.projects);
    return true;
  }

  deleteProject(projectToDelete) {
    this.projects = this.projects.filter(
      (existingProject) => existingProject.name !== projectToDelete.name
    );
    Storage.saveProject(this.projects);
  }
}
