import './style.css';
import ProjectController from './modules/projectController.js';
import Project from './modules/project.js';
import Storage from './modules/storage.js';
import Todo from './modules/todo.js';
import {
  renderInboxDetails,
  renderTodayDetails,
  clearElement,
} from './modules/uiController.js';

const sidebar = document.getElementById('sidebar');

let projects = Storage.loadProject();

document.addEventListener('DOMContentLoaded', () => {
  if (projects.length === 0) {
    projects = createTestData();
    Storage.saveProject(projects);
  }
  renderInboxDetails(projects);
  initSidebarListeners();
  createTestData();
});

// Testing Cases
function createTestData() {
  const sampleTask = Todo.createTask({
    title: 'Test Task',
    description: 'This task was added programmatically for testing.',
    dueDate: '2025-05-01',
    priority: 'Medium',
  });

  const schoolProject = projects.find((project) => project.name === 'School');
  if (schoolProject) {
    schoolProject.addTask(sampleTask);
    Storage.saveProject(projects);
    renderInboxDetails(projects);
  }
}

function initSidebarListeners() {
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
          renderInboxDetails(projects);
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
