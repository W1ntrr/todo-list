import note from '../images/note_stack_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg';
import projectController from './projectController';
import Todo from './todo';

const content = document.querySelector('.content');

const dialog = document.getElementById('dialog');
const form = document.getElementById('task-form');
const closeButton = document.querySelector('.close-button');

let currentEditingProject = null;
let currentEditingTask = null;

let currentView = 'inbox';
let currentProjectName = null;

export const clearElement = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

export const renderInboxDetails = () => {
  currentView = 'Inbox';
  currentProjectName = null;
  const projects = projectController.getAllProjects();

  clearElement(content);
  const contentHeader = document.querySelector('.content-header');

  content.removeAttribute('id');

  contentHeader.textContent = 'Inbox';
  projects.forEach((proj) => {
    createTaskGroup(proj);
  });
};

export const createTaskGroup = (proj) => {
  const taskGroup = document.createElement('div');
  taskGroup.classList.add('task-group');

  const taskGroupTitle = document.createElement('div');
  taskGroupTitle.classList.add('task-group-title');
  taskGroupTitle.textContent = proj.name;

  const taskGroupInfo = document.createElement('div');
  taskGroupInfo.classList.add('task-group-info');

  const img = document.createElement('img');
  img.src = note;
  img.alt = 'Task Icon';

  const taskCount = document.createElement('p');
  taskCount.classList.add('task-count');

  const taskItem = document.createElement('div');
  taskItem.classList.add('task-item');

  const addTaskBtn = document.createElement('button');
  addTaskBtn.classList.add('add-task');

  addTaskBtn.addEventListener('click', () => {
    currentEditingProject = proj;
    dialog.showModal();
  });

  const addTaskIcon = createSVGIcon(
    'M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z',
    '#ced4d9'
  );

  const addTaskText = document.createElement('p');
  addTaskText.textContent = 'Add Task';

  const fragment = document.createDocumentFragment();

  proj.tasks.forEach((task) => {
    const taskElement = renderTaskList(proj, task);
    fragment.appendChild(taskElement);
  });

  taskItem.appendChild(fragment);

  content.appendChild(taskGroup);

  taskGroup.appendChild(taskGroupTitle);
  taskGroup.appendChild(taskGroupInfo);
  taskGroup.appendChild(taskItem);

  taskGroupInfo.appendChild(img);
  taskGroupInfo.appendChild(taskCount);
  taskItem.appendChild(addTaskBtn);

  addTaskBtn.appendChild(addTaskIcon);
  addTaskBtn.appendChild(addTaskText);

  updateTaskCount(proj);
};

const renderTaskList = (project, task) => {
  const taskElement = document.createElement('div');
  taskElement.classList.add('task');
  taskElement.dataset.id = task.id;

  const wrapper = document.createElement('label');
  wrapper.classList.add('wrapper');

  const checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  checkbox.setAttribute('name', 'task');

  const checkmark = document.createElement('span');
  checkmark.classList.add('checkmark');

  const taskContent = document.createElement('div');
  taskContent.classList.add('task-content');

  const taskText = document.createElement('div');
  taskText.classList.add('task-text');
  taskText.textContent = task.title;

  const taskActions = document.createElement('div');
  taskActions.classList.add('task-actions');

  const taskEdit = document.createElement('div');
  taskEdit.classList.add('task-edit');
  taskEdit.setAttribute('data-open-form', '');

  taskEdit.addEventListener('click', () => {
    if (!checkbox.checked) {
      currentEditingProject = project;
      currentEditingTask = task;

      document.getElementById('task-title').value = task.title;
      document.getElementById('task-description').value = task.description;
      document.getElementById('task-date').value = task.dueDate;
      document.getElementById('task-priority').value = task.priority;

      dialog.showModal();
    }
  });

  closeButton.addEventListener('click', () => {
    currentEditingProject = null;
    currentEditingTask = null;
    dialog.close();
  });

  const taskEditIcon = createSVGIcon(
    'M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z'
  );

  const taskDelete = document.createElement('div');
  taskDelete.classList.add('task-delete');

  const taskDeleteIcon = createSVGIcon(
    'M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z'
  );

  taskDelete.addEventListener('click', () => {
    project.deleteTask(task.id);
    projectController.save();
    taskElement.remove();
    updateTaskCount(project);
  });

  checkbox.addEventListener('change', () => {
    taskText.classList.toggle('completed', checkbox.checked);
    task.toggleStatus();
    projectController.save();
  });

  if (task.status === 'Complete') {
    checkbox.checked = true;
    taskText.classList.add('completed');
  }

  checkbox.setAttribute('id', `checkbox-${task.id}`);
  wrapper.setAttribute('id', `checkbox-${task.id}`);

  taskElement.appendChild(wrapper);
  taskElement.appendChild(taskContent);

  wrapper.appendChild(checkbox);
  wrapper.appendChild(checkmark);

  taskContent.appendChild(taskText);
  taskActions.appendChild(taskEdit);
  taskContent.appendChild(taskActions);
  taskActions.appendChild(taskDelete);
  taskEdit.appendChild(taskEditIcon);
  taskDelete.appendChild(taskDeleteIcon);

  return taskElement;
};

export const renderTodayDetails = () => {
  currentView = 'Today';
  currentProjectName = null;
  clearElement(content);
  const contentHeader = document.querySelector('.content-header');

  content.removeAttribute('id');

  contentHeader.textContent = 'Today';
};

export const renderUpcomingDetails = () => {
  currentView = 'Upcoming';
  currentProjectName = null;
  clearElement(content);
  const contentHeader = document.querySelector('.content-header');

  content.removeAttribute('id');

  contentHeader.textContent = 'Upcoming';
};

export const renderImportantDetails = () => {
  currentView = 'Important';
  currentProjectName = null;
  clearElement(content);
  const contentHeader = document.querySelector('.content-header');

  content.removeAttribute('id');
  contentHeader.textContent = 'Important';
};

export const renderProjects = (projectName) => {
  const projectList = document.querySelector('.project-list');

  const projectItem = document.createElement('div');
  projectItem.classList.add('project-item');
  projectItem.setAttribute('data-project', projectName);

  const projectSVG = createSVGIcon(
    'M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h240l80 80h320q33 0 56.5 23.5T880-640v400q0 33-23.5 56.5T800-160H160Zm0-80h640v-400H447l-80-80H160v480Zm0 0v-480 480Z',
    '#000000'
  );

  const projectTitle = document.createElement('span');
  projectTitle.classList.add('project-text');
  projectTitle.textContent = projectName;

  const badge = document.createElement('span');
  badge.classList.add('badge');

  projectList.appendChild(projectItem);
  projectItem.appendChild(projectSVG);
  projectItem.appendChild(projectTitle);
  projectItem.appendChild(badge);
};

export const renderCurrentProject = (currentProject) => {
  currentView = 'Project';
  currentProjectName = currentProject;
  clearElement(content);

  const selectedProject = projectController
    .getAllProjects()
    .find((project) => project.name === currentProject);

  createTaskGroup(selectedProject);
  renderTaskList(selectedProject, selectedProject.tasks);

  const contentHeader = document.querySelector('.content-header');

  content.setAttribute('id', 'selected-project');
  contentHeader.textContent = selectedProject.name;
};

const createSVGIcon = (pathData, color) => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svg.setAttribute('height', '24px');
  svg.setAttribute('viewBox', '0 -960 960 960');
  svg.setAttribute('width', '24px');
  svg.setAttribute('fill', color);

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', pathData);
  svg.appendChild(path);
  return svg;
};

const updateTaskCount = (project) => {
  const taskGroups = document.querySelectorAll('.task-group');
  taskGroups.forEach((group) => {
    const title = group.querySelector('.task-group-title').textContent;
    if (title === project.name) {
      const countElement = group.querySelector('.task-count');
      const count = project.tasks.length;

      countElement.textContent =
        count === 0 ? 'No Task' : `${count} ${count === 1 ? 'Task' : 'Tasks'}`;
    }
  });
};

dialog.addEventListener('submit', (e) => {
  e.preventDefault();

  const newTaskTitle = document.getElementById('task-title').value;
  const newTaskDescription = document.getElementById('task-description').value;
  const newTaskDueDate = document.getElementById('task-date').value;
  const newTaskPriority = document.getElementById('task-priority').value;

  if (currentEditingProject && currentEditingTask) {
    currentEditingTask.editTask(
      newTaskTitle,
      newTaskDescription,
      newTaskDueDate,
      newTaskPriority
    );
  } else if (currentEditingProject) {
    const newTask = Todo.createTask({
      title: newTaskTitle,
      description: newTaskDescription,
      dueDate: newTaskDueDate,
      priority: newTaskPriority,
    });
    currentEditingProject.addTask(newTask);
    updateTaskCount(currentEditingProject);
  }
  projectController.save();

  currentEditingProject = null;
  currentEditingTask = null;

  dialog.close();
  form.reset();

  switch (currentView) {
    case 'Inbox':
      renderInboxDetails();
      break;
    case 'Today':
      renderTodayDetails();
      break;
    case 'Upcoming':
      renderUpcomingDetails();
      break;
    case 'Important':
      renderImportantDetails();
      break;
    case 'Project':
      renderCurrentProject(currentProjectName);
      break;
  }
});
