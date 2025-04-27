import ProjectController from './modules/projectController.js';
import Project from './modules/project.js';
import Storage from './modules/storage.js';
import Todo from './modules/todo.js';

document.addEventListener('DOMContentLoaded', () => {
  Storage.loadProject();
  createTestData();
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
