import './style.css';
import ProjectController from './modules/projectController.js';
import UI from './modules/uiController.js';

class Main {
  constructor() {
    this.dialog = document.getElementById('dialog');
    this.projectDialog = document.getElementById('project-dialog');

    this.setupDefaultProject();

    this.initializeComponents();
    this.initializeDOM();
    this.setupDialogSubmit();
    this.setupProjectDialog();
  }

  initializeComponents() {
    this.ui = new UI();
  }

  initializeDOM() {
    this.ui.renderInboxDetails();
    this.refreshSidebarProjects();
    this.initSidebarListeners();
    this.ui.updateAllBadges();
  }

  refreshSidebarProjects() {
    ProjectController.projects.forEach((project) => {
      this.ui.renderSidebarProjects(project.name);
    });
  }

  initSidebarListeners() {
    this.setupTabNavigation();
    this.setupProjectNavigation();
    this.ui.displayProjectForm();
  }

  setupTabNavigation() {
    const sidebar = document.getElementById('sidebar');

    sidebar.addEventListener('click', (e) => {
      const tabItem = e.target.closest('[data-tab]');
      if (!tabItem) return;

      this.setActiveStates(tabItem, '[data-tab]');
      this.clearActiveStates('[data-project]');

      const tab = tabItem.dataset.tab;
      if (tab) {
        switch (tab) {
          case 'inbox':
            this.ui.renderInboxDetails();
            break;
          case 'today':
            this.ui.renderTodayDetails();
            break;
          case 'upcoming':
            this.ui.renderUpcomingDetails();
            break;
          case 'important':
            this.ui.renderImportantDetails();
            break;
        }
      }
    });
  }

  setupProjectNavigation() {
    const sidebar = document.getElementById('sidebar');

    sidebar.addEventListener('click', (e) => {
      const projectItem = e.target.closest('[data-project]');
      if (!projectItem) return;

      this.setActiveStates(projectItem, '[data-project]');
      this.clearActiveStates('[data-tab');

      const projectName = projectItem.dataset.project;

      if (projectName) {
        this.ui.renderCurrentProject(projectName);
      }
    });
  }

  setupDialogSubmit() {
    this.dialog.addEventListener('submit', (e) => {
      e.preventDefault();
      this.ui.handleTaskFormSubmit();
    });
  }

  setupProjectDialog() {
    this.ui.handleInputValidation();

    this.projectDialog.addEventListener('submit', (e) => {
      e.preventDefault();
      this.ui.displayProjectForm();
      this.ui.handleProjectFormSubmission();
    });
  }

  clearActiveStates(groupSelector) {
    document.querySelectorAll(groupSelector).forEach((item) => {
      item.classList.remove('active');
    });
  }

  setActiveStates(item, clearSelector) {
    this.clearActiveStates(clearSelector);
    item.classList.add('active');
  }

  setupDefaultProject() {
    const defaultExists = ProjectController.projects.some;
    (project) => project.name === 'Default';
    const alreadyCreated = localStorage.getItem('defaultProjectCreated') === 'true';

    if (!defaultExists && !alreadyCreated) {
      ProjectController.addProject({ name: 'Default' });
      localStorage.setItem('defaultProjectCreated', 'true');
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ProjectController.init();
  new Main();
});
