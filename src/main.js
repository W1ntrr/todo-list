import './style.css';
import ProjectController from './modules/projectController.js';
import Storage from './modules/storage.js';
import Todo from './modules/todo.js';
import {
  renderInboxDetails,
  renderTodayDetails,
} from './modules/uiController.js';

const projectController = new ProjectController();

let allProjects = Storage.loadProject();
projectController.projects = allProjects;

initializeApp();

function initializeApp() {
  renderInboxDetails(allProjects);
  initSidebarListeners();
  // createTestData();
}

// Testing Cases
function createTestData() {
  const localProject = allProjects.find((project) => project.name === 'School');

  if (localProject) {
    const sampleTask = Todo.createTask({
      title: 'This task was added programmatically for testing.',
      description: 'Something',
      dueDate: '2025-05-01',
      priority: 'Medium',
    });

    localProject.addTask(sampleTask);
    projectController.addProject(localProject);
    Storage.saveProject(allProjects);
  }
}

function initSidebarListeners() {
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
          renderInboxDetails(allProjects);
          break;
        case 'today':
          renderTodayDetails();
          break;
        case 'upcoming':
          console.log('Render Upcoming Tasks');
          break;
        case 'important':
          console.log('Render Important Tasks');
          break;
      }
    } else if (projectName) {
      console.log(projectName);
    }
  });
}
