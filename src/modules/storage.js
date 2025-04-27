export default class Storage {
  static saveProject(projects) {
    const serializedProject = projects.map((project) => ({
      name: project.name,
      tasks: project.tasks,
    }));
    const projectJSON = JSON.stringify(serializedProject);
    localStorage.setItem('Project', projectJSON);
  }

  static loadProject() {
    return JSON.parse(localStorage.getItem('Project') || []);
  }
}
