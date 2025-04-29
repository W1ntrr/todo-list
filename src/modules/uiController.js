import note from '../images/note_stack_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg';
const content = document.querySelector('.content');

export const clearElement = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

export const renderInboxDetails = (projects) => {
  clearElement(content);
  const contentHeader = document.querySelector('.content-header');
  contentHeader.textContent = 'Inbox';
  projects.forEach((project) => {
    const taskGroup = document.createElement('div');
    taskGroup.classList.add('task-group');

    const taskGroupTitle = document.createElement('div');
    taskGroupTitle.classList.add('task-group-title');
    taskGroupTitle.textContent = project.name;

    const taskGroupInfo = document.createElement('div');
    taskGroupInfo.classList.add('task-group-info');

    const img = document.createElement('img');
    img.src = note;
    img.alt = 'Task Icon';

    const taskCount = document.createElement('p');
    taskCount.classList.add('task-count');
    taskCount.textContent =
      project.tasks.length === 0
        ? 'No task'
        : `${project.tasks.length} ${
            project.tasks.length === 1 ? 'task' : 'tasks'
          }`;

    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item');

    const addTaskBtn = document.createElement('button');
    addTaskBtn.classList.add('add-task');

    const addTaskIcon = createSVGIcon(
      'M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z',
      '#ced4d9'
    );

    const addTaskText = document.createElement('p');
    addTaskText.textContent = 'Add Task';

    const fragment = document.createDocumentFragment();

    project.tasks.forEach((task) => {
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
      taskText.textContent = task.description;

      const taskActions = document.createElement('div');
      taskActions.classList.add('task-actions');

      const taskEditAction = createSVGIcon(
        'M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z',
        '#999999'
      );

      taskElement.appendChild(wrapper);
      taskElement.appendChild(taskContent);

      wrapper.appendChild(checkbox);
      wrapper.appendChild(checkmark);

      taskContent.appendChild(taskText);
      taskContent.appendChild(taskActions);
      taskActions.appendChild(taskEditAction);

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
  });
  handleTodoCompletion(projects);
};

export const renderTodayDetails = () => {
  clearElement(content);
  const contentHeader = document.querySelector('.content-header');
  contentHeader.textContent = 'Today';
};

function createSVGIcon(pathData, color) {
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
}

function handleTodoCompletion(projects) {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  for (const checkbox of checkboxes) {
    checkbox.addEventListener('change', () => {
      const taskId = checkbox.closest('.task').dataset.id;

      const project = projects.find((project) =>
        project.tasks.some((task) => task.id === taskId)
      );

      if (project) {
        const task = project.tasks.find((task) => task.id === taskId);
        task.toggleStatus();
      }
    });
  }
}
