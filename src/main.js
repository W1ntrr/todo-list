import './style.css';
import ProjectController from './modules/projectController.js';
import Storage from './modules/storage.js';
import UI from './modules/uiController.js';

class Main {
  constructor() {
    this.dialog = document.getElementById('dialog');

    this.initializeComponents();
    this.initializeDOM();
    this.setupDialogSubmit();
  }

  initializeComponents() {
    this.ui = new UI();
  }

  initializeDOM() {
    this.ui.renderInboxDetails();
    this.renderProjectsInSidebar();
    this.initSidebarListeners();
    this.ui.updateAllBadges();
  }

  renderProjectsInSidebar() {
    ProjectController.projects.forEach((project) => {
      this.ui.renderProjects(project.name);
    });
  }

  initSidebarListeners() {
    const sidebar = document.getElementById('sidebar');

    sidebar.addEventListener('click', (e) => {
      const clickedItem = e.target.closest('.menu-item, .project-item');
      if (!clickedItem) return;

      document.querySelectorAll('.menu-item, .project-item').forEach((item) => {
        item.classList.remove('active');
      });
      clickedItem.classList.add('active');

      const tab = clickedItem.dataset.tab;
      const projectName = clickedItem.dataset.project;

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
      } else if (projectName) {
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
}

document.addEventListener('DOMContentLoaded', () => {
  new Main();
});
