import './style.css';
import ProjectController from './modules/projectController.js';
import UI from './modules/uiController.js';

class Main {
  constructor() {
    this.dialog = document.getElementById('dialog');
    this.projectDialog = document.getElementById('project-dialog');

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

      document.querySelectorAll('[data-tab').forEach((item) => {
        item.classList.remove('active');
      });
      tabItem.classList.add('active');

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

      document.querySelectorAll('[data-project]').forEach((item) => {
        item.classList.remove('active');
      });
      projectItem.classList.add('active');

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
}

document.addEventListener('DOMContentLoaded', () => {
  new Main();
});
