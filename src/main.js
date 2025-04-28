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

document.addEventListener('DOMContentLoaded', () => {
  Storage.loadProject();
  createTestData();
  initSidebarListeners();
});

// Testing Cases
function createTestData() {
  const projectManager = new ProjectController();
  const school = new Project('School');
  const work = new Project('Work');
  const school1 = new Project('School');

  const mathHomework = Todo.createTask({
    title: 'Complete Calculus Homework',
    description: 'Solve all exercise from Chapter 6',
    dueDate: '2025-04-29',
    priority: 'High',
  });
  const englishEssay = Todo.createTask({
    title: 'Finish English Essay Draft',
    description: 'Write the first draft of the essay on Shakespeare',
    dueDate: '2025-04-30',
    priority: 'High',
  });
  school.addTask(mathHomework);
  school.addTask(englishEssay);

  mathHomework.editTask(
    'Finish Math Homework',
    'Work on chapter 7',
    '2025-05-05',
    'Low'
  );
  mathHomework.toggleStatus();
  school.deleteTask(mathHomework.id);

  projectManager.addProject(work);
  projectManager.addProject(school);
  projectManager.addProject(school1);
}

function initSidebarListeners() {
  sidebar.addEventListener('click', (e) => {
    const clickedItem = e.target.closest('.menu-item, .project-item');
    if (!clickedItem) return;

    const tab = clickedItem.dataset.tab;
    const projectName = clickedItem.dataset.project;
    if (tab) {
      switch (tab) {
        case 'inbox':
          renderInboxDetails(Storage.loadProject());
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
